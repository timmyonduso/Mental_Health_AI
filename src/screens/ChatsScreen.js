import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Vibration,
  Alert, // Import Alert for confirmation dialog
} from 'react-native';
import React, { useEffect } from 'react';
import TopBarTwo from '../components/TopBarTwo';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectChatHistory,
  selectUser,
  setChatHistory,
  setQuestion,
} from '../slices/navSlice';
import { TouchableRipple, IconButton } from 'react-native-paper'; // Import IconButton for the delete button
import apiRequest from '../utils/api';
import { useTheme } from '../../themeContext';
import Markdown from 'react-native-markdown-display';
import { color } from 'react-native-elements/dist/helpers';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const ChatsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const chatHistory = useSelector(selectChatHistory);
  const { theme } = useTheme();

  // Fetch chat history on component mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await apiRequest.get(`/chats/chatHistory/${user.id}`);
        if (response.status) {
          dispatch(setChatHistory(response.data));
        }
      } catch (error) {
        // Handle error (optionally log it)
        dispatch(setChatHistory([])); // Clear chat history on error
      }
    };

    fetchChatHistory();
  }, [user.id]); // Dependency on user.id

  // Function to delete a conversation
  const deleteConversation = async (conversationId) => {
    try {
      await apiRequest.delete(
        `/chats/deleteConversation/${conversationId}/${user.id}`
      ); // Adjust endpoint as needed
      // Refresh chat history after deletion
      const response = await apiRequest.get(`/chats/chatHistory/${user.id}`);
      if (response.status) {
        dispatch(setChatHistory(response.data));
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  const handleDeletePress = (conversationId) => {
    Alert.alert(
      'Delete Conversation',
      'Are you sure you want to delete this conversation?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteConversation(conversationId),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'} flex-1 `}>
    <StatusBar barStyle={`${theme === 'dark' ? 'light-content' : 'dark-content'}`} backgroundColor={`${theme === 'dark' ? '#101010' : '#ffffff'}`} />
      <View className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'} w-full p-3 pt-6`}>
        <TopBarTwo title="Chats" />
      </View>
      <ScrollView className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'} w-full`}>
        <View className="flex-1 mt-2">
          {chatHistory && chatHistory?.length > 0 ? (
            <>
              {chatHistory?.map((chat) =>
                chat?.messages?.map((message) =>
                  message?.conversation
                    ?.slice()
                    ?.reverse()
                    ?.map(
                      (
                        conversation,
                        index // Reverse the order here
                      ) => (
                        <View
                          key={`${conversation._id}-${index}`}
                          className="flex-row justify-between"
                        >
                          <TouchableRipple
                            className={`${theme === 'dark' ? 'border-b border-[#202020]' : 'border-b border-gray-200'} p-2  flex-1`}
                            rippleColor="#999999"
                            onPress={() => {
                              dispatch(
                                setQuestion({
                                  id: conversation._id,
                                  title:
                                    conversation.title ||
                                    'Untitled Conversation',
                                })
                              );
                              
                              navigation.navigate('Chat');
                            }}
                          >
                            <View className='w-full flex-row justify-between items-center pl-3'>
                              

<Markdown
  style={{
    body: {
      color: theme === 'dark' ? '#e5e7eb' : '#1F2937', // text color based on theme
      fontSize: 15, // text-lg
      fontWeight: '400', // font-medium
      width: '75%', // w-3/4
    },
   
  }}
>
 {conversation.title}
</Markdown>

                           
                          <TouchableOpacity
                            onPress={() => handleDeletePress(conversation._id)} // Pass the conversation ID
                           className=' p-2 h-full '
            >
              <Ionicons 
                name='ellipsis-vertical'
                size={19}
                color={`${theme === 'dark' ? '#e5e7eb' : '#202020'}`}
                />
            </TouchableOpacity>
                            </View>
                          </TouchableRipple>
                         
                        </View>
                      )
                    )
                )
              )}
            </>
          ) : (
            <Text className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}  text-center mt-4`}>
              No Chats Available!
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatsScreen;
