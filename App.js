import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Animated, Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import Data from "./src/data/Data";

const {width, height} = Dimensions.get(`window`);
const TICKER_HEIGHT = 40;
const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;
const CIRCLE_SIZE = width * 0.6;
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
      <Animated.FlatList
        data={Data}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item, index}) => <Item {...item}/>}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}], {useNativeDriver: true}
        )}
        scrollEventThrottle={16}
      />
      <Image style={styles.logo}
             source={require("../reactnativeanimation/assets/logo.png")}/>
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
  },
  paginationDot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3,
    borderRadius: DOT_SIZE * 0.15,
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: '#eee',
    position: 'absolute',
  },
  circleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    top: '20%',
  },
  ticker: {
    textTransform: 'uppercase',
    fontSize: TICKER_HEIGHT,
    lineHeight: TICKER_HEIGHT,
    fontWeight: '800',
    color: '#222',
  },
  tickerContainer: {
    height: TICKER_HEIGHT,
    overflow: 'hidden',
    position: 'absolute',
    top: 40,
    left: 20,
  },
});
