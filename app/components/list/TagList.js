import {View} from 'react-native';
import Tag from './Tag';

const TagList = ({tag, style, onPress}) => {
  return (
    <View style={style}>
      {tag&&tag.map(item => (
        <Tag key={item} tagName={item} onPress={onPress} />
      ))}
    </View>
  );
};
export default TagList;
