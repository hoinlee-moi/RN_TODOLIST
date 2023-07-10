import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const IconButton = ({icon, size, color, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => pressed && styles.pressed}>
      <View>
        <Icon name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
});
