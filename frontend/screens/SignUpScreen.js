import { View, Text,SafeAreaView,TextInput,TouchableOpacity,Pressable } from 'react-native'
import React from 'react'

const SignUpScreen = ({navigation}) => {
  return (
    <View style={{backgroundColor:'rgb(1,4,7)',flex:1}}>
    <SafeAreaView style={{flex:1, paddingHorizontal:25, justifyContent:'space-between'}}>

        <View style={{paddingHorizontal:25}}>
        <View style={{alignItems:'center', marginBottom:20}}>
            <Text style={{fontFamily:'LexendDeca-Bold', color:'white', fontSize:28}}>Create an Account</Text>
            <Text style={{fontFamily:'LexendDeca-Regular', color:'white', fontSize:25}}>to get started now!</Text>
        </View>
        {/**Full Name Input*/}
        <View style={{width:'100%', marginBottom:10}}>
            <Text style={{color:'white', marginBottom:8,marginLeft:5, fontFamily:'LexendDeca-Bold', fontSize:16}}>Full Name</Text>
            <View style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:13}}>
                <TextInput
                    style={{color:'rgb(126,202,242)', fontSize:16}}
                    placeholder="Full Name"
                    placeholderTextColor={'white'}/>
            </View>
        </View>
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
        {/**Retype Password Input*/}
        <View style={{width:'100%', marginBottom:40}}>
            <Text style={{color:'white', marginBottom:8,marginLeft:5, fontFamily:'LexendDeca-Bold', fontSize:16}}>Retype Password</Text>
            <View style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:13}}>
                <TextInput
                    style={{color:'rgb(126,202,242)', fontSize:16}}
                    placeholder="Retype Password"
                    placeholderTextColor={'white'}
                    secureTextEntry/>
            </View>
        </View>
        
        {/**Submit Button*/}
        <TouchableOpacity
        onPress={()=>{navigation.navigate('Log In')}}style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:15, alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:'white', fontFamily:'LexendDeca-Regular'}}>Create Account</Text>
        </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row', justifyContent:'center'}}>
                <Text style={{color:'white', fontFamily:'LexendDeca-Regular', fontSize:16}}>Have an account? </Text>
                <Pressable onPress={()=>{navigation.navigate('Log In')}}><Text style={{color:'rgb(126,202,242)', fontFamily:'LexendDeca-Regular', fontSize:16}}>Log In</Text></Pressable>
            </View>
        
    </SafeAreaView>

</View>
  )
}

export default SignUpScreen