import {StyleSheet,View,Text} from "react-native"
import { getFormattedDate } from "../../util/date";

const ItemDate = ({date}) => {

  return (
    <View style={styles.dateContainer}>
      <Text>해결중</Text>
    </View>
  );
};

export default ItemDate

const styles = StyleSheet.create({
    dateContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
      },
      date:{
        fontSize: 13,
        fontWeight:'bold',
      }
})