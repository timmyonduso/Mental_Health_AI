import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Image,
} from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/navSlice';
import { Ionicons } from '@expo/vector-icons';
import TopBarTwo from '../components/TopBarTwo';

const ProfessionalScreen = () => {
  const [resume, setResume] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Get the logged-in user from Redux store
  const user = useSelector(selectUser);

  const handleSubmit = async () => {
    if (!resume || !description) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const newProfessional = {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        resume,
        description,
        status: false,
      };

      // Send data to MongoDB through the backend server
      const response = await fetch('http://localhost:3000/professionals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProfessional),
      });

      if (response.ok) {
        Alert.alert('Success', 'Professional profile created successfully!');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Could not create professional profile.');
      }
    } catch (error) {
      console.error('Error adding professional:', error);
      Alert.alert('Error', 'Could not create professional profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <StatusBar barStyle="light-content" backgroundColor="#101010" />
        <View className="w-full p-3 pt-6 bg-[#101010]">
          <TopBarTwo title="Become a Professional" />
        </View>
        <View className="bg-[#101010] justify-center items-center w-full p-3">
          <View className="p-4 bg-[#202020] rounded-lg mt-3 w-full">
            <View className="justify-center items-center">
              {user?.profilePicture ? (
                <Image
                  resizeMode="contain"
                  source={{ uri: user.profilePicture }}
                  className="w-32 h-32 rounded-full"
                />
              ) : (
                <View className="w-32 h-32 rounded-full bg-[#303030] justify-center items-center">
                  <Ionicons name="person-outline" size={40} color={'#e5e7eb'} />
                </View>
              )}
              <Text className="text-gray-400 text-xl mt-1">
                {user?.firstName} {user?.lastName}
              </Text>
              <Text className="text-gray-400">{user?.email}</Text>
            </View>
          </View>

          <Text className="text-gray-100 font-medium text-lg text-center pt-8">
            Create Your Professional Profile
          </Text>
        </View>

        <View style={{ padding: 16 }}>
          <TextInput
            placeholder="Enter Resume Link"
            className="mt-3 h-14 px-3 border border-gray-300 rounded-md text-lg"
            value={resume}
            onChangeText={setResume}
          />
          <TextInput
            placeholder="Enter Professional Description"
            className="mt-3 h-32 px-3 py-2 border border-gray-300 rounded-md text-lg"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top" // This ensures the text starts from the top
          />

          <TouchableRipple
            onPress={handleSubmit}
            style={{
              marginTop: 12,
              backgroundColor: '#101010',
              justifyContent: 'center',
              alignItems: 'center',
              height: 56,
              borderRadius: 8,
            }}
            rippleColor={'#707070'}
            disabled={loading}
          >
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{ color: '#ffffff', fontSize: 18, fontWeight: '600' }}
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </Text>
            </View>
          </TouchableRipple>
        </View>

        <Modal transparent={true} animationType="fade" visible={loading}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={{ color: '#ffffff', marginTop: 10 }}>
              Please wait...
            </Text>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfessionalScreen;
