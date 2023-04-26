import {StackActions, useNavigation} from '@react-navigation/native';
import React, {Component, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

const Splash = () => {
  const {navigate} = useNavigation();
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(async () => {
      const unSubscribe = await auth().onAuthStateChanged(user => {
        const routeName = user == null ? 'LoginScreen' : 'Home';
        // navigate(routeName);
        unSubscribe();
        navigation.dispatch(StackActions.replace(routeName));
      });
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <Text>Splash</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default Splash;
