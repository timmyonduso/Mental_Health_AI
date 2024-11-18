import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentTab, setProfessional } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import { professionalsData } from '../hooks/Database';
import { useTheme } from '../../themeContext';

const Professionals = () => {
  const currentTab = useSelector(selectCurrentTab);
  const {theme} = useTheme();
  const filteredProfessionals = professionalsData.filter(
    (professional) => professional.activeTab === currentTab.title
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const renderProfessional = ({ item }) => (
    <TouchableRipple
      onPress={() => {
        dispatch(
          setProfessional({
            id: item.userId,
          })
        );
        navigation.navigate('ProfessionalDetails');
      }}
      className={`${theme === 'dark' ? 'bg-[#202020]' : 'bg-gray-50 border border-gray-100'} rounded-lg overflow-hidden mr-3 p-3 w-48`}
      rippleColor="#999999"
    >
      <View className="items-center">
        <Image
          source={{ uri: item.imageUrl }}
          className="w-20 h-20 rounded-full mb-2"
        />
        <Text className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-lg font-semibold`}>{item.name}</Text>
        <Text className="text-orange-600 text-sm">{item.profession}</Text>
        <Text className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-center text-sm mt-1`}>
          {item.description}
        </Text>
      </View>
    </TouchableRipple>
  );

  return (
    <View className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'} flex-1 p-3`}>
      <Text className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-2xl font-semibold mb-4`}>
        Our Professionals
      </Text>

      {filteredProfessionals.length > 0 ? (
        <FlatList
          data={filteredProfessionals}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderProfessional}
          keyExtractor={(item) => item.userId}
        />
      ) : (
        <Text className="text-gray-400 text-center text-lg mt-5">
          No professionals available in this category.
        </Text>
      )}
    </View>
  );
};

export default Professionals;
