import { View, Text, SafeAreaView, StatusBar, Image, ScrollView } from 'react-native'
import React from 'react'
import SignInWithGoogle from '../components/SignInWithGoogle'
import { TextInput } from 'react-native'
import { TouchableRipple } from 'react-native-paper'

const LoginScreen = () => {

  return (
    <SafeAreaView>
      <ScrollView>
        <StatusBar barStyle="light-content" backgroundColor="#101010"  />
        <View className='bg-[#101010] justify-center items-center w-full'>
          <Image
          className='w-64 h-64'
          resizeMode='contain'
            source={require('./../../assets/loginImage.png')}
          />

          <Text className='text-gray-100 font-medium text-base w-3/4 text-center pb-4'>New to Mental Health AI? Sign in to get started with the App!</Text>
          
        </View>   

        <View>
          <View className='p-3'>
          <Text className='text-3xl font-bold my-2'>Sign in Here</Text>
          <TextInput
              placeholder='Enter Email Address'
              className="mt-3 h-14 px-3 border border-gray-300 rounded-md text-lg "

            />
            <TextInput
              placeholder='Enter Your Password'
              className="mt-3 h-14 px-3 border border-gray-300 rounded-md text-lg"

            />

            <TouchableRipple 
            onPress={()=>[]} 
            className='mt-3 bg-[#101010] justify-center items-center w-full h-14 rounded-md'
            rippleColor={'#707070'}
            >
              <View className='w-full justify-center items-center'>
                <Text className='text-white text-xl font-semibold'>Sign in</Text>
              </View>
            </TouchableRipple>
          </View>
          <View className='flex-row justify-center items-center gap-2 w-full px-3 py-4'>
            <View className='h-[1px] bg-gray-300 flex-1'/>
            <Text className='text-gray-600  text-base'>OR</Text>
            <View className='h-[1px] bg-gray-300 flex-1'/>

          </View>


          <SignInWithGoogle/>

          <View className='px-3 items-center w-full py-4 '>
            <Text className='text-sm text-gray-500 text-center w-[90%]  '>
              Have no Account? <Text className='text-black font-semibold'>Sign Up here</Text>
            </Text>
            <Text className='text-sm text-gray-500 text-center w-[90%]  '>
              By signing up, you agree to our Terms & Conditions, acknowledge our Privacy Policy and confirm that you are over 18. 
            </Text>
          </View>
        </View>  
        
        </ScrollView> 
    </SafeAreaView>
  )
}

export default LoginScreen