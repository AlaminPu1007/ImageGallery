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

//get dimension value
const {width} = Dimensions.get('window');
const ColorValue = Color();

const RenderImage = ({ImageData}: any) => {
  ///pagination useState
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postPerPage, setPostPerPage] = useState<number>(4);

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

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        {currentPosts?.length ? (
          currentPosts.map(item => {
            return (
              <View key={item.uri} style={styles.mapContainer}>
                <Image source={{uri: item.uri}} style={styles.imageStyle} />
              </View>
            );
          })
        ) : (
          <Text>no image found</Text>
        )}
      </View>

      {/* pagination content render here */}
      <View style={styles.paginationView}>
        {/* Previous button component */}
        <View>
          <TouchableOpacity activeOpacity={0.5} style={styles.buttonStyle}>
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
          <TouchableOpacity activeOpacity={0.5} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RenderImage;

const styles = StyleSheet.create({
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
    borderWidth: 1,
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
