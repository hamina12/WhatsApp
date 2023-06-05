export const listChatRooms = /* GraphQL */ `
    query GetUser($id: ID!)  {
        getUser(id: $id) {
            id
            ChatRooms {
                items {
                _deleted
                chatRoom {
                    id
                    updatedAt
                    name
                    users {
                        items {
                            user {
                                id
                                name
                            }
                        }
                    }
                    LastMessage {
                        id
                        createdAt
                        text
                    }
                }
            }
        }
    }
}`