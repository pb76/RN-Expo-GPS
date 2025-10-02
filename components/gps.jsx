import { StyleSheet, Text, View, Button } from "react-native";
import { useState } from "react";
//https://docs.expo.dev/versions/latest/sdk/location/
import * as Location from "expo-location";

export default function GPS() {
  const [gpsGranted, setGpsGranted] = useState(true);
  const [location, setLocation] = useState(null);

  const hamtaGPS = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission denied");
        setGpsGranted(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location);
    } catch (error) {
      console.log("Error fetching GPS coordinates:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Här kommer vi visa GPS-koordinater:</Text>
      {!gpsGranted && <Text>GPS-tillstånd nekades</Text>}
      {location && (
        <View>
          <Text>Latitude: {location.coords.latitude}</Text>
          <Text>Longitude: {location.coords.longitude}</Text>
        </View>
      )}
      <Button title="Hämta GPS-koordinater" onPress={hamtaGPS} />
    </View>
  );
}

const styles = StyleSheet.create({});
