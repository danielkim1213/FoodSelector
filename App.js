import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from './SearchScreen';
import HealthScreen from './HealthScreen';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const SIZE = 120;

function Icon({ name }) {
  return <Text style={styles.icon}>{name}</Text>;
}

function HomeScreen() {
  const offset = useSharedValue(0);
  const width = useSharedValue(0);

  const onLayout = (event) => {
    width.value = event.nativeEvent.layout.width;
  };

  const pan = Gesture.Pan()
    .onChange((event) => {
      offset.value += event.changeX;
    })
    .onFinalize((event) => {
      offset.value = withDecay({
        velocity: event.velocityX,
        rubberBandEffect: true,
        clamp: [-(width.value / 2) + SIZE / 2, width.value / 2 - SIZE / 2],
      });
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  return (
    <View style={styles.screen}>
      <Text>Home Screen</Text>
      <GestureHandlerRootView style={styles.container}>
        <View onLayout={onLayout} style={styles.wrapper}>
          <GestureDetector gesture={pan}>
            <Animated.View style={[styles.box, animatedStyles]} />
          </GestureDetector>
        </View>
      </GestureHandlerRootView>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Text>Profile Screen</Text>
    </View>
  );
}

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

function AnimatedIcon({ name, focused }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(focused ? 1.6 : 1, {
        damping: 10, // Adjust for effect
        stiffness: 100, // Adjust for effect
        duration: 1000,
      }) }],
    };
  });

  return <Animated.Text style={[styles.icon, animatedStyle]}>{name}</Animated.Text>;
}





function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = '🏠'; 
          } else if (route.name === 'Search') {
            iconName = '🔍';
          } else if (route.name === 'Health') {
            iconName = '🥗';
          } else if (route.name === 'Profile') {
            iconName = '👤'; 
          } 
          return <AnimatedIcon name={iconName} focused={focused} />;
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 70,
          position: 'absolute',
          borderTopColor: 'transparent',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Health" component={HealthScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Wrap the navigation container around your tabs
export default function App() {

  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  box: {
    height: SIZE,
    width: SIZE,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    cursor: 'grab',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
