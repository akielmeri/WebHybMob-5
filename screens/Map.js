import { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Map(props) {
  const [markers, setMarkers] = useState([]);

  const addMarker = (event) => {
    const coords = event.nativeEvent.coordinate;
    setMarkers((currentMarkers) => [...currentMarkers, coords]);
  };

  const deleteMarker = (index) => {
    setMarkers((currentMarkers) =>
      currentMarkers.filter((_, i) => i !== index)
    );
  };

  return (
    <MapView
      style={styles.map}
      region={props.location}
      mapType={props.mapType}
      onLongPress={addMarker}
      showsUserLocation={true}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
        >
          <Callout>
            <View style={styles.callout}>
              <Text>{`Marker ${index + 1}`}</Text>
              <Pressable onPress={() => deleteMarker(index)}>
                <Icon name="delete" size={24} color="red" />
              </Pressable>
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
  callout: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
