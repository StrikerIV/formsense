import { View, Text,Image,Pressable } from 'react-native'
import React,{useState} from 'react'
import Logo from '../../assets/images/logo1.png'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const FeedComponent = () => {
    const [dislike, setDislike] = useState('dislike2')
    const [like, setLike] = useState('like2')
    const [bookmark, setBookmark] = useState('bookmark-o')
    const changeLike = () => {
        setLike((prevLike) => (prevLike === 'like1' ? 'like2' : 'like1'));
      };
      const changeDislike = () => {
        setDislike((prevDislike) => (prevDislike === 'dislike1' ? 'dislike2' : 'dislike1'));
      };
      const changeBookmark = () => {
        setBookmark((prevBookmark) => (prevBookmark === 'bookmark' ? 'bookmark-o' : 'bookmark'));
      };
  return (
    <View style={{width:'100%',borderWidth:1,backgroundColor:'rgba(126,202,242,0.12)', borderColor:'rgb(126,202,242)',borderRadius:10,padding:15,marginBottom:15}}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={{height:40,width:40, marginRight:5}}>
                    <Image style={{height:'100%', width:'100%', borderRadius:100, borderWidth:1, borderColor:'rgb(126,202,242)',}}source={Logo}/>
                </View>
                <Text style={{fontSize:18,color:'rgb(126,202,242)', fontFamily:'LexendDeca-Bold'}}>Agpancho360</Text>
            </View>
            <Text style={{fontFamily:'LexendDeca-Regular', color:'rgb(126,202,242)'}}>2 days ago</Text>
        </View>
        <View style={{width:'100%', height:1, backgroundColor:'rgb(126,202,242)', marginTop:10, marginBottom:10}}></View>
        <View style={{width:'100%',aspectRatio:1}}>
            <Image style={{width:'100%',height:'100%', borderRadius:5}}source={Logo}
            />
        </View>
        <View style={{width:'100%', height:1, backgroundColor:'rgb(126,202,242)', marginTop:10, marginBottom:10}}></View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:5}}>
            <View style={{flexDirection:'row'}}>
                <Pressable onPress={changeDislike} style={{marginRight:10}}>
                    <AntDesign name={dislike} size={24} color="rgb(126,202,242)" />
                </Pressable>
                <Pressable onPress={changeLike}>
                    <AntDesign name={like} size={24} color="rgb(126,202,242)" />
                </Pressable>
                
            </View>
            <Pressable onPress={changeBookmark}><FontAwesome name={bookmark} size={24} color="rgb(126,202,242)" /></Pressable>
            
        </View>

    </View>
  )
}

export default FeedComponent