import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { navigationRef } from '@controllers/utils/NavService.utils';
import MainStack from '@controllers/stacks/MainStack';
import { awsConfigure } from '@models/aws/configure.aws';

awsConfigure()
export const MainNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack />
    </NavigationContainer>
  );
}