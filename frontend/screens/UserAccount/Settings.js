import { View, Text, TextInput, TouchableOpacity,Image, Pressable} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../../assets/images/logo1.png'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Settings = ({navigation}) => {
    const onSignOutPress = async() =>{
        await AsyncStorage.removeItem('jwtToken');
        navigation.navigate('Log In')
    }
  return (
    <View style={{backgroundColor:'rgb(1,4,7)',flex:1}}>
        <SafeAreaView style={{flex:1, paddingHorizontal:25, position:'relative'}}>
            {/**Email Input*/}
            <View style={{flexDirection:'row', alignItems:'center', marginBottom:20}}>
                <Pressable onPress={()=>{navigation.navigate('Profile')}} style={{marginRight:10}}>
                    <Feather name="arrow-left" size={24} color="rgb(126,202,242)" />
                </Pressable>
                <Text style={{color:'white', fontFamily:'LexendDeca-Bold', fontSize:27}}>Settings</Text>
            </View>

            <View style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:13, flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Feather style={{marginRight:10}} name="user" size={20} color="rgb(126,202,242)" />
                    <Text
                        style={{color:'rgb(126,202,242)', fontSize:18, marginBottom:5, fontFamily:'LexendDeca-Regular'}}
                        placeholderTextColor={'white'}>Account</Text>
                </View>
                <AntDesign name="right" size={24} color="rgb(126,202,242)" />
            </View>
            <View style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:13, flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <AntDesign style={{marginRight:10}} name="notification" size={20} color="rgb(126,202,242)" />
                    <Text
                        style={{color:'rgb(126,202,242)', fontSize:18, marginBottom:5, fontFamily:'LexendDeca-Regular'}}
                        placeholderTextColor={'white'}>Notifications</Text>
                </View>
                <AntDesign name="right" size={24} color="rgb(126,202,242)" />
            </View>
            <View style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:13, flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Entypo style={{marginRight:10}} name="bug" size={20} color="rgb(126,202,242)" />
                    <Text
                        style={{color:'rgb(126,202,242)', fontSize:18, marginBottom:5, fontFamily:'LexendDeca-Regular'}}
                        placeholderTextColor={'white'}>Report a bug</Text>
                </View>
                <AntDesign name="right" size={24} color="rgb(126,202,242)" />
            </View>
            <View style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:13, flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:40}}>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <FontAwesome style={{marginRight:10}} name="location-arrow" size={20} color="rgb(126,202,242)" />
                    <Text
                        style={{color:'rgb(126,202,242)', fontSize:18, marginBottom:5, fontFamily:'LexendDeca-Regular'}}
                        placeholderTextColor={'white'}>Send Feedback</Text>
                </View>
                <AntDesign name="right" size={24} color="rgb(126,202,242)" />
            </View>
            <Pressable onPress={onSignOutPress}>
            <View style={{borderWidth:1,backgroundColor:'rgba(237,41,57,0.08)', borderColor:'#ED2939',borderRadius:10,paddingHorizontal:15,paddingVertical:13, flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <MaterialIcons style={{marginRight:10}} name="logout" size={20} color="#ED2939" />
                    <Text
                        style={{color:'#ED2939', fontSize:18, marginBottom:5, fontFamily:'LexendDeca-Regular'}}
                        placeholderTextColor={'white'}>Log Out</Text>
                </View>
                <AntDesign name="right" size={24} color="#ED2939" />
            </View>
            </Pressable>
            
              
        </SafeAreaView>
    
    </View>
  )
}

export default Settings