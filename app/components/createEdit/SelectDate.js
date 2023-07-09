import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {images} from '../../constants/images';
import {GlobalStyle} from '../../constants/styles';
import {isPastDate} from '../../util/date';
import ImageButton from '../ui/ImageButton';
import Date from './Date';

const SelectDate = () => {
  const [date, setDate] = useState('');
  const [errorState, setErrorState] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState();

  const visibleDatePicker = () => {
    setErrorState(false);
    setDatePickerVisible(prevState => !prevState);
  };

  const handleConfirm = date => {
    const isPast = isPastDate(date);
    visibleDatePicker();
    if (isPast) {
      setErrorState(true);
      return;
    }
    setDate(date);
  };

  return (
    <View style={styles.selectDateContainer}>
      <View style={styles.selectContainer}>
        <ImageButton
          name={images.checkDate}
          style={styles.imageButtonContainer}
          onPress={visibleDatePicker}
        />
        <Date style={styles.dateContainer} date={date} />
        <DateTimePickerModal
          isVisible={datePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={visibleDatePicker}
        />
      </View>
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>
          {errorState && '과거 날짜는 선택하실 수 없습니다'}
        </Text>
      </View>
    </View>
  );
};

export default SelectDate;

const styles = StyleSheet.create({
  selectDateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 40,
    backgroundColor: GlobalStyle.colors.primary200,
  },
  imageButtonContainer: {
    width: 30,
    height: 30,
  },
  dateContainer: {
    marginLeft: 10,
  },
  errorContainer: {
    marginTop: 5,
  },
  errorMessage: {
    fontSize: 15,
    fontWeight: 'bold',
    color: GlobalStyle.colors.error100,
  },
});
