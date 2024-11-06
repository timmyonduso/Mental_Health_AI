import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import TopBar from '../components/TopBar';
import HomeQuestions from '../components/HomeQuestions';
import HomeTabs from '../components/HomeTabs';
import MoodAnalysis from '../components/MoodAnalysis';
import { moods, questions, tabs } from '../hooks/Database';
import ActiveTabs from '../components/ActiveTabs';
import { selectUser } from '../slices/navSlice';
import { useDispatch, useSelector } from 'react-redux';
import apiRequest from '../utils/api';
import {
  fetchUserMoods,
  selectLoading,
  selectMoodLog,
} from '../slices/moodSlice';
import Professionals from '../components/Professionals';

const HomeScreen = () => {
  const user = useSelector(selectUser);

  const moodLog = useSelector(selectMoodLog);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserMoods(user.id));
    }
  }, [dispatch, user]);

  return (
    <SafeAreaView className="flex-1 bg-[#101010]">
      <StatusBar barStyle="light-content" backgroundColor="#101010" />
      <ScrollView className="bg-[#101010]">
        <View className="py-3 w-full">
          <View className="w-full p-3 pb-0">
            <TopBar />
          </View>
        </View>

        <View className="w-full">
          <HomeTabs tabs={tabs} />
          <ActiveTabs />

          <Professionals />
          {/* Mood Analysis */}
          <MoodAnalysis moods={moods} moodLog={moodLog} home={true} />

          {/* Loading Indicator */}

          {loading && (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
