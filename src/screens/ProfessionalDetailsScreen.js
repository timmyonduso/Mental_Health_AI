import React from 'react';
import { View, Text, Image, StatusBar, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { TouchableRipple } from 'react-native-paper';
import { selectProfessional } from '../slices/navSlice';
import { professionalsData } from '../hooks/Database';
import TopBarTwo from '../components/TopBarTwo';
import { useTheme } from '../../themeContext';

const ProfessionalDetailsScreen = () => {
  const professional = useSelector(selectProfessional);
  const { theme } = useTheme();

  const filteredProfessionalDetails = professionalsData.find(
    (professionalDetails) => professionalDetails.userId === professional.id
  );

  console.log('Prof data: ', filteredProfessionalDetails);

  if (!filteredProfessionalDetails) return null;

  return (
    <SafeAreaView className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'} flex-1 `}>
    <StatusBar barStyle={`${theme === 'dark' ? 'light-content' : 'dark-content'}`} backgroundColor={`${theme === 'dark' ? '#101010' : '#ffffff'}`} />
     <View className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'} w-full p-3 pt-6 pb-4 `}>
        <TopBarTwo title="Professional Details" />
      </View>
      <View className={`${theme === 'dark' ? 'bg-[#202020]' : 'bg-gray-100 border border-gray-200'} rounded-lg p-4 m-3`}>
        <View className="items-center mb-4">
          <Image
            source={{ uri: filteredProfessionalDetails.imageUrl }}
            className="w-24 h-24 rounded-full mb-2"
          />
          <Text className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-xl font-semibold`}>
            {filteredProfessionalDetails.name}
          </Text>
          <Text className="text-orange-600 text-base">
            {filteredProfessionalDetails.profession}
          </Text>
        </View>
        <Text className={`${theme==='dark' ? 'text-gray-400' : 'text-gray-600'} text-center text-sm mb-4`}>
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
    </SafeAreaView>
  );
};

export default ProfessionalDetailsScreen;
