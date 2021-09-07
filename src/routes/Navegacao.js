import  React  from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../screens/Login/Login';
import NovoLogin from '../screens/Login/NovoLogin';
import Menu from '../screens/Menu/Menu';

const Stack = createStackNavigator();

function Navegacao() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{
            title: 'Entrar'
          }}
        />

        <Stack.Screen
          name='NovoLogin'
          component={NovoLogin}
          options={{
            title: 'Cadastrar'
          }}
        />

        <Stack.Screen 
          name='Menu'
          component={Menu}
          options={{
            title: 'Menu?'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navegacao