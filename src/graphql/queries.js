/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      chatRoom
      userName
      content
      createdAt
      updatedAt
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        chatRoom
        userName
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listMessagesSortedByCreatedAt = /* GraphQL */ `
  query ListMessagesSortedByCreatedAt(
    $chatRoom: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessagesSortedByCreatedAt(
      chatRoom: $chatRoom
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        chatRoom
        userName
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
