/*
 *This is the home screen of our application
 *our actual application design logic will be
 *implemented here
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// bring custom responsive thing
import {heightToDp, ResponsiveFontSize} from '../component/Responsive';
//bring our custom color component
import Color from '../component/Color';
import {RootStackParamList} from '../NavigationFlow';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RenderImage from './homeComponent/RenderImage';
//define globally of color value
const ColorValue = Color();
const {width} = Dimensions.get('window');

// create props of navigation
//get props of auth root stack
type Props = NativeStackScreenProps<RootStackParamList, 'ImageView'>;

const HomeScreen = ({navigation}: Props) => {
  // our use state is defined here
  const [imageData, setImageData] = useState<any>([]);

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
              setImageData([...imageData, source]);
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

  return (
    <SafeAreaView style={styles.SafeAreaViewStyle}>
      <StatusBar backgroundColor={ColorValue.Black} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ContentStyle}>
        <View style={styles.BodyViewStyle}>
          {/* Render Image component */}
          <View style={styles.imageView}>
            <RenderImage ImageData={imageData} />
          </View>
        </View>
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
