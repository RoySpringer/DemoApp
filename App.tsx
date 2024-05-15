import React, {useCallback, useEffect, useState} from 'react';

import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const windowSize = 3;

const image1 = require('./assets/image1.jpg');
const image2 = require('./assets/image2.jpg');
const image3 = require('./assets/image3.jpg');

const images = [
  {id: '1', image: image1},
  {id: '2', image: image2},
  {id: '3', image: image3},
];

const keyExtractor = (item: {id: string}): string => item.id;

const getItemLayout = (_data: any, index: number) => ({
  length: width,
  offset: width * index,
  index,
});

function App(): React.JSX.Element {
  const listRef = React.useRef<FlatList>(null);
  const [currentIndex, setCurrentSegmentIndex] = useState<number>(0);

  const handleViewableItemsChanged = useCallback((event: any) => {
    console.log('ViewableItems', event.viewableItems);
    const singleViewableItem = event.viewableItems.length === 1;

    // NOTE: We only care about one item taking whole viewport (list not  scrolled in between 2 items)
    if (!singleViewableItem) {
      return;
    }

    const currentViewableItem = event.viewableItems.shift();

    if (!currentViewableItem) {
      return;
    }

    const {index: currentViewableItemIndex} = currentViewableItem;

    console.log('currentViewableItemIndex', currentViewableItemIndex);

    setCurrentSegmentIndex(currentViewableItemIndex);
  }, []);

  useEffect(() => {
    console.log('currentIndex', currentIndex);
  }, [currentIndex]);

  const renderItemImage = ({item}: {item: {id: string; image: any}}) => {
    return (
      <View style={styles.imageContainer}>
        <Image source={item.image} resizeMode="cover" style={{width, height}} />
      </View>
    );
  };

  return (
    <View style={styles.listContainer}>
      <FlatList
        ref={listRef}
        data={images}
        renderItem={renderItemImage}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        bounces={false}
        keyExtractor={keyExtractor}
        nestedScrollEnabled
        getItemLayout={getItemLayout}
        onViewableItemsChanged={handleViewableItemsChanged}
        initialNumToRender={1}
        windowSize={windowSize}
        maxToRenderPerBatch={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;
