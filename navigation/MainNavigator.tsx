import React from "react";
import { RootStackParamList } from "./type";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AllPlaces from "../screens/AllPlaces";
import AddPlace from "../screens/AddPlace";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/GlobalStyles";
import Map from "../screens/Map";
import PlaceDetails from "../screens/PlaceDetails";

const Stack = createNativeStackNavigator<RootStackParamList>();

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: GlobalStyles.colors.gray700,
          contentStyle: { backgroundColor: GlobalStyles.colors.gray700 },
        }}
      >
        <Stack.Screen
          name="AllPlaces"
          component={AllPlaces}
          options={({ navigation }) => ({
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="add"
                size={24}
                color={tintColor}
                onPress={() => navigation.navigate("AddPlace")}
              />
            ),
            title: "Your Favorite Places",
          })}
        />
        <Stack.Screen
          name="AddPlace"
          component={AddPlace}
          options={{
            title: "Add a new Place",
          }}
        />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="PlaceDetails" component={PlaceDetails} options={{
          title: "Loading.Place..."
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
