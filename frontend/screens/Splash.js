import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet,Animated } from 'react-native';
import Logo from '../assets/images/logo1.png'

const Splash = ({ navigation }) => {
    const zoomOutAnim = useRef(new Animated.Value(1)).current;
  
    useEffect(() => {
        const initializeApp = async () => {
          await new Promise(resolve => setTimeout(resolve, 2000));
    
          // Create a sequence of animations: zoom out and navigate
          Animated.sequence([
            Animated.timing(zoomOutAnim, {
              toValue: 0,
              duration: 500, // Adjust duration as needed
              useNativeDriver: true,
            }),
          ]).start(() => {
            navigation.navigate('Log In');
          });
        };
    
        initializeApp();
      }, [navigation, zoomOutAnim]);
  
    return (
      <View style={styles.container}>
        <View style={{width:'100%', aspectRatio:1}}>
            <Animated.Image
            source={Logo}
            style={[styles.logo, { transform: [{ scale: zoomOutAnim }] }]}
            />
        </View>

      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      width:'100%',
      height:'100%',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: 'black',

    },
    logo: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
  });
  
  export default Splash;
  
