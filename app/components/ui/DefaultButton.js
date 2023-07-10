import {View, Text, Pressable, StyleSheet} from 'react-native';

const DefalutButton = ({children, onPress, style,textStyle}) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => pressed && styles.pressed}>
        <View>
          <Text style={textStyle}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default DefalutButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  
});
