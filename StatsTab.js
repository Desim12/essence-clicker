import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function bar() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Stats tab.</Text>
      </View>
    );
  }
  
  const Stack = createNativeStackNavigator();
  
  function StatsTab() {
    return (
        <Stack.Navigator screenOptions={{header: () => null}}>
          <Stack.Screen name="Stats Tab" component={bar} />
        </Stack.Navigator>
    );
  }
  
  export default StatsTab;