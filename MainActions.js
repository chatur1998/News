import * as firebase from 'firebase';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as ImagePicker from 'expo-image-picker';
import { IMAGE_CLICKED,
          NAME_CHANGED,
          RENDER_LIST,
          IMAGE_MOUNTED,
          URI_GENERATED,
          IMAGE_SELECTED,
          NEW_IMAGE_CLICKED } from './types';

export const nameChanged = (text) => {
    return {
      type: NAME_CHANGED,
      payload: text
    };
};

export const newPressed = (NewName) => {
    return async (dispatch) => {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true
      });

      if (!res.cancelled) {
        uploadImage1(res.uri, 'IMG_' + Math.random(1000000000), NewName)
          .then(() => {
            Alert.alert(' Uploaded Successfully!!');
             dispatch({
              type: NEW_IMAGE_CLICKED,
              payload: res.uri,
            });
          }).catch((error) => {
            console.log(error);
          });
      }
    };
};

export const folderPressed = (NewName, name) => {
  return async (dispatch) => {
    //const result = await ImagePicker.launchCameraAsync();
    // const result = await ImagePicker.launchImageLibraryAsync();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
       allowsEditing: true
    });

    if (!result.cancelled) {
      uploadImage(result.uri, 'IMG_' + Math.random(1000000000), NewName, name)
        .then(() => {
          Alert.alert(' Uploaded Successfully!!');
           dispatch({
            type: IMAGE_CLICKED,
            payload: result.uri,
            naam: name
          });
        }).catch((error) => {
          console.log(error);
        });
    }
  };
};

const uploadImage = async (uri, imageName, NewFolderName, name) => {
  const response = await fetch(uri);
  const blob = await response.blob();

    const ref = firebase.storage().ref(`${name}`).child(`${imageName}`);
    return ref.put(blob);
};

const uploadImage1 = async (uri, imageName, NewFolderName) => {
  const response = await fetch(uri);
  const blob = await response.blob();

    const ref = firebase.storage().ref(`${NewFolderName}`).child(`${imageName}`);
    return ref.put(blob);
};

export const showList = () => {
  return async (dispatch) => {
    const array = await firebase.storage().ref().listAll();
    const data = await array.prefixes;
    dispatch({
      type: RENDER_LIST,
      payload: data
    });
    Actions.folders();
    //   console.log(pleasehoj);
    //   console.log(aaa);
  };
};

export const loadImages = (folderName) => {
  return async (dispatch) => {
    const imagesArray = await firebase.storage().ref(`${folderName}`).listAll();
    const images = await imagesArray.items;
    dispatch({
      type: IMAGE_MOUNTED,
      payload: images,
    });
  };
};

const a = new Array();
 export const showImages = (folderName, name) => {
   return async (dispatch) => {
     const len = await firebase.storage().ref(`${folderName}`).listAll();
     const length = len.items.length;
     const imageURL = await firebase.storage().ref(`${folderName}`).child(`${name}`).getDownloadURL()
     .then((url) => {
         a.push(url);
         if (a.length === length) {
           dispatch({
             type: URI_GENERATED,
             uri: a
           });
           Actions.images();
         }
         //arrayDefination(dispatch, url, length, ...a);
      })
      .catch((err) => {
        console.log(`Error occured...${err}`);
      });
      //console.log(imageURL);
};
 };

 export const showImage = (url) => {
   return (dispatch) => {
     dispatch({
      type: IMAGE_SELECTED,
      payload: url
   });
   Actions.uploadedImage();
 };
};
