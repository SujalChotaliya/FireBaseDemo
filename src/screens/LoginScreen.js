import {StackActions, useNavigation} from '@react-navigation/native';
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {navigate} = useNavigation();
  const navigation = useNavigation();

  const logInClick = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        const user = await auth().signInWithEmailAndPassword(email, password);
        if (user.user.emailVerified) {
        } else {
          Alert.alert('Please check link in your gmail!');
          await auth().currentUser.sendEmailVerification();
          await auth().signOut();
          navigation.dispatch(StackActions.replace('Home'));
        }
        console.log(user);

        navigation.dispatch(StackActions.replace('Home'));
      } else {
        Alert.alert('Please Enter All Data');
      }
      //
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
      <TouchableOpacity
        onPress={() => logInClick()}
        style={{backgroundColor: 'red'}}>
        <Text> Login</Text>
      </TouchableOpacity>
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
