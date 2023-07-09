import {View} from 'react-native';
import ItemTag from './ItemTag';

const ItemTagList = ({tag, style}) => {
  return (
    <View style={style}>
      {tag.map(item => (
        <ItemTag key={item} tagName={item} />
      ))}
    </View>
  );
};
export default ItemTagList;
