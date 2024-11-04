import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native'; // Import Linking
import { useSelector } from 'react-redux';
import { selectCurrentTab } from '../slices/navSlice';

const ActiveTabs = () => {
  const currentTab = useSelector(selectCurrentTab);

  // Example data resources for each tab
  const resources = {
    'Mood Tracker': [
      { title: "Understanding Your Emotions", description: "Track and understand the patterns in your mood.", link: "https://mentalhealth.org/mood-tracker" },
      { title: "Daily Mood Journal", description: "Log your feelings and see your progress.", link: "https://moodjournal.org" },
    ],
    'Meditation': [
      { title: "Guided Meditation for Relaxation", description: "A calming guide to reduce stress and anxiety.", link: "https://meditationguide.com/relaxation" },
      { title: "Mindfulness Basics", description: "Learn the basics of mindfulness and its benefits.", link: "https://mindful.org/mindfulness" },
    ],
    'Relationships': [
      { title: "Building Healthy Relationships", description: "Tips on maintaining strong relationships.", link: "https://relationshiphealth.org" },
      { title: "Conflict Resolution Strategies", description: "Learn how to manage conflicts effectively.", link: "https://conflictresolution.com" },
    ],
    'Students': [
      { title: "Student Mental Health Support", description: "Resources for managing academic stress.", link: "https://studenthealth.org/support" },
      { title: "Time Management for Students", description: "Improve productivity with these tips.", link: "https://studentproductivity.com" },
    ],
  };

  // Combine all resources into a single array for fallback
  const allResources = Object.values(resources).flat();

  const activeResources = resources[currentTab?.title] || allResources; // Show all resources if none found for current tab

  return (
    <ScrollView className="p-3 pb-0 bg-[#101010]">
      <Text className="text-white text-2xl font-bold mb-4">{currentTab?.title || 'Resources'}</Text>
      
      {activeResources.length > 0 ? (
        activeResources.map((resource, index) => (
          <View key={index} className="mb-3 p-4 bg-[#202020] rounded-lg">
            <Text className="text-white text-lg font-semibold">{resource.title}</Text>
            <Text className="text-gray-400 mb-2">{resource.description}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(resource.link)}>
              <Text className="text-[#ea580c]">Learn More</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text className="text-gray-400">No resources available for this topic.</Text>
      )}
    </ScrollView>
  );
};

export default ActiveTabs;
