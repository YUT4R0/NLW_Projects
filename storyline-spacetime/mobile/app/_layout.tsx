/* eslint-disable prettier/prettier */
import { SplashScreen, Stack } from 'expo-router'
import { styled } from 'nativewind'
import { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native'

import * as SecureStore from 'expo-secure-store'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import {
    Roboto_400Regular,
    Roboto_700Bold,
    useFonts,
} from '@expo-google-fonts/roboto'

import { StatusBar } from 'expo-status-bar'
import blurBg from '../src/assets/bg-blur.png'
import StripesBG from '../src/assets/bg-stripes.svg'

const StyledStripes = styled(StripesBG)

export default function Layout() {
  const [IsUserAuthenticated, setIsUserAuthenticated] = useState<null | boolean>(null)

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      setIsUserAuthenticated(!!token) // converts a string to a boolean (" " = false, "asdf" = true)
    })
  }, [])

  const [hasLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!hasLoaded) {
    return <SplashScreen />
  }

  return (
    <>
      <StatusBar style="light" translucent={false} backgroundColor="#121215" />
      <ImageBackground
        source={blurBg}
        className="relative flex-1 bg-gray-900"
        imageStyle={{
          position: 'absolute',
          left: '-100%',
        }}
      >
        <StyledStripes className="absolute left-2" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: 'transparent',
            },
          }}
        >
          <Stack.Screen name="index" redirect={IsUserAuthenticated as boolean} />
          <Stack.Screen name="new_post" />
          <Stack.Screen name="posts" />
        </Stack>
      </ImageBackground>
    </>
  )
}
