import {Image, TouchableOpacity, StyleSheet} from 'react-native';

const ImageButton = ({name, onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Image style={styles.button} source={name} />
    </TouchableOpacity>
  );
};

export default ImageButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  button: {
    width: '100%',
    height: '100%',
  },
});
