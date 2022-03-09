import React,{Component} from "react"
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import{
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
}from 'react-native'

const options={
  title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    }
}
export default class App extends Component{
  render(){
    const openGallery= async() =>{
      const images = await launchImageLibrary(options)
      console.log(images.assets[0])
      const formdata= new FormData()
      formdata.append('file',{
        uri: images.assets[0].uri,
        type: images.assets[0].type,
        name: images.assets[0].fileName
      })
      let res = await fetch(
        ('http://ekycdev.acumengroup.in/touch/upload'),
        {
          method: 'post',
          body: formdata,
          headers: {
            'Content-Type': 'multipart/form-data; ',
          },
        }
      );
      let responseJson = await res.json();
      console.log(responseJson,"responseJson")
    }
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>Upload Your Image</Text>
        </View>

        <View style={styles.footer}>
          <TouchableHighlight style= {styles.button}
            underlayColor='black'
            onPress={openGallery}>
            <Text style={styles.ButtonText}>Login</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'black'
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    // flex: 1,
    height: 500,
    backgroundColor: '#d7dbd9',
    borderTopLeftRadius: 90,
    paddingVertical: 10,
    paddingHorizontal: 30,

  },
  text:{
    fontSize: 39,
    fontWeight: '20',
    marginBottom: 40,
    color: 'white',
  },
  button:{
    width: '98%',
    height: 60,
    marginTop: 350,
    borderRadius: 8,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems:'center',
  },
  ButtonText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
})