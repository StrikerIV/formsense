import { View, Text,SafeAreaView,Pressable,Image,ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import FeedComponent from './FeedComponent'
import Logo from '../../assets/images/logo1.png'
import { Feather } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native'




const Feed = ({route,navigation}) => {
    const [isLoading, setLoading] = useState(false);
    const [feeds, setFeeds] = useState([]);
    console.log(route.params);
    const { serverId, serverName, channelName,channelId} = route.params;
    const fetchFeeds = () => {
        console.log(`http://localhost:8080/api/servers/${serverId}/channels/${channelId}/posts`)
        fetch(`http://localhost:8080/api/servers/${serverId}/channels/${channelId}/posts`)
            .then((response) => response.json())
            .then((response) => {
                console.log(response, 'help')
                setFeeds(response);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    };
  
    useEffect(() => {
        setLoading(true);
        fetchFeeds();
    }, []);
  return (
    <View style={{backgroundColor:'rgb(1,4,7)',flex:1}}>
        {isLoading ? <ActivityIndicator style={{flex:1}}size="large" color="rgb(126,202,242)"/> :
        <SafeAreaView style={{flex:1, marginHorizontal:5}}>
            <View style={{flexDirection:"row",alignItems:'center', marginBottom:10}}>
                <Pressable onPress={()=>{navigation.navigate('Channels')}} style={{marginRight:10}}>
                        <Feather name="arrow-left" size={24} color="rgb(126,202,242)" />
                    </Pressable>
                <Text style={{color:'white', fontFamily:'LexendDeca-Bold', fontSize:20, marginLeft:10,color:'rgb(126,202,242)'}}>{serverName}/<Text style={{color:'white'}}>{channelName}</Text><Text style={{color:'rgb(126,202,242)',fontSize:20}}></Text></Text>
            </View>
            <ScrollView>
            {
                feeds.map((feed)=> <FeedComponent />   ) 
            }
            </ScrollView>
            
        </SafeAreaView>
}
    </View>
  )
}

export default Feed