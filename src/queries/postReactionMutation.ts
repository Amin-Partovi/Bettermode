import { useMutation } from "@apollo/client";
import { gql } from "../__generated__";
import { GetMemberPostQuery } from "../__generated__/graphql";
import { GET_MEMBER_POST, PostsParams } from "./postsQuery";

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

  function likePost(postId: string) {
    return mutate({
      variables: {
        input: { reaction: "+1", overrideSingleChoiceReactions: true },
        postId: postId,
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
  }
  return { likePost, data, loading, error };
};

export const useDislikePostMutation = (postParams: PostsParams) => {
  const [mutate, { data, loading, error }] = useMutation(REMOVE_REACTION);

  function dislikePost(postId: string) {
    return mutate({
      variables: {
        reaction: "+1",
        postId: postId,
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
  }

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
