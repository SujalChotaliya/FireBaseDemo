import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
  useEffect(() => {
    getData();
  }, []);
  const [data, setData] = useState();
  const getData = async () => {
    try {
      const usersCollection = await firestore()
        .collection('TESTING')
        .doc('U865Oz9ImByIpgXbCeIW')
        .get();

      setData(usersCollection._data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Name : {data ? data.Name : 'Loading.......'}
      </Text>
      <Text style={styles.text}>
        Age : {data ? data.Age : 'Loading.......'}
      </Text>
      <Text style={styles.text}>
        Number : {data ? data.Number : 'Loading.......'}
      </Text>
      <Text style={styles.text}>
        Email : {data ? data.Email : 'Loading.......'}
      </Text>
      <Text style={styles.text}>
        Hobby : {data ? data.Hobby.map(item => ` , ${item}`) : 'Loading.......'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {fontWeight: '500', fontSize: 20, color: 'black'},
});

export default HomeScreen;
