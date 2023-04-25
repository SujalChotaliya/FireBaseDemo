import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const {navigate} = useNavigation();
  auth().onAuthStateChanged(user => {
    console.log(user);
    user == null ? navigate('LoginScreen') : null;
  });
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title="LogOut" onPress={async () => await auth().signOut()} />
    </View>
  );
};
0;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
