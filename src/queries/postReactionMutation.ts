import { useMutation } from "@apollo/client";
import { gql } from "../__generated__";
import { ActionStatus, GetMemberPostQuery } from "../__generated__/graphql";
import { GET_MEMBER_POST, PostsParams } from "./postsQuery";
import { useCallback } from "react";

function updatePosts(
  data: GetMemberPostQuery,
  postId: string,
  reactions: {
    count: number;
    reacted: boolean;
  }[]
) {
  return {
    memberPosts: {
      edges: data?.memberPosts.edges?.map((edge) => {
        if (edge.node.id === postId) {
          return {
            ...edge,
            node: {
              ...edge.node,
              reactions,
            },
          };
        }
        return edge;
      }),
    },
  };
}

export const useLikePostMutation = (postParams: PostsParams) => {
  const [mutate, { data, loading, error }] = useMutation(ADD_REACTION);

  const likePost = useCallback(
    (postId: string) => {
      return mutate({
        variables: {
          input: { reaction: "+1", overrideSingleChoiceReactions: true },
          postId: postId,
        },
        optimisticResponse: {
          addReaction: { status: ActionStatus.Succeeded, __typename: "Action" },
        },
        update(cache) {
          const cachedData = cache.readQuery({
            query: GET_MEMBER_POST,
            variables: postParams,
          });
          if (cachedData)
            cache.writeQuery({
              query: GET_MEMBER_POST,
              variables: postParams,
              data: updatePosts(cachedData, postId, [
                {
                  count: 1,
                  reacted: true,
                },
              ]),
            });
        },
      });
    },
    [postParams, mutate]
  );

  return { likePost, data, loading, error };
};

export const useDislikePostMutation = (postParams: PostsParams) => {
  const [mutate, { data, loading, error }] = useMutation(REMOVE_REACTION);

  const dislikePost = useCallback(
    (postId: string) => {
      return mutate({
        variables: {
          reaction: "+1",
          postId: postId,
        },
        optimisticResponse: {
          removeReaction: {
            status: ActionStatus.Succeeded,
            __typename: "Action",
          },
        },
        update(cache) {
          const cachedData = cache.readQuery({
            query: GET_MEMBER_POST,
            variables: postParams,
          });
          if (cachedData)
            cache.writeQuery({
              query: GET_MEMBER_POST,
              variables: postParams,
              data: updatePosts(cachedData, postId, []),
            });
        },
      });
    },
    [postParams, mutate]
  );

  return { dislikePost, data, loading, error };
};

const ADD_REACTION = gql(/* GraphQL */ `
  mutation addReaction($input: AddReactionInput!, $postId: ID!) {
    addReaction(input: $input, postId: $postId) {
      status
    }
  }
`);

const REMOVE_REACTION = gql(/* GraphQL */ `
  mutation removeReaction($reaction: String!, $postId: ID!) {
    removeReaction(reaction: $reaction, postId: $postId) {
      status
    }
  }
`);
