

import { Button, StyleSheet, Text, View } from 'react-native';
import ClickTab from './ClickTab';
import BattleTab from './BattleTab';
import StatsTab from './StatsTab';
import { NavigationContainer } from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={{header: () => null}}>
        <Tab.Screen
          name="Click"
          component={ClickTab}/>
        <Tab.Screen
          name="Battle"
          component={BattleTab}/>
        <Tab.Screen
          name="Stats"
          component={StatsTab}/>
      </Tab.Navigator>
    </NavigationContainer>
    // Top part has 3 read-only tabs showing assistants, essence, and hp
    //assistants and hp tab should be hidden until unlocked
    // middle part has the shop button (when unlocked) and the click button
    // Bottom part has 3 buttons that take you to the clicking tab, battle tab, and stats page
    
    // Clicking Tab:
      // Screen inside of tab
      // 

  );
}


