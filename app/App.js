import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Modal,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { round } from 'react-native-reanimated';
import * as Svg from 'react-native-svg';
//import { TextInput } from 'react-native-gesture-handler';

import store from './store/store'
import { Provider } from 'react-redux'
import { itemAdded } from './components/ItemsSlice'

function HomeScreen({ navigation }) {

  const items = useSelector(state => state.items.itemsData)
  const content = items.map(item => (
    <TouchableOpacity style={styles.itemBox}>
      <View style={styles.boxstyle}>
        <View style={styles.titlebox}>
          <Text style={styles.titlestyle}>{item.item}</Text>
        </View>
      </View>
    </TouchableOpacity>
  ))

  return (
    <View style={{ alignItems: 'stretch', justifyContent: 'flex-start' }}>
      <Button color="#17cd17"
        title="Add New Item!"
        onPress={() => navigation.navigate('AddNewItem')}
      />
      <ScrollView contentContainerStyle={{ alignItems: 'stretch', justifyContent: 'flex-start' }}>
        {content}
      </ScrollView>
    </View>
  )
}

function AddItemScreen({ navigation }) {

  const [item, setItem] = useState('');
  const onItemChanged = (e) => setItem(e.target.value)
  const dispatch = useDispatch()

  const canSave = [item].every(Boolean)
  const onSaveItemClicked = () => {
    if (canSave) {
      dispatch(itemAdded({ item }))
      setItem('')
      navigation.navigate('Home')
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({   //to change header btn to manipulate the component on the screen
      headerRight: () => (
        <TouchableOpacity>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ padding: 7 }}>
        <TextInput
          style={styles.textInputs}
          placeholder="Item's Title"
          value={item}
          onChange={onItemChanged}
        />
      </View>
      <View style={{ flexDirection: "row"}}>
        <View style={{padding: 7}}>
          <Button
            title="Add"
            onPress={onSaveItemClicked}
          />
        </View>
        <View style={{padding: 7}}>
          <Button
            onPress={() => navigation.goBack()}
            title="Cancel"
          />
        </View>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{    //or use "Options" (commented section below) in each Stack.Screen
            headerStyle: {
              backgroundColor: '#f7fffe',
            },
            headerTintColor: '#181818',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            name="AddNewItem"
            component={AddItemScreen}
            options={{ title: 'Add New Item' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  Yrstyle: {
    fontSize: 10,
    color: '#2ab1a9',
    textAlign: 'center'
  },
  DayNumstyle: {
    fontSize: 30,
    fontWeight: 800,
    color: '#11a198',
    textAlign: 'center',
  },
  DayMonthstyle: {
    fontSize: 10,
    color: '#2ab1a9',
    textAlign: 'center'
  },
  DateItemView: {
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderColor: 'white',
    borderWidth: 2
  },
  timestyle: {
    fontSize: 20,
    color: '#717171'
  },
  titlebox: {
    padding: 7,
    color: '#913cb7',
    backgroundColor: '#913cb7',
    borderRadius: 5
  },
  titlestyle: {
    fontSize: 30,
    fontWeight: 650,
    color: 'white'
  },
  descstyle: {
    fontSize: 17,
    color: '#3a3a3a',
  },
  itemBox: {
    flex: 1,
    padding: 20,
    borderColor: '#dadada',
    borderWidth: 2
  },
  boxstyle: {
    padding: 5
  },
  menuItemList: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#9e9e9e'
  },
  textInputs: {
    borderBottomWidth: 2,
    borderBottomColor: '#9e9e9e'
  }
});
