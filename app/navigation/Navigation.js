import {Text,Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CreateEditTodo from '../screens/CreateEditTodo';
import TodoList from '../screens/TodoList';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TodoList"
        screenOptions={{
          headerStyle: {backgroundColor: '#F7FFE5'},
          headerTintColor: '#A0C49D',
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
              <Button
                onPress={() => navigation.navigate('TodoList')}
                title="< List"
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
