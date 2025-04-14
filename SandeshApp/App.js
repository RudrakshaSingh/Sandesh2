import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import tw from 'twrnc';

export default function App() {
  return (
    <SafeAreaView style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-lg text-blue-500`}>
        Welcome to Expo with Tailwind!
      </Text>
    </SafeAreaView>
  );
}
