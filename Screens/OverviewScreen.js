import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Color from "../Constants/Color";
import CustomHeaderButton from "../Components/CustomHeaderButton";
import { useDispatch, useSelector } from "react-redux";
import { deletePerson, fetchData, updateIdentifier } from "../store/action/person";
import * as Notifications from 'expo-notifications'
import * as SMS from 'expo-sms'
import CustomButton from "../Components/CustomButton";

// Notifications.scheduleNotificationAsync({
//   content: {
//       title: `It's his Birthday`,
//       vibrate: true,
//       color: "red",
//       body: `Click here and be the first one to wish him`,
//       data: { number: '+919137305399', message: 'Happy Birthday!', name: "hjds", date: 23, month: 11, y: 2020}
//   },
//   trigger: {
//     seconds: 5
//   }
// })

export var additional = {

}


const OverviewScreen = (props) => {
  const persons = useSelector(state => state.persons.person)
  const bColor = useSelector(state => state.persons.backgroundColor)
  
  const [down, setDown] = useState(false)
  
  additional = bColor
  
  const dispatch = useDispatch()

  useEffect(() => {
    props.navigation.setParams({
      setDown: setDown
    })
  }, [setDown])
  
  useEffect(() => {
    dispatch(fetchData())
  }, [])
  
  useEffect(() => {
    Notifications.addNotificationReceivedListener((data) => {
      console.log(data.request.content.data);
      var { name, number, message, date, month, y } = data.request.content.data

      const noti = async () => {
        const identifier = await Notifications.scheduleNotificationAsync({
            content: {
                title: `It's ${name}'s Birthday`,
                vibrate: true,
                color: Color.primary,
                body: `Click here and be the first one to wish ${name}`,
                data: { name, number, message, date, month, y: y+1 }
            },
            trigger: {
                seconds: Math.floor(Math.abs(new Date(`${date}/${month}/${y}`).getTime() - new Date().getTime()) / 1000)
            }
        })
        console.log(a);
        updateIdentifier(name, number, identifier)
      }
      noti()
    })

    Notifications.addNotificationResponseReceivedListener((data) => {
      // console.log(data);
      const smsFunc = async () => {
        const able = await SMS.isAvailableAsync()
        if (able) {
          await SMS.sendSMSAsync(data.notification.request.content.data.number, data.notification.request.content.data.message)
        }
      }
      smsFunc()
    })
  }, [])

  const deleteHandler = (number, identifier) => {
    dispatch(deletePerson(number, identifier))
  }


  var Effect = TouchableNativeFeedback;
  if (Platform.OS === "ios") {
    Effect = TouchableOpacity;
  }
  var i = 0
  return (
    <View style={{ ...styles.screen, backgroundColor: bColor }}>
      <FlatList
        data={persons}
        keyExtractor={(data) => data.number}
        renderItem={(data) => (
          <View>
          <Effect
            onPress={() => {
              props.navigation.navigate("Details", {
                number: data.item.number,
                name: data.item.name,
              });
            }}
            style={styles.eff}
          >
            <View style={{ ...styles.con, backgroundColor: Color.color[i % 5] }}>
              {/* {Color.color[i++]} */}
              <Text> {++i ? null : null} </Text>
              <View style={styles.con1}>
                <Image
                  source={{
                    uri: data.item.image,
                  }}
                  style={styles.image}
                />
              </View>
              <View style={styles.con2}>
                <Text style={styles.header} >{data.item.name}</Text>
                <Text style={styles.date} >{data.item.date}</Text>
                <Text style={styles.des} >{data.item.message}</Text>
              </View>
            </View>
          </Effect>
          { down ? 
          <View>
            <CustomButton color={bColor} deleteHandler={() => deleteHandler(data.item.number, data.item.identifier)} />
          </View>
          : 
          null
          }
        </View>
        )}
      />
    </View>
  );
};

export const overviewScreenOptions = (navData) => {
  const bColor = useSelector(state => state.persons.backgroundColor)
  const setDown = navData.route.params !== undefined ? navData.route.params.setDown : null 

  return {
    headerTitle: "My Wisher",
    headerTintColor: bColor,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item 
      iconName={Platform.OS === 'android' ? "md-options" : "ios-options"} 
      title="Down"
      iconSize={22}
      onPress={() => {setDown((prev) => !prev)}} 
      color={bColor}
      />

      <Item
        title="ADD"
        iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
        onPress={() => navData.navigation.navigate("Edit")}
        iconSize={23}
        color={bColor}
      />
    </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="MENU"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
          iconSize={23}
          color={bColor}
        />
      </HeaderButtons>
    ),
  };
};


export default OverviewScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  con: {
    flexDirection: "row",
    marginBottom: 10,
    borderBottomRightRadius: 50,
  },
  con1: {
    padding: 10,
  },
  con2: {
    justifyContent: "center",
    width: '60%'
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  eff: {
    borderBottomRightRadius: 50,
    overflow: "hidden",
  },
  header: {
    fontSize: 19,
    marginBottom: 2
  },
  drop: {
    marginTop: 0,
    paddingTop:0,
    marginBottom: 5
  }

});
