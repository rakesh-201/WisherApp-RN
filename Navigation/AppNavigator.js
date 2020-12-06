import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import About, { aboutScreenOptions } from "../Screens/About";
import AddBirthday, { addScreenOptions } from "../Screens/AddBirthday";
import DetailScreen, { detailScreenOptions } from "../Screens/DetailScreen";
import OverviewScreen, {
  overviewScreenOptions,
  additional,
} from "../Screens/OverviewScreen";
import Settings, { settingScreenOptions } from "../Screens/Settings";
import Color from "../Constants/Color";
import { useSelector } from "react-redux";

const stackNavigatorStyles = {
  headerStyle: {
    backgroundColor: Color.primary,
  },
};

const StackNavigation = createStackNavigator();

const StackNavigator = () => (
  <StackNavigation.Navigator screenOptions={() => {
    return { ...stackNavigatorStyles, headerTintColor: additional }
  }}>
    {console.log(additional)}
    {console.log({ ...stackNavigatorStyles, headerTintColor: additional })}
    <StackNavigation.Screen
      name="Main"
      component={OverviewScreen}
      options={overviewScreenOptions}
    />
    <StackNavigation.Screen
      name="Details"
      component={DetailScreen}
      options={detailScreenOptions}
    />
    <StackNavigation.Screen name="Edit" component={AddBirthday} options={addScreenOptions} />
  </StackNavigation.Navigator>
);

// const AboutStackNavigation = createStackNavigator();

// const AboutStackNavigator = () => (
//   <AboutStackNavigation.Navigator screenOptions={stackNavigatorStyles}>
//     <AboutStackNavigation.Screen name="About" component={About} options={aboutScreenOptions} />
//   </AboutStackNavigation.Navigator>
// );

const SettingStackNavigation = createStackNavigator();

const SettingStackNavigator = () => (
  <SettingStackNavigation.Navigator screenOptions={stackNavigatorStyles}>
    <SettingStackNavigation.Screen name="Settings" component={Settings} options={settingScreenOptions} />
  </SettingStackNavigation.Navigator>
);

const DrawerNavigation = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <DrawerNavigation.Navigator>
      <DrawerNavigation.Screen name="Main" component={StackNavigator} />
      {/* <DrawerNavigation.Screen name="About" component={AboutStackNavigator} /> */}
      <DrawerNavigation.Screen
        name="Settings"
        component={SettingStackNavigator}
      />
    </DrawerNavigation.Navigator>
  );
};

export default DrawerNavigator;
