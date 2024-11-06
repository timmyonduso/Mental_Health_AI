import React, { useEffect } from 'react';
import { View, Text, StatusBar, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/navSlice';

const OnBoardingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        const storedUserInfo = await AsyncStorage.getItem('userInfo');
        const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

        // Wait for 3 seconds before navigating
        setTimeout(() => {
          if (userToken && userInfo) {
            dispatch(setUser(userInfo));
            navigation.replace('Main');
          } else {
            navigation.replace('LoginStack');
          }
        }, 3000);
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
        navigation.replace('LoginStack');
      }
    };

    checkTokenAndNavigate();
  }, [navigation, dispatch]);

  return (
    <View className="flex-1 justify-center items-center bg-[#101010]">
      <StatusBar barStyle="light-content" backgroundColor="#101010" />
      <Text className="text-gray-200 text-4xl font-semibold">SerenityAI</Text>

      <ActivityIndicator
        size="large"
        color="#ffffff"
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default OnBoardingScreen;
