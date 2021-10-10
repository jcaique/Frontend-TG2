import  React  from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../screens/Login/Login';
import NovoLogin from '../screens/Login/NovoLogin';
import Sites from '../screens/Sites/Sites';
import Contas from '../screens/Contas/Contas';
import NovaConta from '../screens/Contas/NovaContas';

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
            title: 'Criar Conta'
          }}
        />

        <Stack.Screen 
          name='Sites'
          component={Sites}
          options={{
            title: 'Websites'
          }}
        />

        <Stack.Screen
          name='Contas'
          component={Contas}
          options={{
            title:'Suas Contas'
          }}
        />

        <Stack.Screen
          name='NovaConta'
          component={NovaConta}
          options={{
            title:'Adicionar Conta'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navegacao