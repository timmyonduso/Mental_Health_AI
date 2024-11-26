import { View, Text, Image } from 'react-native';
import React from 'react';
import { TouchableRipple } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../themeContext';
import { useDispatch } from 'react-redux';
import { setQuestion } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';

const ChatCard = ({ conversation, handleDeletePress }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const conversationType = 'SerenityAI';
  const navigation = useNavigation();
  console.log(conversation);
  return (
    <TouchableRipple
      className={`${
        theme === 'dark'
          ? 'border-b border-[#202020]'
          : 'border-b border-gray-100'
      } p-2 py-2.5 flex-1`}
      rippleColor="#999999"
      onLongPress={() => handleDeletePress(conversation._id)}
      onPress={() => {
        dispatch(
          setQuestion({
            id: conversation._id,
            title: conversation.title || 'Untitled Conversation',
          })
        );
        if (conversationType === 'SerenityAI') {
          navigation.navigate('Chat');
        } else {
          navigation.navigate('ChatTwo');
        }
      }}
    >
      <View className="w-full flex-row justify-between items-center px-2">
        {/* User Image */}
        <Image
          src="https://lh3.googleusercontent.com/a/ACg8ocLdNgEU7XrBIQp8mwgtO75axXXKZ9ztOXJ-H-9CzJv9LYEEkzRj=s96-c"
          resizeMode="contain"
          className="w-12 h-12 rounded-full"
        />

        {/* Conversation Details */}
        <View className="w-[70%]">
          <Text
            className={`${
              theme === 'dark' ? 'text-gray-200' : 'text-black'
            } font-semibold text-lg`}
          >
            {conversation.ai.sender}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className={`${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
            style={{
              fontSize: 14, // font size
              fontWeight: '400', // font weight
              overflow: 'hidden', // prevent overflow
            }}
          >
            {conversation.title || 'Untitled Conversation'}
          </Text>
        </View>

        {/* Time and Message Count */}
        <View className="justify-end">
          <Text
            className={`${
              theme === 'dark' ? ' text-gray-400' : ' text-gray-600'
            } text-sm`}
          >
            02:11
          </Text>
          <View className="w-6 h-6 mt-2 bg-green-500 rounded-full items-center justify-center">
            <Text className="text-gray-50 text-sm">2</Text>
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
};

export default ChatCard;
