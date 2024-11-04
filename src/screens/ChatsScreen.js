import { View, Text, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Vibration } from 'react-native';
import React from 'react';
import TopBarTwo from '../components/TopBarTwo';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setQuestion } from '../slices/navSlice';
import { TouchableRipple } from 'react-native-paper';
import { chats } from '../hooks/Database';

const ChatsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <SafeAreaView className="flex-1 bg-[#101010]">
       <StatusBar barStyle="light-content" backgroundColor="#101010" />
      <View className="w-full bg-[#101010] p-3 pt-6">
        <TopBarTwo title="Chats" />
      </View>
      <ScrollView className="bg-[#101010] w-full">

        <View className="flex-1 gap-3 mt-2">
          {chats.map((chat) => {
            // Get the last message for each chat
            const lastMessage = chat.messages[chat.messages.length - 1];
            // Get the name of the sender of the last message
            const sender = chat.participants.find((participant) => participant.userId === lastMessage.senderId);

            return (
              <TouchableRipple
                key={chat.id}
                className="bg-[#202020] p-4 mx-3 rounded-lg"
                rippleColor="#505050"
                onPress={() => {
                  dispatch(
                    setQuestion({
                      id: chat.id,
                      title: chat.title,
                    })
                  );
                  Vibration.vibrate(77);

                  navigation.navigate('Chat');
                }}
              >
                <View>
                  {/* Display the sender's name and last message text */}
                  <Text className="text-white text-xl font-semibold">{sender?.name || 'Unknown'}</Text>
                  <Text className="text-gray-400 text-base">{lastMessage?.text || 'No messages yet'}</Text>
                </View>
              </TouchableRipple>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatsScreen;
