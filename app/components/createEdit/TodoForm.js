import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {images} from '../../constants/images';
import {GlobalStyle} from '../../constants/styles';
import TagList from '../list/TagList';
import CheckBox from '../ui/CheckBox';
import DefalutButton from '../ui/DefaultButton';
import ImageButton from '../ui/ImageButton';
import ModalComponent from '../ui/ModalComponent';
import Input from './Input';
import SelectDate from './SelectDate';

const TodoForm = ({isEditing, defalutValue, onSubmit, onDelete}) => {
  const [inputValue, setInputValue] = useState({
    content: defalutValue ? defalutValue.content : '',
    date: defalutValue ? defalutValue.date : '',
    tag: defalutValue ? defalutValue.tag : [],
    check: defalutValue ? defalutValue.check : false,
  });
  const [inputModalState, setInputModalState] = useState(false);
  const [errorState, setErrorState] = useState(false);
  
// input값 변경 name으로 통제(bind를 통해 name값 전달)
  const inputChangeHandle = (inputName, value) => {
    if (errorState) setErrorState(false);
    setInputValue(prevInputValue => {
      return {
        ...prevInputValue,
        [inputName]: value,
      };
    });
  };

  //태그 저장 모달 
  const tagInputModalVisible = () =>
    setInputModalState(prevState => !prevState);

  //태그 저장 및 삭제 로직
  const tagInputChangeHandler = (state, tagName) => {
    switch (state) {
      case 'add':
        if (inputValue.tag.includes(tagName) || inputValue.tag.length >= 10)
          return;
        setInputValue(prevInputValue => {
          return {
            ...prevInputValue,
            ['tag']: [...prevInputValue.tag, tagName],
          };
        });
        break;
      case 'delete':
        const newTagList = inputValue.tag.filter(tag => tag !== tagName);
        setInputValue(prevInputValue => {
          return {
            ...prevInputValue,
            ['tag']: [...newTagList],
          };
        });
      default:
        break;
    }
  };

  const onSubmitHandler = () => {
    if (inputValue.date === '' || inputValue.content.trim().length < 1) {
      setErrorState(true);
      return;
    }
    onSubmit(inputValue);
  };

  return (
    <>
      <SelectDate
        addInputHandler={inputChangeHandle}
        defaultDate={inputValue.date}
      />
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          {isEditing && (
            <CheckBox
              checked={inputValue.check}
              style={styles.checkBoxContainer}
              onPress={inputChangeHandle.bind(this, 'check')}
            />
          )}
          <Input
            style={styles.inputBox}
            textInputConfig={{
              placeholder: '할 일을 입력해주세요',
              onChangeText: inputChangeHandle.bind(this, 'content'),
              maxLength: 70,
              value: inputValue.content,
            }}
          />
        </View>
        <TagList
          tag={inputValue.tag}
          onPress={tagInputChangeHandler.bind(this, 'delete')}
          style={styles.tagContainer}
        />
        <DefalutButton
          onPress={tagInputModalVisible}
          style={styles.tagInputButton}
          textStyle={styles.buttonText}>
          태그추가
        </DefalutButton>
        <ModalComponent
          isVisible={inputModalState}
          modalType="input"
          modalText="태그를 입력해주세요"
          closeModal={tagInputModalVisible}
          handleConfirm={tagInputChangeHandler.bind(this, 'add')}
        />
      </View>
      {errorState && (
        <View style={styles.errorTextContainer}>
          <Text style={styles.errorText}>날짜 혹은 내용을 입력해주세요</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <DefalutButton
          style={styles.submitButtonContainer}
          textStyle={styles.submitButton}
          onPress={onSubmitHandler}>
          {isEditing ? '수정하기' : '추가하기'}
        </DefalutButton>
        {isEditing && (
          <ImageButton
            name={images.delete}
            onPress={onDelete}
            style={styles.deleteButtonContainer}
          />
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxContainer: {
    width: 30,
    height: 30,
    marginRight: 12,
    backgroundColor: GlobalStyle.colors.primary300,
  },
  inputBox: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: GlobalStyle.colors.primary100,
  },
  tagInputButton: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: GlobalStyle.colors.gray500,
  },
  tagContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  errorTextContainer: {
    marginTop: 15,
  },
  errorText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: GlobalStyle.colors.error100,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  submitButtonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: GlobalStyle.colors.primary200,
  },
  submitButton: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
  deleteButtonContainer: {
    marginLeft:40,
    width: 35,
    height: 35,
  },
});
