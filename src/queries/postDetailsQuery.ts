import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";

export const usePostDetailsQuery = (id: string) => {
  return useQuery(GET_MEMBER_POST_DETAILS, { variables: { id }, skip: !id });
};

export const GET_MEMBER_POST_DETAILS = gql(/* GraphQL */ `
  query getPostDetails($id: ID!) {
    post(id: $id) {
      publishedAt
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
    }
  }
`);
