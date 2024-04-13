import { View, Text, TextInput, TouchableOpacity,Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../assets/images/logo1.png'

const SignInScreen = () => {
  return (
    <View style={{backgroundColor:'rgb(1,4,7)',flex:1}}>
        <SafeAreaView style={{flex:1, paddingHorizontal:25}}>
            <View style={{width:'100%', aspectRatio:1, justifyContent:'center', alignItems:'center'}}>
                <Image source={Logo}  style={{width:'130%', height:'130%'}} />
            </View>
            
            {/**Email Input*/}
            <View style={{width:'100%', marginBottom:10}}>
                <Text style={{color:'white', marginBottom:5,marginLeft:5, fontFamily:'LexendDeca-Bold'}}>Email</Text>
                <View style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:10}}>
                    <TextInput
                        style={{color:'rgb(126,202,242)'}}
                        placeholder="Email"
                        placeholderTextColor={'white'}/>
                </View>
            </View>
            {/**Email Input*/}
            <View style={{width:'100%',marginBottom:20}}>
                <Text style={{color:'white', marginBottom:5,marginLeft:5}}>Password</Text>
                <View style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:10}}>
                    <TextInput
                        style={{color:'rgb(126,202,242)'}}
                        placeholder="Password"
                        placeholderTextColor={'white'}
                        secureTextEntry/>
                </View>
            </View>
            {/**Submit Button*/}
            <TouchableOpacity style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:10, alignItems:'center', justifyContent:'center'}}>
                <Text style={{color:'white'}}>Log In</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    
    </View>
  )
}

export default SignInScreen