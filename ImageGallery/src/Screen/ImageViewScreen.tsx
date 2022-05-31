import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../NavigationFlow';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ResponsiveFontSize, widthToDp} from '../component/Responsive';
import {SafeAreaView} from 'react-native-safe-area-context';
import Color from '../component/Color';

//get dimension value
const {width} = Dimensions.get('window');
const ColorValue = Color();

// create props of navigation
//get props of auth root stack
type Props = NativeStackScreenProps<RootStackParamList, 'ImageView'>;

const ImageViewScreen = ({navigation, route}: Props) => {
  //object destruct
  const {item} = route.params;

  // close image full screen modal
  const navigateToBack = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.SafeAreaViewStyle}>
      <StatusBar backgroundColor={ColorValue.Black} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ContentStyle}>
        <View style={styles.BodyViewStyle}>
          <Image source={{uri: item.uri}} style={styles.imageStyle} />
        </View>
      </ScrollView>
      {/* Close button will appear here */}
      <View style={styles.closeView}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.closeButton}
          onPress={navigateToBack}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ImageViewScreen;

const styles = StyleSheet.create({
  SafeAreaViewStyle: {
    flex: 1,
    backgroundColor: ColorValue.WHITE,
    position: 'relative',
  },
  ContentStyle: {
    flexGrow: 1,
  },
  BodyViewStyle: {
    flex: 1,
  },
  imageStyle: {
    // width: width * 0.9,
    // height: width * 0.9,
    // borderRadius: ResponsiveFontSize(5),
    flex: 1,
    resizeMode: 'cover',
  },
  closeView: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButton: {
    borderRadius: ResponsiveFontSize(100),
    borderWidth: 1,
    paddingHorizontal: widthToDp(2),
    backgroundColor: ColorValue.WHITE,
  },
  closeButtonText: {
    fontSize: ResponsiveFontSize(20),
    color: ColorValue.Black,
  },
});
