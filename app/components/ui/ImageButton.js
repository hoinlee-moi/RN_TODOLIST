import { Image, Pressable, StyleSheet} from 'react-native';

const ImageButton = ({name, onPress, style}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [style, pressed && styles.pressed]}>
      <Image style={styles.button} source={name} />
    </Pressable>
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
