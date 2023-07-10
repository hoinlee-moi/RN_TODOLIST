import React, {useContext, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Pressable, View, Text, StyleSheet, Animated, Alert} from 'react-native';

import {GlobalStyle} from '../../constants/styles';
import {TodoContext} from '../../provider/todoContext';
import CheckBox from '../ui/CheckBox';
import TagList from './TagList';
import Date from '../createEdit/Date';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import ImageButton from '../ui/ImageButton';
import {images} from '../../constants/images';
import ModalComponent from '../ui/ModalComponent';

const ListItem = ({id, content, date, check, tag}) => {
  const todoCtx = useContext(TodoContext);
  const navigation = useNavigation();
  const [deleteModalState, setDeleteModalState] = useState(false);

  // swipe 로직을 위한 useRef 고정값과 라이브러리의 상태값(SWIPE_LEFT...)
  const swipeAnimation = useRef(new Animated.Value(0)).current;
  const buttonSwipeAnimation = useRef(new Animated.Value(0)).current;
  const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;

  //체크박스 로직
  const checkBoxPressHandler = () => todoCtx.checkTodo(id);

  const itemPressHandler = () =>
    navigation.navigate('CreateEditTodo', {itemId: id});

  const deleteModalVisible = () => setDeleteModalState(prevState => !prevState);

  //삭제 모달 확인시 실행
  const onDeleteHandler = async () => {
    try {
      await todoCtx.deleteTodo(id);
    } catch (error) {
      Alert.alert('Error!', 'Internal Server error', [
        {text: 'Sorry!', style: 'cancel'},
      ]);
    }
  };

  //x 이동거리 값이 -로 갈경우 왼쪽 그반대 오른쪽
  const figureHorizontalDirection = delta =>
    delta > 0 ? SWIPE_RIGHT : SWIPE_LEFT;

    //swipe시 이동 값을 x,y값으로 받아 방향 판단 x값이 크다는 건 x축 이동
  const detectSwipeDirection = ({dx, dy}) => {
    return Math.abs(dx) > Math.abs(dy) && figureHorizontalDirection(dx);
  };

  //animated 사용 로직 value로 이동값
  const swipeHandler = (target, swipeValue) => {
    Animated.timing(target, {
      toValue: swipeValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  //라이브러리 내의 onSwipe 함수를 통해 swipe 애니메이션 구현 로직 
  const onSwipeHandler = (directionNull, gestureState) => {
    const {dx, dy} = gestureState;
    const direction = detectSwipeDirection({dx, dy});

    if (direction === SWIPE_LEFT) {
      swipeHandler(swipeAnimation, -110);
      swipeHandler(buttonSwipeAnimation, 0);
      return;
    }
    swipeHandler(swipeAnimation, 0);
    swipeHandler(buttonSwipeAnimation, 100);
  };

  return (
    <>
      <GestureRecognizer onSwipe={onSwipeHandler}>
        <Pressable
          onPress={itemPressHandler}
          style={({pressed}) => pressed && styles.pressed}>
          <Animated.View style={[{transform: [{translateX: swipeAnimation}]}]}>
            <View style={styles.todoItemContainer}>
              <CheckBox
                checked={check}
                style={styles.checkBoxContainer}
                onPress={checkBoxPressHandler}
              />
              <View style={styles.todoContentContainer}>
                <View style={styles.todoWrap}>
                  <Text style={styles.todoContent}>{content}</Text>
                </View>
                {tag && (
                  <TagList
                    tag={tag}
                    style={styles.tagContainer}
                    onPress={todoCtx.manageTagList.bind(this, 'add')}
                  />
                )}
              </View>
              <Date date={date} style={styles.dateContainer} />
              <Animated.View
                style={{transform: [{translateX: buttonSwipeAnimation}]}}>
                <View>
                  <ImageButton
                    style={styles.swipeDeleteButton}
                    name={images.delete}
                    onPress={deleteModalVisible}
                  />
                </View>
              </Animated.View>
            </View>
          </Animated.View>
        </Pressable>
      </GestureRecognizer>
      <ModalComponent
        isVisible={deleteModalState}
        closeModal={deleteModalVisible}
        modalType="alert"
        modalText="정말 삭제하시겠습니까?"
        handleConfirm={onDeleteHandler}
      />
    </>
  );
};

export default React.memo(ListItem);

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  swipeStyle: {
    flexDirection: 'row',
  },
  todoItemContainer: {
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    backgroundColor: GlobalStyle.colors.primary200,
    borderRadius: 5,
  },
  checkBoxContainer: {
    width: 26,
    height: 25,
    marginRight: 12,
    backgroundColor: GlobalStyle.colors.primary300,
  },
  todoContentContainer: {
    width: '70%',
    height: '100%',
    marginBottom: 10,
  },
  todoWrap: {
    flex: 1,
    width: '100%',
  },
  todoContent: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  tagContainer: {
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 100,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  dateContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  swipeDeleteButton: {
    width: 60,
    height: 60,
    transform: [{translateX: 100}],
    backgroundColor: GlobalStyle.colors.error100,
  },
});
