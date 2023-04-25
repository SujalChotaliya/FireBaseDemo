import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import database from '@react-native-firebase/database';

const Create = () => {
  const [task, setTask] = useState();
  const [data, setData] = useState();
  const [isUpdateData, setisUpdateData] = useState(false);
  const [id, setID] = useState();
  const [index, setIndex] = useState();
  // const [name, setname] = useState();
  // const [number, setnumber] = useState();
  // const [email, setemail] = useState();
  // const [password, setpassword] = useState();

  const getData = async () => {
    try {
      const usersCollection = await database()
        .ref('toDo')
        .on('value', tempData => {
          setData(tempData.val());
          console.log(tempData);
        });
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
      const index1 = data ? data.length : 1;
      const responce = await database()
        .ref(`toDo/${index1}`)
        .set({
          id: Math.floor(Math.random() * (999999999 - 111111111)) + 111111111,
          task: task,
        });

      setTask('');
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
  const handleUpdateData = async () => {
    try {
      const responce = await database()
        .ref(`toDo/${index}`)
        .update({id: id, task: task});
      setisUpdateData(false);
      setTask('');
    } catch (error) {
      console.log(error);
    }
  };

  const itemClick = (data, index) => {
    setTask(data.task);
    setID(data.id);
    setisUpdateData(true);
    setIndex(index);
  };

  const onDelete = async index => {
    try {
      await database().ref(`toDo/${index}`).remove();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* -------------- TO DO App --------------- */}

      <TextInput
        placeholder="Enter Task"
        placeholderTextColor="black"
        style={styles.tectin}
        value={task}
        onChangeText={text => setTask(text)}
      />

      {!isUpdateData ? (
        <Button title="Add Task" onPress={() => handleClick()} />
      ) : (
        <Button title="Update Task" onPress={() => handleUpdateData()} />
      )}

      <View style={{width: '100%'}}>
        <FlatList
          bounces={false}
          data={data}
          style={{width: '100%'}}
          renderItem={({item, index}) => {
            if (item != null) {
              return (
                <TouchableOpacity
                  style={styles.view}
                  onPress={() => itemClick(item, index)}>
                  <Text style={styles.text}>
                    Task :- {item !== null ? item.task : 'Loading.....'}
                  </Text>
                  <TouchableOpacity
                    style={{position: 'absolute', right: 10}}
                    onPress={() => onDelete(index)}>
                    <Text style={{color: 'red', fontSize: 20}}>D</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
