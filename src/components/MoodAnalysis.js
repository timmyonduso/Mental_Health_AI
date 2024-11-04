// MoodAnalysis.js
import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const MoodAnalysis = ({ moods, moodLog, home }) => {
  const moodFrequencyData = moods.map(mood => (
    moodLog.filter(log => log.mood === mood.value).length
  ));

  return (
    <View className="p-3 pt-0 w-full justify-center items-center">
        {home === false &&(
      <Text className="w-full text-start text-white text-xl font-semibold mb-2 pt-3">Mood Analysis</Text>

        )}
      <LineChart
        data={{
          labels: moods.map(mood => mood.label.split(" ")[1]), // Use mood labels
          datasets: [{ data: moodFrequencyData }]
        }}
        width={screenWidth - 20} // Adjust for padding
        height={220}
        chartConfig={{
          backgroundColor: '#101010',
          backgroundGradientFrom: '#1f1f1f',
          backgroundGradientTo: '#1f1f1f',
          color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: { borderRadius: '4px' },
          propsForDots: { r: '6', strokeWidth: '2', stroke: '#ffa726' }
        }}
        bezier
        style={{ borderRadius: '8px' }}
      />
    </View>
  );
};

export default MoodAnalysis;
