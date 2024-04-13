import { View, Text,SafeAreaView,TouchableOpacity,ScrollView,Pressable } from 'react-native'
import React,{useEffect,useState} from 'react'
import { Feather } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native'



const Channels = ({route,navigation}) => {
    const [isLoading, setLoading] = useState(false);
    const [channels, setChannels] = useState([]);
    
    const { serverName, uid} = route.params;
    const fetchChannels = () => {
        fetch(`http://localhost:8080/api/servers/${uid}/channels`)
            .then((response) => response.json())
            .then((response) => {
                console.log(response, 'help')
                setChannels(response);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    };
  
    useEffect(() => {
        setLoading(true);
        fetchChannels();
    }, []);
  return (
    <View style={{backgroundColor:'rgb(1,4,7)',flex:1}}>
         {isLoading ? <ActivityIndicator style={{flex:1}}size="large" color="rgb(126,202,242)"/> :
    <SafeAreaView style={{flex:1, marginHorizontal:5}}>
        {/**Company Logo */}
        <View style={{flexDirection:"row",alignItems:'center', marginBottom:10}}>
            <Pressable onPress={()=>{navigation.navigate('Servers')}} style={{marginRight:10}}>
                    <Feather name="arrow-left" size={24} color="rgb(126,202,242)" />
                </Pressable>
            <Text style={{color:'white', fontFamily:'LexendDeca-Bold', fontSize:27, marginLeft:10}}><Text style={{color:'rgb(126,202,242)',fontSize:27}}>{serverName}/</Text></Text>
        </View>
        <View style={{width:'100%', marginBottom:30}}>
            <TouchableOpacity >
                <View style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:13}}>
                    <Text style={{color:'rgb(126,202,242)', fontSize:16, fontFamily:'LexendDeca-Bold', textAlign:'center'}}>Create New Channel</Text>
                </View>
            </TouchableOpacity>
        </View>
        <Text style={{color:'white', fontFamily:'LexendDeca-Bold', textAlign:'center', marginBottom:10}}>Channels</Text>
        <ScrollView>
        {
        channels.map((channel)=> 
            <TouchableOpacity key={channel.uid} onPress={()=>{navigation.navigate('Feed',{serverId: uid, serverName:serverName, channelId:channel.uid, channelName:channel.name})}}>
                <View style={{borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,paddingHorizontal:15,paddingVertical:13,marginBottom:10}}>
                    <Text style={{color:'rgb(126,202,242)', fontSize:16, fontFamily:'LexendDeca-Bold', textAlign:'center'}}>{channel.name}</Text>
                    <View style={{width:'100%', height:1, backgroundColor:'rgb(126,202,242)', marginBottom:10}}></View>
                    <Text style={{fontFamily:'LexendDeca-Regular', color:'rgb(126,202,242)', textAlign:'center'}}>{channel.description}</Text>
                </View>
            </TouchableOpacity>)
        }


        </ScrollView>
        
    </SafeAreaView>
}
</View>
  )
}

export default Channels