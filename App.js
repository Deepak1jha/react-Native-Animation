import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Animated, Dimensions, FlatList, Image, StyleSheet, Text, View} from 'react-native';
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

const Pagination = () => {
  return (
    <View style={styles.pagination}>
      {Data.map((item) => {
        return (
          <View key={item.id} style={styles.paginationDotContainer}>
            <View style={[styles.paginationDot, {backgorundColor: item.color}]}>

            </View>
          </View>
        )
      })}
    </View>
  )
}

export default function App() {

  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar style='auto' hidden/>
      <FlatList
        data={Data}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item, index}) => <Item {...item}/>}
      />
      <Image style={styles.logo}
             source={require("../reactnativeanimation/assets/alex.jpg")}/>
      <Pagination/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemStyle: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: width * 0.75,
    height: height * 0.75,
    resizeMode: "contain",
    flex: 1
  },
  textContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-end',
    flex: .5
  },
  heading: {
    color: "#444",
    textTransform: "uppercase",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 2
  },
  description: {
    color: "#ccc",
    fontWeight: "600",
    textAlign: "left",
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5
  },
  logo: {
    opacity: 0.9,
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    resizeMode: "contain",
    position: "absolute",
    left: 10,
    bottom: 10,
    transform: [
      {translateX: -LOGO_WIDTH / 2},
      {translateY: -LOGO_HEIGHT / 2},
      {rotateZ: "-90deg"},
      {translateX: LOGO_WIDTH / 2},
      {translateY: LOGO_HEIGHT / 2},
    ]
  },
  pagination: {
    position: "absolute",
    right: 20,
    bottom: 40,
    flexDirection: "row",
    height: DOT_SIZE,
    color: "black"
  }
});
