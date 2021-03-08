import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import axios from 'axios';

const LOCATION_TASK_NAME = 'background-location-task';

export default function App() {
  const [permission, askForPermission] = Permissions.usePermissions(Permissions.LOCATION, { ask: true });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // if (!permission || permission.status !== 'granted') {
  //   return (
  //     <View>
  //       <Text>Permission is not granted</Text>
  //       <Button title="Grant permission" onPress={askForPermission} />
  //     </View>
  //   );
  // }

  useEffect(() => {
    onPress()
  }, []);

  onPress = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status === 'granted') {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        distanceInterval: 0,
        timeInterval: 100,
        pausesUpdatesAutomatically: false,
        // foregroundService: {
        //   // notificationTitle: 'Your title',
        //   // notificationBody: 'Notification Body'
        // },
      });
    }
  };


  return (
    <View style={styles.container}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data: { locations }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }

  await axios.post('http://10.0.0.122:3333/teste', {
    teste: locations[0]
  })
});