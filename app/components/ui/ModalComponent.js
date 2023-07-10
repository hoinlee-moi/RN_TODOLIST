import React, {useState} from 'react';
import {View, Modal, TextInput, Text, StyleSheet} from 'react-native';
import {GlobalStyle} from '../../constants/styles';
import DefalutButton from './DefaultButton';

const ModalComponent = ({
  isVisible,
  closeModal,
  modalType,
  handleConfirm,
  modalText,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = text => setInputValue(text);
  const handleConfirmClick = () => {
    switch (modalType) {
      case 'input':
        if (inputValue.trim().length < 1) {
          closeModal();
          return;
        }
        handleConfirm(inputValue);
        closeModal();
        break;
      case 'alert':
        handleConfirm();
        closeModal();
        break;
      default:
        closeModal();
        break;
    }
  };

  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.contentContainer}>
            {modalType === 'input' && (
              <TextInput
                style={styles.input}
                placeholder={modalText}
                onChangeText={handleInputChange}
                maxLength={30}
              />
            )}
            {modalType === 'alert' && (
              <Text style={styles.text}>{modalText}</Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <DefalutButton
              textStyle={[styles.button, styles.confirmButton]}
              onPress={handleConfirmClick}>
              확인
            </DefalutButton>
            <DefalutButton textStyle={styles.button} onPress={closeModal}>
              취소
            </DefalutButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    minHeight: 150,
    padding: 20,
    borderRadius: 8,
    backgroundColor: GlobalStyle.colors.primary200,
  },
  contentContainer: {
    flex: 1,
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width:'100%',
    height: 45,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: GlobalStyle.colors.primary100,
  },
  buttonContainer: {
    flex: 1,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: GlobalStyle.colors.error100,
  },
  confirmButton: {
    color: GlobalStyle.colors.confirm,
  },
});

export default ModalComponent;
