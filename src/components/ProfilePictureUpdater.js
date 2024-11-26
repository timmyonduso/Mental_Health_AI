import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../slices/navSlice';
import apiRequest from '../utils/api';

const ProfilePictureUpdater = ({ closeModal }) => {
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // Function to pick an image from the user's gallery
  const pickImage = async () => {
    // Request camera roll permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission denied',
        'Please allow access to your photo library.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log('result: ', result);

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Function to upload the selected image to Cloudinary
  const uploadImageToCloudinary = async () => {
    if (!imageUri) {
      Alert.alert('Error', 'Please select an image first!');
      return;
    }

    setLoading(true); // Show loader when upload starts

    const data = new FormData();
    const fileType = imageUri.split('.').pop(); // Get file extension
    const mimeType = `image/${fileType}`; // Set mimeType dynamically based on extension

    // Prepare the file object for Cloudinary upload
    data.append('file', {
      uri: imageUri,
      type: mimeType,
      name: `profile_${Date.now()}.${fileType}`,
    });
    data.append('upload_preset', 'serenityApp');
    data.append('cloud_name', 'victorkib');
    data.append('folder', 'profile_pictures'); // Specify folder in Cloudinary

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/victorkib/upload',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const imageUrl = response.data.secure_url;
      console.log('Uploaded image URL:', imageUrl);

      // Update the user's profile picture URL in the backend
      const backendResponse = await apiRequest.patch(
        `/auth/updateUser/${user?._id}`,
        {
          profilePicture: imageUrl,
        }
      );
      if (backendResponse.status) {
        // Save the new profile picture URL in Redux
        dispatch(
          setUser({
            ...user,
            profilePicture: imageUrl,
          })
        );
      }
      closeModal();
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      Alert.alert('Error', 'There was an error uploading the image');
    } finally {
      setLoading(false); // Hide loader after upload finishes
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>
        Update Profile Picture
      </Text>

      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 75,
            marginBottom: 20,
          }}
        />
      ) : (
        <View
          style={{
            width: 150,
            height: 150,
            borderRadius: 75,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
            marginBottom: 20,
          }}
        >
          <Ionicons name="person-outline" size={50} color="gray" />
        </View>
      )}

      <TouchableOpacity onPress={pickImage} style={{ marginBottom: 20 }}>
        <Text style={{ color: 'blue', fontSize: 18 }}>Pick an Image</Text>
      </TouchableOpacity>

      {/* Show loader if uploading */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity onPress={uploadImageToCloudinary}>
          <Text style={{ color: 'green', fontSize: 18 }}>
            Upload to Cloudinary
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProfilePictureUpdater;
