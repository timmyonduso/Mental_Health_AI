// MoodScreen.js
import { View, SafeAreaView, ScrollView, StatusBar, Vibration } from 'react-native';
import React, { useState } from 'react';
import MoodSelection from '../components/MoodSelection';
import MoodHistory from '../components/MoodHistory';
import MoodAnalysis from '../components/MoodAnalysis';
import TopBarTwo from '../components/TopBarTwo';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/navSlice';
import { moods } from '../hooks/Database';

const MoodScreen = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodLog, setMoodLog] = useState([]);
  const [note, setNote] = useState('');
  const user = useSelector(selectUser);

  const handleMoodSubmit = () => {
    if (selectedMood) {
      const newLog = {
        mood: selectedMood,
        note: note.trim(),
        timestamp: new Date(),
        uid:user.id,
      };
      setMoodLog([newLog, ...moodLog]);
      setSelectedMood(null);
      setNote('');
    }
  };
  const handleMoodSelect = (moodValue) => {
    setSelectedMood(moodValue);
    Vibration.vibrate(77);
  };
  
  return (
    <SafeAreaView className="flex-1 bg-[#101010]">
      <StatusBar barStyle="light-content" backgroundColor="#101010" />
      <View className="w-full p-3 pt-6">
        <TopBarTwo title="Mood Tracker" />
      </View>
      
      <ScrollView className="bg-[#101010] py-3 w-full">
        {/* Mood Selection */}
        <MoodSelection 
          moods={moods} 
          selectedMood={selectedMood} 
          setSelectedMood={handleMoodSelect} 
          note={note} 
          setNote={setNote} 
          handleMoodSubmit={handleMoodSubmit} 
        />
         {/* Mood Analysis */}
         <MoodAnalysis moods={moods} moodLog={moodLog} home={false} />
         
        {/* Mood History */}
        <MoodHistory moodLog={moodLog} moods={moods} />

       
      </ScrollView>
    </SafeAreaView>
  );
};

export default MoodScreen;
