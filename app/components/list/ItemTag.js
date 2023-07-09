import {View, Text, StyleSheet} from 'react-native';
import {GlobalStyle} from '../../constants/styles';

const ItemTag = ({tagName}) => {
  return (
    <View style={styles.tagBox}>
      <Text style={styles.tag}>{tagName}</Text>
    </View>
  );
};
export default ItemTag;

const styles = StyleSheet.create({
  tagBox: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 25,
    marginHorizontal: 5,
    marginBottom: 5,
    backgroundColor: GlobalStyle.colors.primary400,
  },
  tag: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
});
