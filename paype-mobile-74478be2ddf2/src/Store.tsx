import React, { useEffect } from 'react';
import { StatusBar, LogBox, NativeModules } from 'react-native';
import { Provider } from 'react-redux';

import { MainNavigator } from '@controllers/MainNavigator';
import { SnackBar } from '@views/components/functional/SnackBar';
import store from '@models/redux/store';
import NetInfoAlert from '@utilis/plugins/NetInfo.plugin'
import MergeInterceptors from '@models/api/MergeInterceptors';
import colors from '@config/colors.config';
import design from '@config/design.config';
import '@config/lang.config';
import { checkPermission, onMessageStates } from '@utilis/plugins/Firebase.plugin';
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'ViewPropTypes will be removed from React Native.'
]);

MergeInterceptors()
export default () => {

  useEffect(() => {
    checkPermission()
    onMessageStates(true)
  }, [])

  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent={true}
      />
      <MainNavigator />
      <NetInfoAlert />
      <SnackBar
        successTimeout={design.SNACKBAR_SUCCESS}
        failureTimeout={design.SNACKBAR_FAILURE}
      />
    </Provider>
  );
};