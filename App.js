import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, FlatList, Alert, BackHandler, ToastAndroid, StatusBar } from 'react-native';
import GoalItem from './mycomponents/GoalItem';
import GoalInput from './mycomponents/GoalInput'
export default function App() {

  const [cousegoal, setcousegoal] = useState([]);
  const [isaddmode, setisaddmode] = useState(false);

  const addgoalhandler = (goaltitle) => {
    if (goaltitle.trim() != 0) {
      console.log(goaltitle);
      setcousegoal(currentgoals =>
        [...cousegoal,
        { key: Math.random().toString(), value: goaltitle }]);
      showToast();
    }
    else Alert.alert('please enter something to add :)')
  }
  const removegoal = goalid => {
    setcousegoal(currentgoals => {
      return currentgoals.filter((goal) => goal.key != goalid)
    });
  }

  const showToast = () => {
    ToastAndroid.show("A New Goal is Added!", ToastAndroid.SHORT);
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        {
          text: "YES", onPress: () => BackHandler.exitApp()
        }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.screen}>
      <Button title="ADD NEW GOAL" onPress={() => setisaddmode(true)} />
      <GoalInput visible={isaddmode} offvisible={() => setisaddmode(false)} onaddgoal={addgoalhandler} />
      <FlatList
        keyExtractor={(item, index) => item.key}
        data={cousegoal}
        renderItem={itemdata =>
          <GoalItem ondelete={removegoal}
            title={itemdata.item.value}
            id={itemdata.item.key} />}
      />
      <StatusBar
        barStyle="dark-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor="#00BCD4"
        //Background color of statusBar
        translucent={false}
        //allowing light, but not detailed shapes
        networkActivityIndicatorVisible={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
