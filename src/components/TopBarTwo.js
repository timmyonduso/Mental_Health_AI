import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const TopBarTwo = ({title, navigationTo}) => {
    const navigation = useNavigation()
  return (
    <View className='flex justify-between items-center'>
        <TouchableOpacity className='absolute left-1' onPress={()=> navigation.goBack()} >
        <Ionicons  color={'#e5e7eb'} name='arrow-back-outline' size={28} />

        </TouchableOpacity>
        
      <Text className='text-gray-200 text-xl font-semibold'>{title}</Text>
    </View>
  )
}

export default TopBarTwo