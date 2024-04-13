import { View, Text, TextInput, TouchableOpacity,Image, Pressable} from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../assets/images/logo1.png'
import AsyncStorage from '@react-native-async-storage/async-storage';




const SignInScreen = ({navigation}) => {
    const [username, setUsername] = useState('strikeriv')
    const [password, setPassword] = useState('testing')

    const logInPressed = () =>{
        console.log(username, password)
        postData("http://localhost:8080/api/auth/signin", { 
            username: username,
            password: password 
        }).then(async(response) => {
            if(!response) {
                return;
            }
            await AsyncStorage.setItem('token', response.headers.get("set-cookie").split("=")[1]);
            console.log(response.headers.get("set-cookie").split("=")[1])
            navigation.navigate('In App')// JSON data parsed by `data.json()` call
            }).catch(e => {
                console.log(e, 'errorss')
            });
    }
    // Example POST method implementation:
    async function postData(url = "", data = {}) {

    // Default options are marked with *
    const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
    "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
    }


  
      
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
                    <Text style={{color:'white', marginBottom:8,marginLeft:5, fontFamily:'LexendDeca-Bold', fontSize:16}}>Username</Text>
                    <View style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:13}}>
                        <TextInput
                            autoCapitalize='none'
                            value={username}
                            onChangeText={setUsername}
                            style={{color:'rgb(126,202,242)', fontSize:16}}
                            placeholder="Username"
                            placeholderTextColor={'white'}/>
                    </View>
                </View>
                {/**Password Input*/}
                <View style={{width:'100%', marginBottom:10}}>
                    <Text style={{color:'white', marginBottom:8,marginLeft:5, fontFamily:'LexendDeca-Bold', fontSize:16}}>Password</Text>
                    <View style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:13}}>
                        <TextInput
                            autoCapitalize='none'
                            value={password}
                            onChangeText={setPassword}
                            style={{color:'rgb(126,202,242)', fontSize:16}}
                            placeholder="Password"
                            placeholderTextColor={'white'}
                            secureTextEntry/>
                    </View>
                </View>
                <Pressable style={{marginBottom:30}}><Text style={{color:'white', textAlign:'right', fontFamily:'LexendDeca-Regular'}}>Forgot Password?</Text></Pressable>
                
                {/**Submit Button*/}
                <TouchableOpacity
                onPress={logInPressed} style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:15, alignItems:'center', justifyContent:'center'}}>
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