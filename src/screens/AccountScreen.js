import { View, Text, SafeAreaView, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import React from 'react';
import TopBarTwo from '../components/TopBarTwo';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Import icons for styling options
import { TouchableRipple } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/navSlice';
import { Image } from 'react-native';

const AccountScreen = () => {
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  return (
    <SafeAreaView className="flex-1 bg-[#101010]">
      <StatusBar barStyle="light-content" backgroundColor="#101010" />
      
      <View className="w-full p-3 pt-6">
        <TopBarTwo title="Account" />
      </View>
      
      <ScrollView className="bg-[#101010] py-3 w-full">
        
        {/* Account Information Section */}
        <View className="p-4 bg-[#202020] rounded-lg m-3">

          {/* <Text className="text-white text-lg font-semibold mb-1">Account Information</Text> */}
         <View className='justify-center items-center'>
         
        {user?.profilePicture ? (
              <Image
              resizeMode='contain'
              source={{uri:user.profilePicture}}
              className='w-32 h-32  rounded-full'
              />
          ):(
            <View className='w-32 h-32  rounded-full bg-[#303030] justify-center items-center'>
               <Ionicons name='person-outline' size={40} color={'#e5e7eb'} />
               </View>
          )}
        
          <Text className="text-gray-400 text-xl mt-1">{user?.firstName} {user?.lastName}</Text>
          <Text className="text-gray-400">{user?.email}</Text>
          </View>
          {/* <TouchableRipple
            className="mt-3 p-2 bg-[#ea580c] rounded-lg"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-white text-lg text-center">Edit Profile</Text>
          </TouchableRipple> */}
        </View>

        {/* Settings Section */}
        <View className="p-3">
          <Text className="text-white text-lg font-semibold mb-2">Settings</Text>
          {[
            { title: 'Privacy & Security', icon: 'lock-closed-outline', screen: 'Account' },
            { title: 'Notifications', icon: 'notifications-outline', screen: 'Account' },
            { title: 'Language', icon: 'globe-outline', screen: 'Account' },
          ].map((item, index) => (
            <TouchableRipple
            key={index}
            className="p-4 bg-[#202020] rounded-lg my-1"
            onPress={() => navigation.navigate(item.screen)}
            rippleColor={'#404040'}
            >
            <View
                          className="flex-row items-center justify-between "

            >
              <View className="flex-row items-center">
                <Ionicons name={item.icon} size={24} color="#ea580c" />
                <Text className="text-white text-lg ml-3">{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={20} color="#ea580c" />
            </View>
            </TouchableRipple>
          ))}
        </View>

        {/* Logout Button */}
        <View className="p-3">
          <TouchableRipple
           className="p-4 bg-[#bf0a30] rounded-lg flex-row justify-center items-center"
           onPress={() => {/* handle logout functionality here */}}
           rippleColor={'#404040'}
           >
          <View
            className=" flex-row justify-center items-center"
          >
            <Ionicons name="log-out-outline" size={24} color="white" />
            <Text className="text-white text-lg ml-2">Logout</Text>
          </View>
          </TouchableRipple>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;
