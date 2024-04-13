import { View, Text,SafeAreaView,Pressable,Image,ScrollView } from 'react-native'
import React from 'react'
import FeedComponent from './FeedComponent'
import Logo from '../../assets/images/logo1.png'

const Feed = () => {
  return (
    <View style={{backgroundColor:'rgb(1,4,7)',flex:1}}>
        <SafeAreaView style={{flex:1, marginHorizontal:5}}>
            {/**Company Logo */}
            <View style={{flexDirection:"row", justifyContent:'space-between', marginBottom:10}}>
                <Text style={{color:'white', fontFamily:'LexendDeca-Bold', fontSize:27, marginLeft:10}}>Feed</Text>

                <View style={{height:40,width:40, marginRight:5}}>
                    <Image style={{height:'100%', width:'100%', borderRadius:100, borderWidth:1, borderColor:'rgb(126,202,242)',}}source={Logo}/>
                </View>
            </View>

            <ScrollView>
                <FeedComponent/>
                <FeedComponent/>
                <FeedComponent/>
            </ScrollView>
            
        </SafeAreaView>
    
    </View>
  )
}

export default Feed