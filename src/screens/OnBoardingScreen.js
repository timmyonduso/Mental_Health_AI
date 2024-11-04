import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const OnBoardingScreen = () => {
  const navigation = useNavigation()
  return (
    <View className='flex-1 justify-center items-center bg-[#101010]'>
       <StatusBar barStyle="light-content" backgroundColor="#101010" />
                    <Text className='text-gray-200 text-xl font-semibold'>Don't worry about this screen.</Text>

      <TouchableOpacity
      className='rounded-lg bg-orange-600 p-3 w-1/2 items-center justify-center mt-3' 
      onPress={()=> navigation.navigate('LoginStack')}
      >
              <Text className='text-white text-xl font-semibold'>Get Started</Text>

      </TouchableOpacity>
    </View>
  )
}

export default OnBoardingScreen