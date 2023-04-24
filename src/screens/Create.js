import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import database from '@react-native-firebase/database';

const Create = () => {
  const [task, setTask] = useState();
  const [name, setname] = useState();
  const [number, setnumber] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const usersCollection = await database()
        .ref('toDo')
        .on('value', tempData => {
          setData(tempData.val());
        });
      //   console.log(usersCollection);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleClick = async () => {
    // -------------- TO DO App ---------------

    try {
      const index = data ? data.length : 1;
      console.log(data ? data : 1);
      const responce = await database()
        .ref(`toDo/${index}`)
        .set({
          id: Math.floor(Math.random() * (999999999 - 111111111)) + 111111111,
          task: task,
        });
    } catch (error) {
      console.log(error);
    }

    // ----------- validation ------------

    // try {
    //   const responce = await database()
    //     .ref('user/1')
    //     .set({name: name, number: number, email: email, password: password});
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <View style={styles.container}>
      {/* -------------- TO DO App --------------- */}

      <TextInput
        placeholder="Enter Task"
        placeholderTextColor="black"
        style={styles.tectin}
        value={task}
        onChangeText={text => setTask(text)}
      />

      <Button
        title="Add Task"
        onPress={() => {
          handleClick();
          getData();
        }}
      />
      <View style={{width: '100%'}}>
        <FlatList
          data={data}
          style={{width: '100%'}}
          renderItem={({item}) => {
            if (item != null) {
              return (
                <View style={styles.view}>
                  <Text style={styles.text}>
                    Task :- {item !== null ? item.task : 'Loading.....'}
                  </Text>
                </View>
              );
            }
          }}
        />
      </View>
      {/* ----------- validation ------------ */}
      {/* <TextInput
        placeholder="Enter Name"
        placeholderTextColor="black"
        style={styles.tectin}
        onChangeText={text => setname(text)}
      />
      <TextInput
        placeholder="Enter Number"
        placeholderTextColor="black"
        style={styles.tectin}
        onChangeText={text => setnumber(text)}
      />
      <TextInput
        placeholder="Enter Email"
        placeholderTextColor="black"
        style={styles.tectin}
        onChangeText={text => setemail(text)}
      />
      <TextInput
        placeholder="Enter Password"
        placeholderTextColor="black"
        style={styles.tectin}
        onChangeText={text => setpassword(text)}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tectin: {
    borderWidth: 1,
    width: '90%',
    height: 50,
    paddingLeft: 15,
    marginBottom: 20,
    borderRadius: 10,
  },
  view: {
    backgroundColor: 'lightgreen',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  text: {
    color: 'black',
    fontWeight: '800',
  },
});

export default Create;
