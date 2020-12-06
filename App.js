import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import * as sms from "expo-sms";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerNavigator } from "./Navigation/AppNavigator";
import Color from "./Constants/Color";
import { applyMiddleware, combineReducers, createStore } from "redux";
import person from "./store/reducer/person";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { init } from "./Helpers/db";
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true
    }
  }
})

const res = init()

export default function App() {
  const Reducer = combineReducers({
    persons: person,
  });




  const store = createStore(Reducer, applyMiddleware(ReduxThunk));
  useEffect(() => {
    const per = async () => {
      const permission = await Permissions.getAsync('notifications')
      if (permission.status !== 'granted') {
        const nPer = await Permissions.askAsync('notifications')
        if (nPer !== 'granted') {
          Alert.alert("Permissions Not Given!", "You won't be able to use these apps without these permissions", [{ text: "okay", style: "destructive" }])
        }
      }
    }
    per()
  })

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
        <StatusBar style="light" backgroundColor={Color.secondary} />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
