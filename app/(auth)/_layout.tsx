import React from 'react';
import {Stack} from 'expo-router';

type Props = {};

const AuthLayout = (props: Props) => {
  
  return (
    <Stack
      initialRouteName="onboarding"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="login" />
    </Stack>
  );
};

export default AuthLayout;
