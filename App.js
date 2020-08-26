import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Dimensions, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import Data from "./src/data/Data";

const {width, height} = Dimensions.get(`window`);
const LOGO_WIDTH = 240;
const LOGO_HEIGHT = 40;
const DOT_SIZE = 40;

const Item = ({imageUri, heading, description}) => {
  return (
    <View style={styles.itemStyle}>
      <Image source={imageUri} style={[styles.imageStyle]}/>
      <View style={styles.textContainer}>
        <Text style={[styles.heading]}>{heading}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  )

}

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style='auto' hidden/>
      <FlatList
        data={Data}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
      />
      <Image style={styles.logo}
             source={require("../reactnativeanimation/assets/alex.jpg")}/>
      {/*<Pagination/>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
