import Icon from '@expo/vector-icons/Feather'
import { Link, useRouter } from 'expo-router'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import * as SecureStore from 'expo-secure-store'

import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import NlwLogo from '../src/assets/body-nlw-logo.svg'
import { api } from '../src/lib/api'

interface Post {
  coverUrl: string
  excerpt: string
  id: string
  createdAt: string
}

export default function NewPost() {
  const { top, bottom } = useSafeAreaInsets()

  const [Posts, setPosts] = useState<Post[]>([])

  const router = useRouter()

  const signOut = async () => {
    await SecureStore.deleteItemAsync('token')

    router.push('/')
  }

  const loadPosts = async () => {
    const token = await SecureStore.getItemAsync('token')
    const response = await api.get('/posts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setPosts(response.data)
  }

  useEffect(() => {
    loadPosts()
  }, [])

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

        <View className="flex-row items-center justify-between gap-6">
          <TouchableOpacity
            className="h-9 w-9 items-center justify-center rounded-xl bg-red-500"
            activeOpacity={0.5}
            onPress={signOut}
          >
            <Icon name="log-out" size={20} color={'#fff'} />
          </TouchableOpacity>

          <Link href={'/new_post'} asChild>
            <TouchableOpacity
              className="h-11 w-11 items-center justify-center rounded-full bg-green-500"
              activeOpacity={0.5}
            >
              <Icon name="plus" size={20} color={'#000'} />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View className="mt-6 space-y-10">
        {Posts.map(({ id, coverUrl, excerpt, createdAt }) => {
          return (
            <View className="space-y-4" key={id}>
              <View className="flex-row items-center gap-2">
                <View className="h-px w-5 bg-gray-50" />
                <Text className="font-body text-xs text-gray-100">
                  {dayjs(createdAt).format('D of MMM, YYYY')}
                </Text>
              </View>
              <View className="space-y-4">
                <Image
                  source={{
                    uri: coverUrl,
                  }}
                  alt="[Image here]"
                  className="aspect-video w-full rounded-lg"
                />
                <Text className="font-body text-base leading-relaxed text-gray-100">
                  {excerpt}
                </Text>
                <Link href="/posts/id" asChild>
                  <TouchableOpacity className="flex-row items-center gap-2">
                    <Text className="font-body text-sm text-gray-200">
                      Read more...
                    </Text>
                    <Icon name="arrow-right" size={18} color={'#9e9ea0'} />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}
