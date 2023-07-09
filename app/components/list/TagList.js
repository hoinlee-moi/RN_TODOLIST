import {View} from 'react-native';
import Tag from './Tag';

const TagList = ({tag, style}) => {
  return (
    <View style={style}>
      {tag.map(item => (
        <Tag key={item} tagName={item} />
      ))}
    </View>
  );
};
export default TagList;
