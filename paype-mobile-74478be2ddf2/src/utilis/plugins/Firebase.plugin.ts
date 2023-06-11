import store from '@models/redux/store';
import { systemActions } from '@models/redux/system/system.slice';
import messaging from '@react-native-firebase/messaging'
import { onDisplayNotification } from '@views/components/functional/Notification';


const _log = true


function checkPermission() {
  _log && console.log("Checking Notification Permission..")
  messaging().hasPermission().then((enabled: any) => {
    if (enabled && enabled != -1) registerToken()
    else requestPermission()
  })
    .catch((err: any) => console.log("1.", err));
}

function requestPermission() {
  messaging().requestPermission().then(() => {
    _log && console.log("Notification Permission Granted")
    registerToken()
  })
    .catch((err: any) => console.log("2.", err));
}

function registerToken() {
  messaging().getToken().then(async (fcmToken: any) => {
    if (fcmToken) {
      store.dispatch(systemActions.setSystemStore({ fcm: fcmToken }))
      _log && console.log(`Notification Token Registered ${'\n'}`, fcmToken)
    }
  })
    .catch((err: any) => console.log("3.", err));
}

//Foreground, Background - Active, Background - Inactive
function onMessageStates(log: any) {
  messaging().onMessage((foreground: any) => {
    if (foreground) {
      (_log || log) && console.log(`Foreground Notification Triggered: ${'\n'}`, foreground)
      trigger('foreground', foreground)
    }
  })

  messaging().onNotificationOpenedApp((backgroundActive: any) => {
    if (backgroundActive) {
      (_log || log) && console.log(`Background Active Notification Triggered: ${'\n'}`, backgroundActive)
      trigger('backgroundActive', backgroundActive)
    }
  })

  messaging().getInitialNotification().then((backgroundInActive: any) => {
    if (backgroundInActive) {
      (_log || log) && console.log(`Background InActive Notification Triggered: ${'\n'}`, backgroundInActive)
      trigger('backgroundInActive', backgroundInActive)
    }
  })
}


//Trigger
function trigger(type: string, notification: any) {
  const { title, body } = notification?.notification
  if (type == 'foreground') {
    onDisplayNotification({ title, body })
    return
  }
  onDisplayNotification({ title, body })
  console.log("Trigger Else", type, notification)
}

export {
  checkPermission,
  requestPermission,
  registerToken,
  onMessageStates,
}