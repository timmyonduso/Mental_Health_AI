// MoodHistory.js
import React from 'react';
import { View, Text } from 'react-native';

const MoodHistory = ({ moodLog, moods }) => {
  return (
   <View className="p-3 w-full justify-center items-center">
      <Text className="w-full text-start text-white text-xl font-semibold mb-2">Mood History</Text>
      {moodLog.length > 0 ? (
        moodLog.map((log, index) => (
          <View key={index} className="p-3 w-full mb-2 bg-[#202020] rounded-lg">
            <Text className="text-white">{moods.find(m => m.value === log.mood)?.label || log.mood}</Text>
            {log.note ? <Text className="text-gray-400 mt-1">{log.note}</Text> : null}
            <Text className="text-gray-400 text-xs mt-1">
              {log.timestamp.toLocaleDateString()} - {log.timestamp.toLocaleTimeString()}
            </Text>
          </View>
        ))
      ) : (
        <Text className="text-gray-400">No mood logs yet. Start tracking your mood today!</Text>
      )}
    </View>
  );
};

export default MoodHistory;
