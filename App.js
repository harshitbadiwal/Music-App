import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Musicplayer from './component/Musicplayer'

const App = () => {
  return <>
  <View style={styles.container}>
  <Musicplayer/>
  </View>
  </>
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    // backgroundColor:'black'
  }
})

export default App