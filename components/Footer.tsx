import React from "react";
import { View, ActivityIndicator } from "react-native";

export default function Footer() {
    return (
        <View
            style={{
                position: 'relative',
                marginTop: 10,
                marginBottom: 10,
            }}
        >
            <ActivityIndicator 
                color={'#367edb'} 
                animating 
                size="large" 
            />
        </View>
    );
}