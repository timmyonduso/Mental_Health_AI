import { View, Text, StatusBar, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectUser, setUser } from '../slices/navSlice';
import useUserFetch from '../hooks/useUserFetch';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../themeContext';

const OnBoardingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { theme } = useTheme();

  // Fetch user token and data from AsyncStorage
  const checkUserToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const userData = JSON.parse(await AsyncStorage.getItem('userData'));

      if (userToken && userData) {
        dispatch(setUser(userData));
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'LoginStack' }] });
      }
    } catch (error) {
      console.error('Error checking user token:', error);
      Alert.alert('Error', 'Something went wrong.');
      navigation.reset({ index: 0, routes: [{ name: 'LoginStack' }] });
    }
  };

  // Fetch additional user details if necessary using a hook
  const { fetchedUser } = useUserFetch(user?.id);

  // Update user details if fetched data is available
  useEffect(() => {
    if (fetchedUser && user && !user.firstName) {
      dispatch(
        setUser({
          ...user,
          firstName: fetchedUser.firstName,
          lastName: fetchedUser.lastName,
          _id: fetchedUser._id,
        })
      );
    }
  }, [fetchedUser, user, dispatch]);

  // Check user token on component mount
  useEffect(() => {
    checkUserToken();
  }, []);

  // Navigate based on the user's authentication state
  useEffect(() => {
    if (user && user.firstName) {
      navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
    }
  }, [user]);

  // console.log('Current User:', user);
  return (
    <View
      className={`${
        theme === 'dark' ? 'bg-[#101010]' : 'bg-gray-100'
      } flex-1 justify-center items-center `}
    >
      <StatusBar
        barStyle={`${theme === 'dark' ? 'light-content' : 'dark-content'}`}
        backgroundColor={`${theme === 'dark' ? '#101010' : '#f3f4f6'}`}
      />
      <Text
        className={`${
          theme === 'dark' ? 'text-gray-200' : 'text-[#202020]'
        } text-4xl font-semibold`}
      >
        SerenityAI
      </Text>

      <ActivityIndicator
        size={28}
        color={`${theme === 'dark' ? '#ffffff' : '#202020'}`}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default OnBoardingScreen;
