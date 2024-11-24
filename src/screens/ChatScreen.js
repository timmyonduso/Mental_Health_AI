import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectChatHistory,
  selectUser,
  setChatHistory,
} from '../slices/navSlice';
import TopBarTwo from '../components/TopBarTwo';
import apiRequest from '../utils/api';
import { useTheme } from '../../themeContext';
import Markdown from 'react-native-markdown-display';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [chatHistor, setChatHistoryy] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUser);
  const { theme } = useTheme();

  const dispatch = useDispatch();

  // Fetch chat history on component mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await apiRequest.get(`/chats/chatHistory/${user.id}`);
        setChatHistoryy(response.data || []);
      } catch (error) {
        // console.error('Error fetching chat history:', error);
        setChatHistoryy([]);
      }
    };

    fetchChatHistory();
  }, []);

  const handleSubmit = async () => {
    if (!message.trim()) return; // Prevent sending empty messages
    setLoading(true);
    try {
      const response = await apiRequest.post('/chats/postChat', {
        userId: user.id,
        message,
      });
      const dataResponse = await apiRequest.get(
        `/chats/chatHistory/${user.id}`
      );

      dispatch(setChatHistory(dataResponse.data));
      setChatHistoryy([
        ...chatHistor,
        { user: user.firstName, text: message },
        { user: 'Serenity AI', text: response.data.response },
      ]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'} flex-1 `}>
    <StatusBar barStyle={`${theme === 'dark' ? 'light-content' : 'dark-content'}`} backgroundColor={`${theme === 'dark' ? '#101010' : '#ffffff'}`} />
      <View className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'} w-full p-3 pt-6`}>
        <TopBarTwo title="Chat" />
      </View>

      <ScrollView className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'} py-3 w-full flex-1`}>
        <View className="flex-1 relative p-3">
          {chatHistor.length > 0 ? (
            chatHistor.map((item, index) => (
              <View
                key={index}
                className={`p-4 my-2 ${
                  item.user === user.firstName
                    ? `${theme === 'dark' ? 'bg-[#505050]' : 'bg-gray-100'} ml-auto rounded-lg rounded-tr-none`
                    : `${theme === 'dark' ? 'bg-[#202020]' : 'bg-gray-100'} mr-auto rounded-lg rounded-tl-none`
                }`}
                
              >
                <Text
                  className={`font-bold ${
                    item.user === user.firstName
                      ? 'text-green-600'
                      : 'text-orange-600'
                  }`}
                >
                  {item.user}
                </Text>
              
<Markdown
  style={{
    body: {
      color: theme === 'dark' ? '#FFFFFF' : '#1F2937', // text color based on theme
      fontSize: 15, // text-lg
      fontWeight: '500', // font-medium
    },
    heading1: {
      color: theme === 'dark' ? '#FFFFFF' : '#1F2937',
    },
    
  }}
>
  {item.text}
</Markdown>

              </View>
            ))
          ) : (
            <Text className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}  text-center mt-4`}>
              Start a new chat.
            </Text>
          )}
        </View>
      </ScrollView>

      <View  className={`${theme === 'dark' ? 'bg-[#000000] border-t border-[#303030]' : 'bg-gray-100 border-t border-gray-200'} flex-row items-center w-full  p-3 pt-2 pb-4`}>
      <TextInput
  className={`${
    theme === 'dark' ? 'bg-[#202020] text-gray-200' : 'bg-white text-black'
  } flex-1 h-[52px] px-5 rounded-full text-lg`}
  value={message}
  onChangeText={(text) => setMessage(String(text))}
  placeholder="Enter a prompt here..."
  placeholderTextColor="#808080"
  editable={!loading}
  keyboardType="default" 
/>

        <TouchableOpacity
          onPress={handleSubmit}
          className="ml-4"
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ea580c" />
          ) : (
            <Ionicons name="send" size={24} color="#ea580c" />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
