import { View, Text,SafeAreaView,TextInput,TouchableOpacity,Pressable } from 'react-native'
import React,{useState} from 'react'

const SignUpScreen = ({navigation}) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const signupPressed = () =>{
        console.log(username, email, password, "data")
        postData("http://localhost:8080/api/auth/signup", { username: username, email:email,role:[],password:password }).then((data) => {
            console.log(data); 
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
    // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
    }
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
                    value={username}
                    onChangeText={setUsername}
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
                    value={email}
                    onChangeText={setEmail}
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
                    value={password}
                    onChangeText={setPassword}
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
        onPress={signupPressed}style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:15, alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:'white', fontFamily:'LexendDeca-Regular'}}>Create Account</Text>
        </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row', justifyContent:'center'}}>
                <Text style={{color:'white', fontFamily:'LexendDeca-Regular', fontSize:16}}>Have an account? </Text>
                <Pressable onPress={()=>{}}><Text style={{color:'rgb(126,202,242)', fontFamily:'LexendDeca-Regular', fontSize:16}}>Log In</Text></Pressable>
            </View>
        
    </SafeAreaView>

</View>
  )
}

export default SignUpScreen