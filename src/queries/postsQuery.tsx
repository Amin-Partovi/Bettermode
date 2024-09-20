import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";

export interface PostsParams {
  memberId: string;
  limit: number;
  hasParent: boolean;
}

export const usePostsQuery = (params: PostsParams) => {
  return useQuery(GET_MEMBER_POST, { variables: params });
};

export const GET_MEMBER_POST = gql(/* GraphQL */ `
  query getMemberPost(
    $after: String
    $before: String
    $hasParent: Boolean
    $limit: Int!
    $memberId: ID!
    $offset: Int
    $reverse: Boolean
  ) {
    memberPosts(
      after: $after
      before: $before
      hasParent: $hasParent
      limit: $limit
      memberId: $memberId
      offset: $offset
      reverse: $reverse
    ) {
      edges {
        cursor
        node {
          id
          title
          description
          publishedAt

          reactions {
            count
            reacted
          }
          owner {
            member {
              name

              profilePicture {
                ... on Image {
                  url
                }
              }
            }
          }
          tags {
            title
          }

          fields {
            key
            value
            relationEntities {
              medias {
                ... on Image {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`);
