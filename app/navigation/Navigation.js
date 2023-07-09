import {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CreateEditTodo from '../screens/CreateEditTodo';
import TodoList from '../screens/TodoList';
import IconButton from '../components/ui/IconButton';
import {GlobalStyle} from '../constants/styles';
import {TodoContext} from '../provider/todoContext';
import ImageButton from '../components/ui/ImageButton';
import {images} from '../constants/images';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const todoCtx = useContext(TodoContext);
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
            headerRight: () => (
              <ImageButton
                name={images.delete}
                onPress={todoCtx.deleteTodo}
                style={{width: 25, height: 25}}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
