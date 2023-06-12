import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { shareAsync } from 'expo-sharing';
import { SafeAreaView } from 'react-native-safe-area-context';

const CameraScreen = () => {
  let cameraRef = useRef();

  const [mediaPermission, setMediaPermission] = useState();
  const [cameraPermission, setCameraPermission] = useState();
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const iscameraPermission = await Camera.requestCameraPermissionsAsync();
      const ismediaPermission = await MediaLibrary.requestPermissionsAsync();
      setCameraPermission(iscameraPermission.status === 'granted');
      setMediaPermission(ismediaPermission.status === 'granted');
    })();
  }, []);

  const swap = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  if (cameraPermission === undefined) {
    return <Text>Request permission....</Text>;
  } else if (!cameraPermission) {
    return <Text>Permission not granted</Text>;
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        base64: true,
        exif: false,
      };

      const newPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(newPhoto);
    }
  };

  if (photo) {
    const sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };
    const savePic = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: 'data:image/jpg;base64,' + photo.base64 }}
        />
        <Button title='Share' onPress={sharePic} />
        {mediaPermission ? <Button title='Save' onPress={savePic} /> : undefined}
        <Button title='Cancel' onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <Ionicons
          name='md-camera-reverse-outline'
          size={40}
          color='white'
          style={{ alignSelf: 'flex-end', margin: 10 }}
          onPress={swap}
        />
        <View style={styles.buttonContainer}>
          <MaterialIcons
            style={styles.icon}
            name='camera'
            size={60}
            color='white'
            onPress={takePhoto}
          />
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    height: '100%',
    width: '100%',
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
  },
});

export default CameraScreen;
