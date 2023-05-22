import Icon from '@expo/vector-icons/Feather'
import { Link, useRouter } from 'expo-router'
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from 'expo-secure-store'

import { useState } from 'react'
import NlwLogo from '../src/assets/body-nlw-logo.svg'
import { api } from '../src/lib/api'

export default function NewPost() {
  const { bottom, top } = useSafeAreaInsets()

  const [IsPublic, setIsPublic] = useState(false)
  const [Content, setContent] = useState('')
  const [CoverUrl, setCoverUrl] = useState<string | null>(null)

  const router = useRouter()

  const handlePublic = () => {
    setIsPublic(!IsPublic)
  }

  const openImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      })

      if (result?.assets[0]) {
        setCoverUrl(result?.assets[0].uri)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleCreatePost = async () => {
    const token = await SecureStore.getItemAsync('token')

    let previewCover = ''

    if (CoverUrl) {
      const uploadFormData = new FormData()

      uploadFormData.append('file', {
        uri: CoverUrl,
        name: 'image.jpg',
        type: 'image/jpeg',
      } as any)

      const uploadResponse = await api.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      previewCover = uploadResponse.data.fileUrl
    }

    console.log({
      Content,
      IsPublic,
      previewCover,
    })

    await api.post(
      '/posts',
      {
        Content,
        IsPublic,
        previewCover,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push('/posts')
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
          onPress={openImagePicker}
          className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
          activeOpacity={0.7}
        >
          {CoverUrl ? (
            <Image
              source={{ uri: CoverUrl }}
              alt="[selected image]"
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <View className="flex-row items-center gap-3">
              <Icon name="image" color={'#9e9ea0'} size={20} />
              <Text className="font-roboto text-sm text-gray-200">
                Add photo or video for this cover
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          value={Content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
          className="px-0 py-0 font-body text-sm text-gray-50"
          placeholderTextColor={'#56565a'}
          placeholder="Feel free to add photos, videos, and stories about that experience you want to remember forever! ^_^"
        />

        <TouchableOpacity
          activeOpacity={0.7}
          className="items-center self-end rounded-full bg-green-500 px-5 py-3"
          onPress={handleCreatePost}
        >
          <Text className="font-alt text-sm uppercase leading-none text-black">
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
