import { View, Text,SafeAreaView,Image, ScrollView, TouchableOpacity,FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from 'react-native'

const ServersScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(false);
    const [servers, setServers] = useState([]);
  
    const fetchServers = () => {
        fetch("http://localhost:8080/api/servers")
            .then((response) => response.json())
            .then((response) => {
                console.log(response, 'help')
                setServers(response);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    };
  
    useEffect(() => {
        setLoading(true);
        fetchServers();
    }, []);

  return (
    <View style={{backgroundColor:'rgb(1,4,7)',flex:1}}>
        { isLoading ? <ActivityIndicator style={{flex:1}}size="large" color="rgb(126,202,242)"/> :
        <SafeAreaView style={{flex:1, marginHorizontal:5}}>
            {/**Company Logo */}
            <View style={{flexDirection:"row", justifyContent:'space-between', marginBottom:10}}>
                <Text style={{color:'white', fontFamily:'LexendDeca-Bold', fontSize:27, marginLeft:10}}>Servers</Text>
            </View>
            <View style={{width:'100%', marginBottom:30}}>
                <TouchableOpacity onPress={()=>{navigation.navigate('Channels')}}>
                    <View style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:13}}>
                        <Text style={{color:'rgb(126,202,242)', fontSize:16, fontFamily:'LexendDeca-Bold', textAlign:'center'}}>Create New Server</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={{color:'white', fontFamily:'LexendDeca-Bold', textAlign:'center', marginBottom:10}}>Available Servers</Text>
            <ScrollView>
                    {
                    servers.map((server)=> 
                    <TouchableOpacity key={server.uid} onPress={()=>{navigation.navigate('Channels',{uid: server.uid, serverName:server.name})}}>
                        <View style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:13,marginBottom:10}}>
                            <Text style={{color:'rgb(126,202,242)', fontSize:16, fontFamily:'LexendDeca-Bold', textAlign:'center'}}>{server.name}</Text>
                            <View style={{width:'100%', height:1, backgroundColor:'rgb(126,202,242)', marginBottom:10}}></View>
                            <Text style={{fontFamily:'LexendDeca-Regular', color:'rgb(126,202,242)', textAlign:'center'}}>{server.description}</Text>
                        </View>
                    </TouchableOpacity>)
                    }
            </ScrollView>
        </SafeAreaView>
    }
    </View>
  )
}

export default ServersScreen 