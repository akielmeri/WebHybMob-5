import { SafeAreaView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Map from "./screens/Map.js";
import MainAppBar from "./components/MainAppBar.js";
import * as Location from "expo-location";
import { PaperProvider } from "react-native-paper";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;

const settings = {
  backgroundColor: "#ff6347",
};

const icons = {
  locationNotKnown: "crosshairs",
  locationKnown: "crosshairs-gps",
  locationSearching: "crosshairs-question",
};

export default function App() {
  const [icon, setIcon] = useState(icons.locationNotKnown);
  const [mapType, setMapType] = useState("standard");
  const [location, setLocation] = useState({
    latitude: 65.01,
    longitude: 25.47,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1 * ASPECT_RATIO,
  });
  useEffect(() => {
    getLocation();
  }, []);

  const toggleMapType = () => {
    setMapType((prevMapType) =>
      prevMapType === "standard" ? "hybrid" : "standard"
    );
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    setIcon(icons.locationSearching);
    let location = await Location.getCurrentPositionAsync({});
    setIcon(icons.locationKnown);
    const latDelta = 0.01; // zoomataan karttaa
    const lonDelta = latDelta * ASPECT_RATIO;
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: latDelta,
      longitudeDelta: lonDelta,
    });
  };

  return (
    <PaperProvider>
      <MainAppBar
        title="Map App"
        backgroundColor={settings.backgroundColor}
        icon={icon}
        getLocation={getLocation}
        toggleMapType={toggleMapType}
      />
      <SafeAreaView>
        <Map location={location} mapType={mapType} />
      </SafeAreaView>
    </PaperProvider>
  );
}
