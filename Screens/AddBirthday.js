import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Switch,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Button,
  Image,
  ImageBackground,
  Platform,
} from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
import Input from "../Components/Input";
import Color from "../Constants/Color";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { addBirthday } from "../store/action/person";
import CustomHeaderButton from '../Components/CustomHeaderButton'
import { additional } from './OverviewScreen'

const AddBirthday = (props) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("91");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState();
  const [month, setMonth] = useState();
  const defaultImage =
    "https://i.pinimg.com/originals/ab/67/53/ab6753ec1cef75f1cc2052487b1f4059.jpg";
  const [image, setImage] = useState(defaultImage);
  const bColor = useSelector(state => state.persons.backgroundColor)
  console.log(props);
  const dispatch = useDispatch()

  useEffect(() => {
    const d = parseInt(date);
    const m = parseInt(month);
    if (d === 0 || d > 31 || m === 0 || m > 12) {
      Alert.alert(
        "Invalid Input",
        "You know you haven't entered correct birthday date",
        [
          {
            text: "okay",
            style: "destructive",
            onPress: () => {
              setDate(null);
              setMonth(null);
            },
          },
        ]
      );
    }
  }, [date, month]);

  const askPermissions = async () => {
    const status = await Permissions.askAsync("camera", "cameraRoll");
    return status;
  };

  const imageHandler = async () => {
    const per = await Permissions.getAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (!per.granted) {
      const status = await askPermissions(Permissions.CAMERA, Permissions.CAMERA_ROLL);
      if (!status.granted) {
        Alert.alert(
          "Permission Not Granted",
          "You won't be able to use this app effectively without those permissions",
          [{ text: "okay", style: "destructive" }]
        );
        return;
      }
    }
    const imageData = await ImagePicker.launchImageLibraryAsync();
    setImage(imageData.uri);
  };

  const confirmHandler = useCallback(() => {
    if (name !== "" && number !== "" && date !== "" && date && message !== "" && month !== "" && month && image !== "" && image) {
      dispatch(addBirthday(name, '+' + number, date, month, message, image))
      props.navigation.goBack()
    }
    else {
      Alert.alert("Required Fields Not Filled", "Some required fields are not filled", [{text: 'okay', style: 'destructive'}])
    }
  }, [name, number, date, message, month, image])

  useEffect(() => {
    props.navigation.setParams({ confirmHandler: confirmHandler })
  }, [confirmHandler])

  return (
    <View style={{ ...styles.screen, backgroundColor: bColor }}>
      <ScrollView>
        <View style={styles.card}>
          <Input
            title="Name"
            entered={name}
            setEntered={(value) => setName(value)}
          />
          {/* <Switch  /> */}
          <Input
            title="Number"
            entered={number}
            specialMessage="Write the complete phone number (including international calling code)"
            setEntered={(value) => setNumber(value.replace(/[^0-9]/g, ""))}
            keyboardType="number-pad"
            symbol="+"
          />
          <Input
            title="Message"
            entered={message}
            setEntered={(value) => setMessage(value)}
          />
          <Text style={styles.text}>Date of Birthday</Text>
          <View style={styles.inputCon}>
            <TextInput
              style={{ ...styles.input, paddingLeft: 20 }}
              maxLength={2}
              placeholder="Date(DD)"
              keyboardType="number-pad"
              value={date}
              onChangeText={(date) => {
                setDate(date.replace(/[^0-9]/g, ""));
              }}
            />
            <TextInput
              style={styles.input}
              maxLength={2}
              placeholder="Month(MM)"
              keyboardType="number-pad"
              value={month}
              onChangeText={(month) => {
                setMonth(month.replace(/[^0-9]/g, ""));
              }}
            />
          </View>
        </View>
        <View
          style={{
            ...styles.card,
            height: 350,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageBackground source={{ uri: image }} style={styles.backImg}>
            <View style={styles.button}>
              <Button
                title="Choose Image"
                color={Color.primary}
                onPress={imageHandler}
              />
            </View>
            {image === defaultImage ? null : (
              <View style={styles.button}>
                <Button
                  title="Set Default"
                  color={Color.primary}
                  onPress={() => {
                    setImage(defaultImage);
                  }}
                />
              </View>
            )}
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
};

export const addScreenOptions = (navData) => {
  // const bColor = useSelector(state => state.persons.backgroundColor)

  return {
    headerTitle: "Add a new Event",
    headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
      <Item title="confirm"
        iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
        iconSize={23}
        onPress={() => { navData.route.params.confirmHandler() }}
        color={additional}
      />
    </HeaderButtons>
  }
}

export default AddBirthday;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  card: {
    margin: 20,
    marginHorizontal: 30,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  inputCon: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
    alignItems: "center",
  },
  input: {
    borderColor: Color.primary,
    borderWidth: 2,
    width: 100,
    borderRadius: 10,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingLeft: 12,
  },
  text: {
    fontSize: 15,
    color: 'black'
  },
  backImg: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  button: {
    margin: 10,
  },
});
