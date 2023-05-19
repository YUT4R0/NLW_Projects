import { StatusBar } from 'expo-status-bar'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'

import blurBg from './src/assets/bg-blur.png'
import StripesBG from './src/assets/bg-stripes.svg'
import NlwLogo from './src/assets/body-nlw-logo.svg'

import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { styled } from 'nativewind'

const StyledStripes = styled(StripesBG)

export default function App() {
  const [hasLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!hasLoaded) {
    return null
  }

  return (
    <>
      <StatusBar style="light" translucent={false} backgroundColor="#121215" />
      <ImageBackground
        source={blurBg}
        className="relative flex-1 items-center bg-gray-900 px-8 py-4"
        imageStyle={{
          position: 'absolute',
          left: '-100%',
        }}
      >
        <StyledStripes className="absolute left-2" />

        <View className="flex-1 items-center justify-center gap-6">
          <NlwLogo />
          <View className="space-y-2">
            <Text className="text-center font-title text-2xl leading-tight text-gray-50">
              Your time capsule 8{'^)'}
            </Text>
            <Text className="text-center font-body text-base leading-relaxed text-gray-100">
              Collect memorable moments from your journey and share (if you
              like) with the world!
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            className="rounded-full bg-green-500 px-5 py-3"
          >
            <Text className="font-alt text-sm uppercase leading-none text-black">
              start registering
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
          Made with 💙 by Yutaro! :3
        </Text>
        <Text className="text-center font-body text-xs leading-relaxed text-gray-200 opacity-10">
          (also, provided by Rocketseat XD)
        </Text>
      </ImageBackground>
    </>
  )
}
