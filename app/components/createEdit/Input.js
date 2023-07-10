import {View, TextInput, StyleSheet} from 'react-native';

const Input = ({style,textInputConfig}) => {
  return (
    <View style={style}>
      <TextInput style={styles.input} {...textInputConfig}  />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    fontSize: 15,
  },
});
