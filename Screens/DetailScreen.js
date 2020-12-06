import React from "react";
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Color from "../Constants/Color";
import { deletePerson } from "../store/action/person";

const DetailScreen = (props) => {
  const bColor = useSelector(state => state.persons.backgroundColor)
  const number = props.route.params.number;
  const dispatch = useDispatch()
  const person = useSelector((state) =>
    state.persons.person.find((per) => per.number === number)
  );

  

  return (
    <View style={{...styles.screen, backgroundColor: bColor}}>
      <Image source={{ uri: person.image }} style={styles.image} />
      <View style={styles.txt}>
        <Text style={styles.textCon}>
          <Text style={styles.text}>Birthday date: </Text> {person.date}
        </Text>
        <Text style={styles.textCon}>
          <Text style={styles.text}>Number: </Text> {person.number}
        </Text>
        <Text style={styles.textCon}>
          <Text style={styles.text}>Message: </Text> {person.message}
        </Text>
      </View>
    </View>
  );
};

export const detailScreenOptions = (navData) => {
  const name = navData.route.params.name;
  // const bColor = useSelector(state => state.persons.backgroundColor)
  return {
    headerTitle: name,
  };
};

export default DetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  text: {
    fontSize: 20,
  },
  image: {
    height: Dimensions.get("window").height / 3,
    width: "100%",
    borderBottomRightRadius: Dimensions.get("window").height / 5,
  },
  txt: {
    alignItems: "center",
    marginTop: 20,
  },
  textCon: {
    margin: 10,
    fontSize: 15,
  },
  buttonCon: {
    marginVertical: 20,
    width: 150,
  },
});
