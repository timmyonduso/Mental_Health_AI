import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

const MoodHistory = ({ moodLog, moods, onDeleteMood }) => {
  const confirmDelete = (logId) => {
    Alert.alert(
      'Delete Mood',
      'Are you sure you want to delete this mood entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => onDeleteMood(logId),
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View className="p-3 w-full justify-center items-center">
      <Text className="w-full text-start text-white text-xl font-semibold mb-2">
        Mood History
      </Text>
      {moodLog?.length > 0 ? (
        moodLog.map((log, index) => (
          <View key={index} className="p-3 w-full mb-2 bg-[#202020] rounded-lg">
            <Text className="text-white">
              {moods.find((m) => m.value === log.mood)?.label || log.mood}
            </Text>
            {log.note && <Text className="text-gray-400 mt-1">{log.note}</Text>}
            <Text className="text-gray-400 text-xs mt-1">
              {new Date(log.timestamp).toLocaleDateString()} -{' '}
              {new Date(log.timestamp).toLocaleTimeString()}
            </Text>

            <TouchableOpacity
              onPress={() => confirmDelete(log._id)}
              className="mt-2 bg-red-600 p-2 rounded-md"
            >
              <Text className="text-white text-center">Delete</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text className="text-gray-400">
          No mood logs yet. Start tracking your mood today!
        </Text>
      )}
    </View>
  );
};

export default MoodHistory;
