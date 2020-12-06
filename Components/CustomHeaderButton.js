import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

const CustomHeaderButton = (props) => {
  return <HeaderButton IconComponent={Ionicons} {...props} />;
};

export default CustomHeaderButton;

const styles = StyleSheet.create({});
