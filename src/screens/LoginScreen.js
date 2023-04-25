import {useNavigation} from '@react-navigation/native';
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {navigate} = useNavigation();

  const logInClick = async () => {
    try {
      const responce = await auth().signInWithEmailAndPassword(email, password);
      navigate('Home');
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        Alert.alert('This password is invalid!');
      }
      if (error.code === 'auth/user-not-found') {
        Alert.alert('This email is invalid!');
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

      <Button
        title="Login"
        onPress={() => {
          logInClick();
        }}
      />
      <Button
        title="Didn't have any account ?"
        onPress={() => navigate('SignUp')}
      />
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

export default LoginScreen;
