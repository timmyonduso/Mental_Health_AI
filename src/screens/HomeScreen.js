import { View, Text, SafeAreaView, StatusBar, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import TopBar from '../components/TopBar'
import HomeQuestions from '../components/HomeQuestions';
import HomeTabs from '../components/HomeTabs';
import MoodAnalysis from '../components/MoodAnalysis';
import { moodLog, moods, questions, tabs } from '../hooks/Database';
import ActiveTabs from '../components/ActiveTabs';

const HomeScreen = () => {
  
 
  return (
    <SafeAreaView className="flex-1 bg-[#101010]">
      <ScrollView className='bg-[#101010]'>
    <View className=' py-3 w-full'>
      <StatusBar barStyle="light-content" backgroundColor="#101010" />
      <View className='w-full p-3 pb-0'>
      <TopBar />
      
      </View>
    </View>
    <View className=' w-full '>
      <Text></Text>
      <HomeTabs tabs={tabs} />
      <ActiveTabs/>
       {/* Mood Analysis */}
       <MoodAnalysis moods={moods} moodLog={moodLog} home={true}/>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen