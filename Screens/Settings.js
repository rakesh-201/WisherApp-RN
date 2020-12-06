import React, { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import CustomHeaderButton from "../Components/CustomHeaderButton";
import Color from "../Constants/Color";
import { toggleColor } from "../store/action/person";

const Settings = () => {
  const color = useSelector(state => state.persons.backgroundColor)

  const [dark, setDark] = useState(color === 'white' ? false : true )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(toggleColor(dark ? '#524e4b' : 'white'))
  }, [dark])

  return (
    <View style={{...styles.screen, backgroundColor: dark?'#524e4b':'white'}}>
      <View style={styles.c}>
      <View style={styles.con}>
      <Text style={{ color: !dark?'black':'white' }} >Use dark background</Text>
      <Switch onValueChange={() => {
        setDark((d) => !d)
      }}
      value={dark}
      style={styles.switch}
      trackColor={{true: Color.primary, false: 'grey'}}
      thumbColor={Color.secondary}
      />
      </View>
      </View>
    </View>
  );
};

export const settingScreenOptions = (navData) => {
  const bColor = useSelector(state => state.persons.backgroundColor)

  return {
    headerTitle: "Settings",
    headerTintColor: bColor,
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

export default Settings;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  c: {
    margin: 40,

  },
  con: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:10,
    borderRadius: 10,
  }

});
