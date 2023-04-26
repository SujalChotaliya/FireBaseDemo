import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const SignUpWithGoogle = () => {
  const [profileImage, setProfileImage] = useState();

  useEffect(() => {
    GoogleSignin.configure();
  }, []);
  const signUp = async () => {
    try {
      //   await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      console.log(userInfo, '------');
      const userInfo = await GoogleSignin.signIn();
      setProfileImage(userInfo.user.photo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => signUp()}
        style={{
          width: '60%',
          backgroundColor: 'lightblue',
          height: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>SignUpWithGoogle</Text>
      </TouchableOpacity>

      {profileImage == '' ? null : (
        <Image
          source={{uri: profileImage}}
          style={{height: 300, width: '90%', marginTop: 10, borderRadius: 20}}
        />
        // <Text>{}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignUpWithGoogle;
