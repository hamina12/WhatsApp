import { API, graphqlOperation, Auth } from 'aws-amplify'

export default getCommonChatRoomWithUser = async (userId) => {

    const authUser = await Auth.currentAuthenticatedUser()
    // get all chatrooms of user1
    const response = await API.graphql(
        graphqlOperation(listChatRooms, {id: authUser.attributes.sub })
    )

    const chatRooms = response.data?.getUser?.ChatRooms.items || []

    const chatRoom = chatRooms.find((chatRoomItem) => {
        return chatRoomItem.chatRoom.users.items.some(
            (userItem) => userItem.user.id === userId
        )
    })

    return chatRoom
    // get all chatrooms of user2

    // remove chat rooms with more than 2 users

    // get the common chat rooms
}

export const listChatRooms = /* GraphQL */ `
    query GetUser($id: ID!)  {
        getUser(id: $id) {
            id
            ChatRooms {
                items {
                chatRoom {
                    id
                    users {
                        items {
                            user {
                                id
                                image
                                name
                            }
                        }
                    }
                }
            }
        }
    }
}`