import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ChatScreen from '../../screens/ChatScreen'
import ChatsScreen from '../../screens/ChatsScreen/ChatsScreen'
import ContactsScreen from '../../screens/ContactsScreen'
import MainTabNavigator from './MainTabNavigator'
import NewGroupScreen from '../../screens/NewGroupScreen'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'whitesmoke'}}}>
            <Stack.Screen name='Home' component={MainTabNavigator} options={{headerShown:false}} />
            <Stack.Screen name='Chat' component={ChatScreen} />
            <Stack.Screen name='Contacts' component={ContactsScreen} />
            <Stack.Screen name='New Group' component={NewGroupScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation