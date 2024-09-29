import { Appbar } from "react-native-paper";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function MainAppBar(props) {
    return (
        <Appbar.Header style={{ backgroundColor: props.backgroundColor }}>
            <View style={styles.sideContainer}>
                <Appbar.BackAction onPress={() => {}} />
            </View>

            <View style={styles.titleContainer}>
                <Appbar.Content title={props.title} titleStyle={styles.title} />
            </View>

            <View style={styles.sideContainer}>
                <Appbar.Action icon={props.icon} onPress={props.getLocation} />
                <Appbar.Action icon="map" onPress={props.toggleMapType} />
            </View>
        </Appbar.Header>
    );
}

const styles = StyleSheet.create({
    sideContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    titleContainer: {
        flex: 2,
        flexDirection: 'row',
    },
    title: {
        textAlign: 'center',
    },
});
