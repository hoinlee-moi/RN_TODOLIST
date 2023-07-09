import {Pressable, View, Image, Text, StyleSheet} from 'react-native';
import {images} from '../../constants/images';

const CheckBox = ({checked, onPress, style}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={style}>
        {checked && <Image source={images.checkBox} style={styles.image} />}
      </View>
    </Pressable>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
