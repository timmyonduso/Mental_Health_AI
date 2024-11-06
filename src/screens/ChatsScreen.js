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

const ChatsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const chatHistory = useSelector(selectChatHistory);

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
    <SafeAreaView className="flex-1 bg-[#101010]">
      <StatusBar barStyle="light-content" backgroundColor="#101010" />
      <View className="w-full bg-[#101010] p-3 pt-6">
        <TopBarTwo title="Chats" />
      </View>
      <ScrollView className="bg-[#101010] w-full">
        <View className="flex-1 gap-3 mt-2">
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
                            className="bg-[#202020] p-4 mx-3 rounded-lg flex-1"
                            rippleColor="#505050"
                            onPress={() => {
                              dispatch(
                                setQuestion({
                                  id: conversation._id,
                                  title:
                                    conversation.title ||
                                    'Untitled Conversation',
                                })
                              );
                              Vibration.vibrate(77);
                              navigation.navigate('Chat');
                            }}
                          >
                            <View>
                              {/* Display the conversation title */}
                              <Text className="text-white text-xl font-semibold">
                                {conversation.title || 'Untitled Conversation'}
                              </Text>
                            </View>
                          </TouchableRipple>
                          <IconButton
                            icon="delete"
                            color="red"
                            size={24}
                            onPress={() => handleDeletePress(conversation._id)} // Pass the conversation ID
                          />
                        </View>
                      )
                    )
                )
              )}
            </>
          ) : (
            <Text className="w-full text-center text-white text-xl font-semibold">
              No Chats Available!
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatsScreen;
