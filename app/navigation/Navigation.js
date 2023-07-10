import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CreateEditTodo from '../screens/CreateEditTodo';
import TodoList from '../screens/TodoList';
import IconButton from '../components/ui/IconButton';
import {GlobalStyle} from '../constants/styles';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TodoList"
        screenOptions={{
          headerStyle: {backgroundColor: GlobalStyle.colors.primary100},
          headerTintColor: GlobalStyle.colors.primary400,
          headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="TodoList"
          component={TodoList}
          options={{title: 'TO DO LIST!'}}
        />
        <Stack.Screen
          name="CreateEditTodo"
          component={CreateEditTodo}
          options={({navigation}) => ({
            title: 'TO DO',
            headerLeft: () => (
              <IconButton
                icon="arrowleft"
                size={20}
                color={GlobalStyle.colors.primary400}
                onPress={() => navigation.navigate('TodoList')}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
