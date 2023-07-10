import {View, Text, StyleSheet} from 'react-native';

import { GlobalStyle } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';

const Date = ({style, date}) => {
  const {message, urgent} = getFormattedDate(date, 7);

  return (
    <View style={style}>
      <Text style={[styles.date,urgent&&styles.urgentDate]}>{date ? message : '날짜 선택'}</Text>
    </View>
  );
};

export default Date;

const styles = StyleSheet.create({
  date: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  urgentDate:{
    color:GlobalStyle.colors.error100
  }
});
