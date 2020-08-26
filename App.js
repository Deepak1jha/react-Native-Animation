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


const Item = ({imageUri, heading, description, index, scrollX}) => {

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const inputRangeOpacity = [(index - .3) * width, index * width, (index + .3) * width];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.2, 1, 0.2]
  });

  const translateXHeading = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.1, 0, -width * 0.1],
  });

  const translateXDescription = scrollX.interpolate({
    inputRange,
    outputRange: [width, 0, -width],
  });

  const opacity = scrollX.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [0, 1, 0],
  });

  return (
    <View style={styles.itemStyle}>
      <Animated.Image source={imageUri} style={[styles.imageStyle, {transform: [{scale}]}]}/>
      <View style={styles.textContainer}>
        <Animated.Text
          style={[
            styles.heading,
            {
              opacity,
              transform: [{translateX: translateXHeading}],
            },
          ]}
        >
          {heading}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.description,
            {
              opacity,
              transform: [{translateX: translateXDescription}],
            },
          ]}
        >
          {description}
        </Animated.Text>
      </View>
    </View>
  )
}

const Ticker = ({scrollX}) => {
  return (
    <View style={styles.tickerContainer}>
      <Animated.View
        style={{
          transform: [
            {
              translateY: scrollX.interpolate({
                inputRange: [-width * 2, -width, 0, width, width * 2],
                outputRange: [
                  TICKER_HEIGHT * 2,
                  TICKER_HEIGHT,
                  0,
                  -TICKER_HEIGHT,
                  -TICKER_HEIGHT * 2,
                ],
              }),
            },
          ],
        }}
      >
        {Data.map(({type}, index) => {
          return (
            <Text key={index} style={styles.ticker}>
              {type}
            </Text>
          );
        })}
      </Animated.View>
    </View>
  );
};

const Circle = ({scrollX}) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
      {Data.map((p, index) => {
        const inputRange = [
          (index - 0.55) * width,
          index * width,
          (index + 0.55) * width,
        ];
        return (
          <Animated.View
            key={index}
            style={[
              styles.circle,
              {
                backgroundColor: p.color,
                opacity: scrollX.interpolate({
                  inputRange,
                  outputRange: [0, 0.1, 0],
                }),
                transform: [
                  {
                    scale: scrollX.interpolate({
                      inputRange,
                      outputRange: [0, 1, 0],
                    }),
                  },
                ],
              },
            ]}
          />
        );
      })}
    </View>
  );
};

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
      <Circle scrollX={scrollX}/>
      <Animated.FlatList
        data={Data}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item, index}) => <Item {...item} index={index} scrollX={scrollX}/>}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}], {useNativeDriver: true}
        )}
        scrollEventThrottle={16}
      />
      <Image style={styles.logo}
             source={require("../reactnativeanimation/assets/logo.png")}/>
      <Pagination/>
      <Ticker scrollX={scrollX}/>
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
