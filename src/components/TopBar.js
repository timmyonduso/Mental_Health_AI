import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setQuestion } from '../slices/navSlice';

const TopBar = () => {
  const user = useSelector(selectUser);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View className="w-full flex-row justify-between items-center mb-2">
      <TouchableOpacity
        onPress={() => navigation.navigate('Account')}
        className="flex-row justify-start gap-2 items-center"
      >
        {user && user?.profilePicture ? (
          <Image
            resizeMode="contain"
            source={{ uri: user?.profilePicture }}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <View className="w-12 h-12 rounded-full bg-[#303030] justify-center items-center">
            <Ionicons name="person-outline" size={20} color={'#e5e7eb'} />
          </View>
        )}

        <View>
          <Text className="text-xl font-semibold text-gray-100">👋 Hello,</Text>
          <Text className=" text-white">
            {user?.firstName} {user?.lastName}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch(
            setQuestion({
              id: null,
              messageText: '',
            })
          );
          navigation.navigate('Chat');
        }}
      >
        <Ionicons name="chatbubbles-outline" color={'#ffffff'} size={28} />
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;
