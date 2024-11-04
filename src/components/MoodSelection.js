// MoodSelection.js
import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

const MoodSelection = ({ moods, selectedMood, setSelectedMood, note, setNote, handleMoodSubmit }) => {
  return (
    <View className="p-3 mt-2">
      <Text className="text-white text-xl font-semibold mb-2">How are you feeling today?</Text>
      
      <View className="flex-row flex-wrap">
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.value}
            className={`flex-grow p-3 m-1 rounded-lg ${selectedMood === mood.value ? 'bg-[#ea580c]' : 'bg-[#202020]'}`}
            onPress={() => setSelectedMood(mood.value)}
            style={{ minWidth: '25%' }} // Ensures buttons have a minimum width
          >
            <Text className="text-white text-center">{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Optional Note Section */}
      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder="Add a note (optional)"
        placeholderTextColor="#808080"
        className="w-full mt-4 p-3 bg-[#202020] text-white rounded-lg"
      />
      
      {/* Submit Button */}
      <TouchableRipple rippleColor={'#202020'} onPress={handleMoodSubmit} className="mt-4 p-3 py-4 bg-[#ea580c] rounded-lg">
        <View>
          <Text className="text-center text-lg font-medium text-white">Log Mood</Text>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default MoodSelection;
