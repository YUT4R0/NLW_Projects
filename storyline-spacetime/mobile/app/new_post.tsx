import { Link } from 'expo-router'
import {
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Icon from '@expo/vector-icons/Feather'

import { useState } from 'react'
import NlwLogo from '../src/assets/body-nlw-logo.svg'

export default function NewPost() {
  const { bottom, top } = useSafeAreaInsets()

  const [IsPublic, setIsPublic] = useState(false)

  const handlePublic = () => {
    setIsPublic(!IsPublic)
  }

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{
        paddingBottom: bottom + 20,
        paddingTop: top,
      }}
    >
      <View className="mt-5 flex-row items-center justify-between">
        <NlwLogo />

        <Link href={'/posts'} asChild>
          <TouchableOpacity
            className="h-11 w-11 items-center justify-center rounded-full bg-purple-500"
            activeOpacity={0.5}
          >
            <Icon name="arrow-left" size={20} color={'#fff'} />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-3">
          <Switch
            value={IsPublic}
            onValueChange={handlePublic}
            thumbColor={IsPublic ? '#9b79ea' : '#9e9e90'}
            trackColor={{
              true: '#372570',
              false: '#2c2c31',
            }}
            style={{
              transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
            }}
          />
          <Text className="font-body text-sm text-gray-200">
            Make this post public
          </Text>
        </View>

        <TouchableOpacity
          className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
          activeOpacity={0.7}
        >
          <View className="flex-row items-center gap-3">
            <Icon name="image" color={'#9e9ea0'} size={20} />
            <Text className="font-roboto text-sm text-gray-200">
              Add photo or video for this cover
            </Text>
          </View>
        </TouchableOpacity>

        <TextInput
          multiline
          className="px-0 py-0 font-body text-sm text-gray-50"
          placeholderTextColor={'#56565a'}
          placeholder="Feel free to add photos, videos, and stories about that experience you want to remember forever! ^_^"
        />

        <TouchableOpacity
          activeOpacity={0.7}
          className="items-center self-end rounded-full bg-green-500 px-5 py-3"
          onPress={() => null}
        >
          <Text className="font-alt text-sm uppercase leading-none text-black">
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
