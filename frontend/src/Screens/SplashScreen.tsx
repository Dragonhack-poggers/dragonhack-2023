import { View, Image, StyleSheet } from 'react-native';
import React from 'react'
import { theme } from '../theme';

const GIF_ANIMATION = require('frontend/assets/splash4.gif')

const SplashScreen = () => {
  return (
    <View style={[styles.container]}>
      <Image source={GIF_ANIMATION} resizeMode="contain" style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    paddingTop: 100,
  },
});

export default SplashScreen