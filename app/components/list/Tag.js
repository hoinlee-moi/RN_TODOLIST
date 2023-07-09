import {View, Text,Pressable, StyleSheet} from 'react-native';
import {GlobalStyle} from '../../constants/styles';

const Tag = ({tagName,onPress}) => {
  return (
    <Pressable onpress={onPress}>
      <View style={styles.tagBox}>
        <Text style={styles.tag}>{tagName}</Text>
      </View>
    </Pressable>
  );
};
export default Tag;

const styles = StyleSheet.create({
  tagBox: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 25,
    minWidth: 50,
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: GlobalStyle.colors.primary400,
    borderRadius: 8,
  },
  tag: {
    lineHeight: 19,
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
});
