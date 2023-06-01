import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ChatScreen from '../../screens/ChatScreen'
import ChatRoomInfo from '../../screens/GroupInfoScreen'
import ContactsScreen from '../../screens/ContactsScreen'
import MainTabNavigator from './MainTabNavigator'
import NewGroupScreen from '../../screens/NewGroupScreen'
import AddContactToGroupScreen from '../../screens/AddContactToGroupScreen'
const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'whitesmoke'}}}>
            <Stack.Screen name='Home' component={MainTabNavigator} options={{headerShown:false}} />
            <Stack.Screen name='Chat' component={ChatScreen} />
            <Stack.Screen name='Group Info' component={ChatRoomInfo} />
            <Stack.Screen name='Contacts' component={ContactsScreen} />
            <Stack.Screen name='New Group' component={NewGroupScreen} />
            <Stack.Screen name='Add Contacts' component={AddContactToGroupScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation