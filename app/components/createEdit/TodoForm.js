import {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import {GlobalStyle} from '../../constants/styles';
import Input from './Input';
import SelectDate from './SelectDate';

const TodoForm = ({isEditing, defalutValue}) => {
  const [inputValue, setInputValue] = useState({
    content: defalutValue ? defalutValue.content : '',
    date: defalutValue ? defalutValue.date : '',
    tag: defalutValue ? defalutValue.tag : [],
    check: defalutValue ? defalutValue.check : false,
  });

  const inputChangeHandle = (inputName, value) => {
    setInputValue(prevInputValue => {
      return {
        ...prevInputValue,
        [inputName]: value,
      };
    });
  };

  return (
    <>
      <SelectDate addInputHandler={inputChangeHandle} />
      <View style={styles.formContainer}>
        <Input
          style={styles.inputContainer}
          textInputConfig={{
            placeholder: '할 일을 입력해주세요',
            onChangeText: inputChangeHandle.bind(this, 'content'),
            maxLength: 70,
          }}
        />

      </View>
    </>
  );
};

export default TodoForm;

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    minHeight: 150,
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: GlobalStyle.colors.primary200,
  },
  inputContainer: {
    borderRadius: 8,
    backgroundColor: GlobalStyle.colors.primary100,
  },
});
