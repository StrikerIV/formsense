import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';



const Stack = createNativeStackNavigator();
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
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Log In" component={SignInScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
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
