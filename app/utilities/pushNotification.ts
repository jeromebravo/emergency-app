import * as Notifications from 'expo-notifications';

export const registerForPushNotificationAsync = async () => {
  let token = null;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') return token;

  token = (await Notifications.getExpoPushTokenAsync()).data;

  return token;
}

export const sendPushNotification = async (
  title: string,
  body: string,
  expoPushToken: string
) => {
  try {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title,
      body,
      data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

  } catch (err) {
    console.log(err);
  }
}