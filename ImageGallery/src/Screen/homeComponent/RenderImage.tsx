import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {heightToDp, ResponsiveFontSize} from '../../component/Responsive';
import ConstValue from '../../component/ConstValue';
import Color from '../../component/Color';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../NavigationFlow';

//get dimension value
const {width} = Dimensions.get('window');
const ColorValue = Color();

const RenderImage = ({ImageData, swipeValue, setSwipeValue}: any) => {
  // define navigation by use navigation hook
  const navigation = useNavigation<any>();

  ///pagination useState
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postPerPage] = useState<number>(4);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = ImageData?.slice(indexOfFirstPost, indexOfLastPost);

  ///start pagination screen here
  const totalPosts = ImageData.length;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }
  const [pageLength, setPageLength] = useState<number>(pageNumbers.length);

  useEffect(() => {
    setPageLength(pageNumbers.length);
  }, [pageNumbers.length]);

  useEffect(() => {
    if (swipeValue) {
      // called right swipe method
      if (swipeValue === 'Right-Swipe') {
        NextPageMethod();
        //after each called, we need to clear our state
        setSwipeValue('');
      } else if (swipeValue === 'Left-Swipe') {
        //called left swipe method
        PreviousPageMethod();
        //after each called, we need to clear our state
        setSwipeValue('');
      }
    }
  }, [swipeValue]);

  // On press method will be goes here
  // for next page
  const NextPageMethod = () => {
    if (currentPage >= 1 && currentPage < pageNumbers.length) {
      return setCurrentPage(currentPage + 1);
    }
  };
  // for previous screen
  const PreviousPageMethod = () => {
    if (currentPage > 1 && currentPage <= pageNumbers.length) {
      return setCurrentPage(currentPage - 1);
    }
  };

  //render if no image is found
  if (!currentPosts?.length) {
    return (
      <View style={styles.noImageFoundView}>
        <Text style={styles.noImageFoundText}>
          No image found. Please add some image by clicking on camera button
        </Text>
      </View>
    );
  }

  // navigate to clickable image full screen mode
  const navigateToFullScreen = (item: any) => {
    navigation.navigate('ImageView', {item: item});
  };

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        {currentPosts.map((item: any) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigateToFullScreen(item);
              }}
              activeOpacity={0.5}
              key={item.uri}
              style={styles.mapContainer}>
              <Image source={{uri: item.uri}} style={styles.imageStyle} />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* pagination content render here */}
      <View style={styles.paginationView}>
        {/* Previous button component */}
        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={PreviousPageMethod}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
        </View>
        {/* Total page component */}
        <View>
          <Text style={styles.pageText}>
            {currentPage} of {pageLength}
          </Text>
        </View>

        {/* next button component */}
        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={NextPageMethod}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RenderImage;

const styles = StyleSheet.create({
  noImageFoundView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: heightToDp(2),
  },
  noImageFoundText: {
    fontSize: ConstValue.regularFontSize + 1,
    color: ColorValue.BLACK,
    textAlign: 'center',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingVertical: heightToDp(1),
  },
  bodyContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  mapContainer: {
    marginVertical: heightToDp(1),
  },
  imageStyle: {
    width: width / 2.2,
    height: width / 2,
    borderRadius: ResponsiveFontSize(5),
    resizeMode: 'cover',
  },
  paginationView: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    padding: 3,
  },
  buttonText: {
    fontSize: ConstValue.regularFontSize,
    color: ColorValue.Home_Tab_Color,
  },
  pageText: {
    fontSize: ConstValue.regularFontSize,
    color: ColorValue.BLACK,
    padding: 3,
  },
});
