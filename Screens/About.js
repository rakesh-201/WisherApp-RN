import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import CustomHeaderButton from "../Components/CustomHeaderButton";
import Color from "../Constants/Color";

const About = () => {
  const bColor = useSelector(state => state.persons.backgroundColor)

  return (
    <View style={{...styles.screen, backgroundColor: bColor }}>
      <View style={styles.screen2}>
      <View style={styles.card} >
        <Text style={styles.text} >The R-Company</Text>
      </View>
      <View>
      <Text style={{...styles.txt}}>This app is a product of The R-Company. It was established in 2019 by Mr. Rakesh B Rajpurohit. Our prime motive is to make web and mobile applications for the benefit of the people and the community. </Text>
      <Text style={{...styles.txt}}>This app is a kind of reminder + messaging app. One can set a reminder for some one's birthday in this app with a short message and this app will give him a notification when this reminder expires upon clicking on that reminder a SMS will be sent on the respective number with the respective message. </Text>
      <Text style={{...styles.txt}}>This app is made to improve relationship among people. </Text>
      </View>
      </View>
    </View>
  );
};

export const aboutScreenOptions = (navData) => {
  const bColor = useSelector(state => state.persons.backgroundColor)
  return {
    headerTitle: "About us",
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

export default About;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // backgroundColor: 'black'
  },
  screen2: {
    margin: 20,
    alignItems: 'center',

  },
  card: {
    padding: 20,
    elevation: 5,

  },
  text: {
    fontSize: 20,
    color: 'blue'
  },
  txt: {
    fontSize: 15, 
    color: '#00CFFD',
    marginVertical: 10
  }
});
