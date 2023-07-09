import {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import {GlobalStyle} from '../../constants/styles';
import TagList from '../list/TagList';
import DefalutButton from '../ui/DefaultButton';
import ModalComponent from '../ui/ModalComponent';
import Input from './Input';
import SelectDate from './SelectDate';

const TodoForm = ({isEditing, defalutValue}) => {
  const [inputValue, setInputValue] = useState({
    content: defalutValue ? defalutValue.content : '',
    date: defalutValue ? defalutValue.date : '',
    tag: defalutValue ? defalutValue.tag : [],
    check: defalutValue ? defalutValue.check : false,
  });
  const [inputModalState, setInputModalState] = useState(false);

  const inputChangeHandle = (inputName, value) => {
    setInputValue(prevInputValue => {
      return {
        ...prevInputValue,
        [inputName]: value,
      };
    });
  };
  const tagInputModalVisible = () =>
    setInputModalState(prevState => !prevState);

  const tagInputChangeHandler = tagName => {
    if (inputValue.tag.includes(tagName)||inputValue.tag.length>=10) return;
    setInputValue(prevInputValue => {
      return {
        ...prevInputValue,
        ['tag']: [...prevInputValue.tag, tagName],
      };
    });
  };
  const tagDeleteHandler = tagName => {
    const newTagList = inputValue.tag.filter(tag => tag !== tagName);
    setInputValue(prevInputValue => {
      return {
        ...prevInputValue,
        ['tag']: [...newTagList],
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
        <View>
          <TagList
            tag={inputValue.tag}
            onPress={tagDeleteHandler}
            style={styles.tagContainer}
          />
        </View>
        <View>
          <DefalutButton
            onPress={tagInputModalVisible}
            style={styles.tagInputButton}
            textStyle={styles.buttonText}>
            태그추가
          </DefalutButton>
        </View>

        <ModalComponent
          isVisible={inputModalState}
          modalType="input"
          modalText="태그를 입력해주세요"
          closeModal={tagInputModalVisible}
          handleConfirm={tagInputChangeHandler}
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
  tagInputButton: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  tagContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
});
