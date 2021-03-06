/*
 *This is the home screen of our application
 *our actual application design logic will be
 *implemented here
 */

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  Alert,
  PermissionsAndroid,
  Animated,
  PanResponder,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchCamera} from 'react-native-image-picker';

//bring our custom color component
import Color from '../component/Color';
import {RootStackParamList} from '../NavigationFlow';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RenderImage from './homeComponent/RenderImage';
import AsyncStorage from '@react-native-async-storage/async-storage';

//define globally of color value
const ColorValue = Color();
const {width} = Dimensions.get('window');

// create props of navigation
//get props of auth root stack
type Props = NativeStackScreenProps<RootStackParamList, 'ImageView'>;

const HomeScreen = ({navigation}: Props) => {
  // for pan responder
  const pan = useRef(new Animated.ValueXY()).current;
  // our use state is defined here
  // define state to save data inside local storage
  const [imageData, setImageData] = useState<any>([]);
  // define use state for swipe left/right
  const [swipeValue, setSwipeValue] = useState<string>('');

  /**
   * Persists data from local storage
   */
  useEffect(() => {
    getImage();
  }, []);
  // method to persist data from local storage
  const getImage = async () => {
    var result = JSON.parse((await AsyncStorage.getItem('imageData')) || '[]');
    // after persist, put it inside our state
    setImageData(result);
  };

  /**
   * Camera related method will define here
   */
  const OpenCameraMethod = async () => {
    //create options
    let options: any = {
      title: 'Select Image',
      mediaType: 'photo',
      maxWidth: 1500,
      maxHeight: 1500,
      quality: 0.5,
      saveToPhotos: true,
    };

    try {
      // get permission from user
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Image gallery App Camera Permission',
          message:
            'Image gallery App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(options, response => {
          if (response.didCancel) {
            if (__DEV__) {
              console.log('User cancelled photo picker');
            }

            Alert.alert('You did not select any image');
          } else if (response.errorCode) {
            if (__DEV__) console.log('ImagePicker Error: ', response.errorCode);
          } else {
            //get actual objects

            if (!response.assets) {
              return null;
            } else {
              let source = response.assets[0];
              //put source inside state
              // setImageData([...imageData, source]);
              // process to save image inside local storage
              const storeImage = [...imageData, source];
              setImageData(storeImage);
              // store it inside local storage
              AsyncStorage.setItem('imageData', JSON.stringify(storeImage));
            }
          }
        });
      } else {
        Alert.alert('Camera permission denied');
      }
    } catch (err) {
      if (__DEV__) {
        console.log(err, 'from camera open');
      }
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      //This will give us access to button inside pan responder
      onMoveShouldSetPanResponder: (evt, {dx, dy}) => {
        if (dx > 0 || dy > 0) {
          return true;
        }
        return false;
      },

      // onPanResponderMove: (evt, gestureState) => { },
      onPanResponderRelease: (evt, gestureState) => {
        // if user left swipe is true
        if (gestureState.dx > 70) {
          //do left swipe stuff
          setSwipeValue('Left-Swipe');
        } else if (gestureState.dx < -70) {
          // do right swipe stuff
          setSwipeValue('Right-Swipe');
        }

        pan.flattenOffset();
      },
    }),
  ).current;

  return (
    <SafeAreaView style={styles.SafeAreaViewStyle}>
      <StatusBar backgroundColor={ColorValue.Black} />

      <ScrollView
        horizontal={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ContentStyle}>
        <Animated.View
          style={styles.BodyViewStyle}
          {...panResponder.panHandlers}>
          {/* Render Image component */}
          <View style={styles.imageView}>
            <RenderImage
              swipeValue={swipeValue}
              setSwipeValue={setSwipeValue}
              ImageData={imageData}
              navigation={navigation}
            />
          </View>
        </Animated.View>
      </ScrollView>
      {/* Camera button will be appear here */}
      <View style={styles.cameraImageView}>
        <TouchableOpacity activeOpacity={0.5} onPress={OpenCameraMethod}>
          <Image
            source={require('../../assets/camera.png')}
            style={styles.cameraImageStyle}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  SafeAreaViewStyle: {
    flex: 1,
    backgroundColor: ColorValue.WHITE,
  },
  ContentStyle: {
    flexGrow: 1,
  },
  BodyViewStyle: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  cameraImageStyle: {
    width: width * 0.11,
    height: width * 0.11,
    backgroundColor: ColorValue.WHITE,
    // borderRadius: ResponsiveFontSize(100),
  },
  imageView: {
    width: '100%',
    alignItems: 'center',
  },
  cameraImageView: {
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
