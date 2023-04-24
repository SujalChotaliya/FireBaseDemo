import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {firebase} from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
const RealTimeDB = () => {
  const [data, setData] = useState();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const usersCollection = await database().ref('toDo/1').once('value');
      console.log(usersCollection);
      setData(usersCollection.val());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text>Name: {data ? data.name : 'Loading.....'}</Text>
      <Text>Age: {data ? data.age : 'Loading.....'}</Text> */}
      <Text>id: {data ? data.id : 'Loading.....'}</Text>
      <Text>task: {data ? data.task : 'Loading.....'}</Text>
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

export default RealTimeDB;
