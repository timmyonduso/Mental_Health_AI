import React from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { TouchableRipple } from 'react-native-paper';
import { selectProfessional } from '../slices/navSlice';
import { professionalsData } from '../hooks/Database';
import TopBarTwo from '../components/TopBarTwo';

const ProfessionalDetailsScreen = () => {
  const professional = useSelector(selectProfessional);
  const filteredProfessionalDetails = professionalsData.find(
    (professionalDetails) => professionalDetails.userId === professional.id
  );

  console.log('Prof data: ', filteredProfessionalDetails);

  if (!filteredProfessionalDetails) return null;

  return (
    <View className="flex-1 bg-[#101010] ">
      <StatusBar barStyle="light-content" backgroundColor="#101010" />
      <View className="w-full p-3 pt-6 pb-4 bg-[#101010]">
        <TopBarTwo title="Professional Details" />
      </View>
      <View className="bg-[#202020] rounded-lg p-4 m-3">
        <View className="items-center mb-4">
          <Image
            source={{ uri: filteredProfessionalDetails.imageUrl }}
            className="w-24 h-24 rounded-full mb-2"
          />
          <Text className="text-white text-xl font-semibold">
            {filteredProfessionalDetails.name}
          </Text>
          <Text className="text-orange-600 text-base">
            {filteredProfessionalDetails.profession}
          </Text>
        </View>
        <Text className="text-gray-400 text-center text-sm mb-4">
          {filteredProfessionalDetails.description}
        </Text>

        <TouchableRipple
          onPress={() =>
            console.log('Contacting', filteredProfessionalDetails.name)
          }
          className="bg-orange-600 p-3 rounded-lg mt-4"
          rippleColor="#FF8C42"
        >
          <Text className="text-white text-center text-lg">Contact</Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

export default ProfessionalDetailsScreen;
