import { StatusBar } from 'expo-status-bar';
import { Settings, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import Profile from './screens/UserAccount/Profile';
import Setting from './screens/UserAccount/Settings';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import Splash from './screens/Splash';
import Feed from './screens/UserAccount/Feed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import ServersScreen from './screens/UserAccount/ServersScreen'
import Channels from './screens/UserAccount/Channels';
import Create from './screens/UserAccount/Create';




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  const [fontsLoaded] = useFonts({
    'LexendDeca-Black': require('./assets/fonts/LexendDeca-Black.ttf'),
    'LexendDeca-Regular': require('./assets/fonts/LexendDeca-Regular.ttf'),
    'LexendDeca-Bold': require('./assets/fonts/LexendDeca-Bold.ttf'),
    'LexendDeca-ExtraBold': require('./assets/fonts/LexendDeca-ExtraBold.ttf'),
    'LexendDeca-ExtraLight': require('./assets/fonts/LexendDeca-ExtraLight.ttf'),
    'LexendDeca-Light': require('./assets/fonts/LexendDeca-Light.ttf'),
    'LexendDeca-Medium': require('./assets/fonts/LexendDeca-Medium.ttf'),
    'LexendDeca-SemiBold': require('./assets/fonts/LexendDeca-SemiBold.ttf'),
    'LexendDeca-Thin': require('./assets/fonts/LexendDeca-Thin.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  function MyTabs() {
    return (
      <Tab.Navigator
        screenOptions={{headerShown:false,tabBarActiveTintColor:'rgb(126,202,242)',tabBarInactiveTintColor:'rgba(126,202,242,0.5)',tabBarShowLabel:false}}
        >
        <Stack.Screen name="Servers" component={ServersScreen}
        options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? 'home' : 'home-outline'; // Change to home when focused
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })} />
          <Stack.Screen name="Create" component={Feed}
        options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? 'rgb(126,202,242)' : 'rgba(126,202,242,0.7)'; // Change to home when focused
            return <View style={{backgroundColor:iconName, width:100, height:100, borderRadius:100, alignItems:'center', justifyContent:'center'}}><Feather name='plus' size={size*1.2} color={'white'} /></View>;
          },
        })} />
        <Stack.Screen name="Profile" component={Profile}
        options={{
      tabBarIcon: ({ focused, color, size }) => {
        const iconName = focused ? 'person' : 'person-outline'; // Change to person when focused
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    }} />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer style={styles.container}  theme={{ colors: { background: 'rgba(1,1,1,0.9)' } }}>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown:false,backgroundColor:'black'}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Log In" component={SignInScreen} />
        <Stack.Screen
          name="In App"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Setting" component={Setting} options={{ headerBackVisible:false }} />
        <Stack.Screen name="Feed" component={Feed} options={{ headerBackVisible:false }} />
        <Stack.Screen name="Channels" component={Channels} options={{ headerBackVisible:false }} />
        <Stack.Screen name="Create" component={Create} options={{ headerBackVisible:false }} />

        

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
