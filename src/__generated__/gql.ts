/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation addReaction($input: AddReactionInput!, $postId: ID!) {\n    addReaction(input: $input, postId: $postId) {\n      status\n    }\n  }\n": types.AddReactionDocument,
    "\n  mutation removeReaction($reaction: String!, $postId: ID!) {\n    removeReaction(reaction: $reaction, postId: $postId) {\n      status\n    }\n  }\n": types.RemoveReactionDocument,
    "\n  query getMemberPost(\n    $after: String\n    $before: String\n    $hasParent: Boolean\n    $limit: Int!\n    $memberId: ID!\n    $offset: Int\n    $reverse: Boolean\n  ) {\n    memberPosts(\n      after: $after\n      before: $before\n      hasParent: $hasParent\n      limit: $limit\n      memberId: $memberId\n      offset: $offset\n      reverse: $reverse\n    ) {\n      edges {\n        cursor\n        node {\n          id\n          title\n          description\n\n          reactions {\n            count\n            reacted\n          }\n        }\n      }\n    }\n  }\n": types.GetMemberPostDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation addReaction($input: AddReactionInput!, $postId: ID!) {\n    addReaction(input: $input, postId: $postId) {\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation addReaction($input: AddReactionInput!, $postId: ID!) {\n    addReaction(input: $input, postId: $postId) {\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation removeReaction($reaction: String!, $postId: ID!) {\n    removeReaction(reaction: $reaction, postId: $postId) {\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation removeReaction($reaction: String!, $postId: ID!) {\n    removeReaction(reaction: $reaction, postId: $postId) {\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getMemberPost(\n    $after: String\n    $before: String\n    $hasParent: Boolean\n    $limit: Int!\n    $memberId: ID!\n    $offset: Int\n    $reverse: Boolean\n  ) {\n    memberPosts(\n      after: $after\n      before: $before\n      hasParent: $hasParent\n      limit: $limit\n      memberId: $memberId\n      offset: $offset\n      reverse: $reverse\n    ) {\n      edges {\n        cursor\n        node {\n          id\n          title\n          description\n\n          reactions {\n            count\n            reacted\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getMemberPost(\n    $after: String\n    $before: String\n    $hasParent: Boolean\n    $limit: Int!\n    $memberId: ID!\n    $offset: Int\n    $reverse: Boolean\n  ) {\n    memberPosts(\n      after: $after\n      before: $before\n      hasParent: $hasParent\n      limit: $limit\n      memberId: $memberId\n      offset: $offset\n      reverse: $reverse\n    ) {\n      edges {\n        cursor\n        node {\n          id\n          title\n          description\n\n          reactions {\n            count\n            reacted\n          }\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;