import {BaseRouter, useNavigation} from '@react-navigation/native';
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

const SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {navigate} = useNavigation();
  const signInClick = async () => {
    try {
      const responce = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      await auth().currentUser.sendEmailVerification();
      await auth().signOut();
      navigate('LoginScreen');
      Alert.alert('Check Email inbox');
      // await navigate('LoginScreen');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      }

      if (error.code === 'auth/weak-password') {
        Alert.alert('The given password is invalid.');
      }

      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        style={styles.ti}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        style={styles.ti}
        onChangeText={text => setPassword(text)}
      />

      <Button title="SignIn" onPress={() => signInClick()} />
      <View style={{marginVertical: 5}} />
      <Button title="Login" onPress={() => navigate('LoginScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ti: {
    borderWidth: 1,
    width: '90%',
    height: 50,
    borderRadius: 10,
    paddingLeft: 10,
    marginVertical: 10,
  },
});
export default SignUp;

//jivos37368@jobbrett.com
