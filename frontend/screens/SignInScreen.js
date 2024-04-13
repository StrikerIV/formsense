import { View, Text, TextInput, TouchableOpacity,Image, Pressable} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../assets/images/logo1.png'

const SignInScreen = ({navigation}) => {
  return (
    <View style={{backgroundColor:'rgb(1,4,7)',flex:1}}>
        <SafeAreaView style={{flex:1, paddingHorizontal:25, justifyContent:'space-between'}}>
            {/**Company Logo */}
            <View style={{width:'100%'}}>
                <View style={{width:'100%', aspectRatio:1, justifyContent:'center', alignItems:'center'}}>
                    <Image source={Logo}  style={{width:'130%', height:'130%'}} />
                </View>
                <Text style={{color:'white', textAlign:'center', fontFamily:'LexendDeca-Bold', fontSize:20}}>LOGIN</Text>
                {/**Email Input*/}
                <View style={{width:'100%', marginBottom:10}}>
                    <Text style={{color:'white', marginBottom:8,marginLeft:5, fontFamily:'LexendDeca-Bold', fontSize:16}}>Email</Text>
                    <View style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:13}}>
                        <TextInput
                            style={{color:'rgb(126,202,242)', fontSize:16}}
                            placeholder="Email"
                            placeholderTextColor={'white'}/>
                    </View>
                </View>
                {/**Password Input*/}
                <View style={{width:'100%', marginBottom:10}}>
                    <Text style={{color:'white', marginBottom:8,marginLeft:5, fontFamily:'LexendDeca-Bold', fontSize:16}}>Password</Text>
                    <View style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:13}}>
                        <TextInput
                            style={{color:'rgb(126,202,242)', fontSize:16}}
                            placeholder="Password"
                            placeholderTextColor={'white'}
                            secureTextEntry/>
                    </View>
                </View>
                <Pressable style={{marginBottom:30}}><Text style={{color:'white', textAlign:'right', fontFamily:'LexendDeca-Regular'}}>Forgot Password?</Text></Pressable>
                
                {/**Submit Button*/}
                <TouchableOpacity
                onPress={()=>{navigation.navigate('In App')}}style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:15, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{color:'white', fontFamily:'LexendDeca-Regular'}}>Log In</Text>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection:'row', justifyContent:'center'}}>
                <Text style={{color:'white', fontFamily:'LexendDeca-Regular', fontSize:16}}>Dont have an account? </Text>
                <Pressable onPress={()=>{navigation.navigate('Sign Up')}}><Text style={{color:'rgb(126,202,242)', fontFamily:'LexendDeca-Regular', fontSize:16}}>Sign Up Now</Text></Pressable>
            </View>
            
        </SafeAreaView>
    
    </View>
  )
}

export default SignInScreen