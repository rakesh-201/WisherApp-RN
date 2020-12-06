import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Color from "../Constants/Color";

const Input = (props) => {
  return (
    <View style={styles.con}>
      <Text style={styles.text}>{props.title}</Text>
      {props.specialMessage ? (
        <Text style={styles.txt}> {props.specialMessage} </Text>
      ) : null}
      <View style={styles.con1}>
        <View style={styles.txtCon}>
          <Text>{props.symbol ? props.symbol : null}</Text>
        </View>
        <TextInput
          style={styles.input}
          value={props.entered}
          onChangeText={(input) => props.setEntered(input)}
          {...props}
        />
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  con: {
    marginVertical: 20,
  },
  text: {
    fontSize: 15,
  },
  input: {
    borderBottomColor: Color.primary,
    fontSize: 15,
    borderBottomWidth: 2,
    paddingHorizontal: 5,
    width: "100%",
  },
  txt: {
    fontSize: 10,
  },
  con1: {
    flex: 1,
    flexDirection: "row",
  },
  txtCon: {
    marginTop: 4,
  },
});
