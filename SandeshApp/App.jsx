import React from "react";
import { SafeAreaView, Text,View } from "react-native";
import tw from "twrnc";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/pages/Home";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();
const App = () => {
	return (
		<>
			<StatusBar hidden={true} />
			<NavigationContainer>
				<SafeAreaView style={tw`flex-1`}>
					<Stack.Navigator initialRouteName="Home">
						<Stack.Screen
							name="Home"
							component={Home}
							options={{
								headerShown: false,
							}}
						/>


            {/* for demo change the below ones */}
						<Stack.Screen
              name="CreateCard"
              component={() => (
                <View style={tw`flex-1 bg-amber-100`}>
                  <Text style={tw`text-amber-800 text-center mt-10`}>
                    Create Card
                  </Text>
                </View>
              )}
            />
            <Stack.Screen
              name="Templates"
              component={() => (
                <View style={tw`flex-1 bg-amber-100`}>
                  <Text style={tw`text-amber-800 text-center mt-10`}>
                    Templates
                  </Text>
                </View>
              )}
            />
					</Stack.Navigator>
				</SafeAreaView>
			</NavigationContainer>
		</>
	);
};

export default App;
