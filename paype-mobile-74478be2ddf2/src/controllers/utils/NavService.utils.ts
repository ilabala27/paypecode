import * as React from 'react';
import { CommonActions, NavigationContainerRef, } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

/**
 * @returns {null}
 */
function canGoBack() {
  return navigationRef.current?.canGoBack();
}

/**
 * @returns {null}
 */
function goBack() {
  if (canGoBack()) return navigationRef.current?.goBack();
}

/**
 * @param {string} name The name of the route to navigate to.
 * @param {object} params Route parameters.
 * @returns {null}
 */
function navigate(name: string, params: object = {}) {
  return navigationRef.current?.navigate(name, params);
}

/**
 * @param {string} name The name of the route to push to.
 * @param {object} params Route parameters.
 * @returns {null}
 */
function dispatchPush(name: string, params?: object) {
  return navigationRef.current?.dispatch(StackActions.push(name, params));
}

/**
 * @param {number} count Number of Pop have to perform when execution.
 * @returns {null}
 */
function dispatchPop(count: number = 1) {
  return navigationRef.current?.dispatch(StackActions.pop(count));
}

/**
 * @param {string} name The name of the route to navigate to.
 * @param {object} params Route parameters.
 * @returns {null}
 */
function navigateAndReset(name: string, params?: object) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name, params }],
    }),
  );
}


export default {
  navigationRef,
  canGoBack,
  goBack,
  navigate,
  dispatchPush,
  dispatchPop,
  navigateAndReset,
};