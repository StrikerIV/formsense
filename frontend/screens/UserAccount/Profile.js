import { View, Text, TextInput, TouchableOpacity,Image, Pressable} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../../assets/images/logo1.png'
import { Feather } from '@expo/vector-icons';

const Profile = ({navigation}) => {
  return (
    <View style={{backgroundColor:'rgb(1,4,7)',flex:1}}>
        <SafeAreaView style={{flex:1, paddingHorizontal:25, justifyContent:'space-between', position:'relative'}}>
            <View style={{width:'100%', alignItems:'flex-end'}}>
                <Pressable onPress={()=>{navigation.navigate('Setting')}}><Feather name="settings" size={25} color="rgb(126,202,242)" /></Pressable>
            </View>
            {/**Company Logo */}
            <View style={{width:'100%', alignItems:'center'}}>
                <View style={{width:'50%', aspectRatio:1, justifyContent:'center', alignItems:'center'}}>
                    <Image source={Logo}  style={{width:'100%', height:'100%', borderWidth:1, borderColor:'white', borderRadius:100}} />
                </View>
                <Text style={{color:'white', textAlign:'center', fontFamily:'LexendDeca-Bold', fontSize:20}}>Alex Guzman</Text>
                <Text style={{color:'white', textAlign:'center', fontFamily:'LexendDeca-Bold', fontSize:16, marginBottom:20}}>@agpancho360</Text>

                {/**Email Input*/}
                <View style={{width:'100%', marginBottom:10}}>
                    <Text style={{color:'white', marginBottom:5,marginLeft:5, fontFamily:'LexendDeca-Bold', fontSize:16}}>My Stats</Text>
                    <View style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:13}}>
                        <Text
                            style={{color:'rgb(126,202,242)', fontSize:16, marginBottom:5}}
                            placeholderTextColor={'white'}>Height</Text>
                        <View style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:13, marginBottom:5}}>
                            <Text
                                style={{color:'rgb(126,202,242)', fontSize:16,marginBottom:5}}
                                placeholderTextColor={'white'}>5'6"</Text>
                        </View>
                        <Text
                            style={{color:'rgb(126,202,242)', fontSize:16, marginBottom:5}}
                            placeholderTextColor={'white'}>Weight</Text>
                        <View style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:13, marginBottom:5}}>
                            <Text
                                style={{color:'rgb(126,202,242)', fontSize:16,marginBottom:5}}
                                placeholderTextColor={'white'}>200lbs</Text>
                        </View>
                    </View>
                </View>
                <View style={{width:'100%', marginBottom:10}}>
                    <Text style={{color:'white', marginBottom:5,marginLeft:5, fontFamily:'LexendDeca-Bold', fontSize:16}}>My Groups</Text>
                    <View style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:13}}>
                        <Text
                            style={{color:'rgb(126,202,242)', fontSize:16, marginBottom:5}}
                            placeholderTextColor={'white'}>Height</Text>
                        <View style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:13, marginBottom:5}}>
                            <Text
                                style={{color:'rgb(126,202,242)', fontSize:16,marginBottom:5}}
                                placeholderTextColor={'white'}>5'6"</Text>
                        </View>
                        <Text
                            style={{color:'rgb(126,202,242)', fontSize:16, marginBottom:5}}
                            placeholderTextColor={'white'}>Weight</Text>
                        <View style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:13, marginBottom:5}}>
                            <Text
                                style={{color:'rgb(126,202,242)', fontSize:16,marginBottom:5}}
                                placeholderTextColor={'white'}>200lbs</Text>
                        </View>
                    </View>
                </View>

            </View>

            
        </SafeAreaView>
    
    </View>
  )
}

export default Profile