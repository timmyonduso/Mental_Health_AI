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

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [chatHistor, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  // Fetch chat history on component mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await apiRequest.get(`/chats/chatHistory/${user.id}`);
        setChatHistory(response.data || []);
      } catch (error) {
        // console.error('Error fetching chat history:', error);
        setChatHistory([]);
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
      setChatHistory([
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
    <SafeAreaView className="flex-1 bg-[#101010]">
      <StatusBar barStyle="light-content" backgroundColor="#101010" />
      <View className="w-full bg-[#101010] p-3 pt-6">
        <TopBarTwo title="Chat" />
      </View>

      <ScrollView className="bg-[#101010] py-3 w-full flex-1">
        <View className="flex-1 relative p-3">
          {chatHistor.length > 0 ? (
            chatHistor.map((item, index) => (
              <View
                key={index}
                className={`p-4 my-2 ${
                  item.user === user.firstName
                    ? 'bg-[#505050] ml-auto rounded-lg rounded-tr-none'
                    : 'bg-[#202020] rounded-lg rounded-tl-none mr-auto'
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
                <Text className="text-white">{item.text}</Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-400 text-center mt-4">
              Start a new chat.
            </Text>
          )}
        </View>
      </ScrollView>

      <View className="flex-row items-center w-full bg-[#000000] border-t border-[#303030] p-3 pt-2 pb-6">
        <TextInput
          className="flex-1 h-[52px] px-4 bg-[#202020] text-gray-200 rounded-lg text-lg"
          value={message}
          onChangeText={setMessage}
          placeholder="Enter a prompt here..."
          placeholderTextColor="#808080"
          editable={!loading}
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
