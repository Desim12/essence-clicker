import React, {useState} from 'react';
import { View, Text, StyleSheet, Button, Pressable, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import upgrades from './Upgrades';
var assistantsUnlocked = false;
var HPUnlocked = false;
var clickStrength = 1;

function processClick(essenceText){
  updateShop(essenceText);
  if (essenceText >= 100){
    assistantsUnlocked = true;
  }
  if (essenceText >= 150) {HPUnlocked = true;}
}

function updateShop(essenceText){
  upgrades.map((upgrade) =>{
    if (upgrade.purchased == false && upgrade.available == false &&  upgrade.cost <= essenceText){
      upgrade.available = true;
    }
  });
}

function purchaseUpgrade(upgrade, essenceText, setEssenceText){
  if (essenceText >= upgrade.cost){
    if (upgrade.result == 'Active'){
      clickStrength += upgrade.strength;
    }
    upgrade.available = false;
    upgrade.purchased = true;
    setEssenceText(essenceText - upgrade.cost);
  }


}

function bar() {
  var [essenceText, setEssenceText] = useState(0);
  const [assistantsText, setAssistantsText] = useState('0');
  const [HPText, setHPText] = useState('50/50');
  const [shopModal, setShopModal] = useState(false);

  

  const shopList = upgrades.map((upgrade) => {
    if (upgrade.available){
    return <Button title={upgrade.key +'    '+ upgrade.cost + '\n' + upgrade.description} onPress={() => purchaseUpgrade(upgrade, essenceText, setEssenceText)}/>
  }
  })
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>

          {/* Essence Counter */}
          <View style={styles.essenceCounter}>
            <Text style={styles.text}>Essence</Text>
            <Text style={styles.text}>{essenceText}</Text>
          </View>

          {/* Assistants Counter */}
          <View style={styles.assistantsCounter}>
            <Text style={styles.text}>{assistantsUnlocked === true ? 'Assistants' : '???'}</Text>
            <Text style={styles.text}>{assistantsUnlocked === true ? assistantsText : '(Locked)'}</Text>
          </View>

          {/* HP Counter */}
          <View style={styles.HPCounter}>
            <Text style={styles.text}>{HPUnlocked === true ? 'HP' : '???'}</Text>
            <Text style={styles.text}>{HPUnlocked === true ? HPText : '(Locked)'}</Text>
          </View>
        </View>



          {/* Clicker Button */}
      <View style={styles.essenceButtonContainer}>
         <Pressable style={styles.essenceButton}         
           onPress={() => {
            setEssenceText(essenceText += clickStrength);
            setEssenceText(essenceText);
            processClick(essenceText, shopList);
           }}
           ><Text style = {styles.buttonText}>Increase Essence</Text></Pressable>
        <View style={styles.shopButtonContainer}><Modal
          animationType={'fade'}
          visible = {shopModal}  
          onRequestClose={() => {
          console.log("Shop Modal has been closed.")
          setShopModal(!shopModal);
          }}>
            <View style={styles.modal}>
              {shopList}
              <Button title='Close Shop'
                  onPress={() => setShopModal(!shopModal)}/>
            </View>
          </Modal>
          <Pressable
        style={[styles.shopButton, styles.shopOpen]}
        onPress={() => setShopModal(true)}
      >
        <Text style={styles.buttonText}>Shop</Text>
      </Pressable></View>
          
     </View>
      </View>

 
      
    );
  }
  
  const Stack = createNativeStackNavigator();

  function ClickTab() {
    var essence = 0;
    return (
        <Stack.Navigator  screenOptions={{header: () => null}}>
          <Stack.Screen name="Click Tab" component={bar}/>

        </Stack.Navigator>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex:1,
      borderWidth: 5,
      borderColor: '#2a6475',
      borderTopWidth: 20,
    },
    essenceButtonContainer: {
      flex: 7,
      backgroundColor: '#2a6475',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      
    },
    text: {
      fontSize: 20,
      color: 'black',
      alignItems: 'center',
      textAlignVertical: 'top',
      fontWeight: 'bold',
    },
    counterText: {
      fontSize: 35,
      fontWeight: 'bold',
      alignItems: 'center',
      
    },
    topBar: {
      flex: 1,
      backgroundColor: '#568ee8',
      textAlignVertical: 'top',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',

    },
    essenceButton: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      borderWidth: 5,
      backgroundColor: "blue",
      borderRadius: 5,
      borderColor: "blue",
      padding: 10,

    },
    shopButtonContainer: {
      borderWidth: 5,
      borderRadius: 5,
      borderColor: "blue",
      backgroundColor: 'blue',
      padding: 10,
    },
    buttonText: {
      color: 'white',
    },
    modal: {
      width: 300,
      height: 400,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  
  export default ClickTab;