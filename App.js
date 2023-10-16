import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button } from "react-native";

const App = () => {
  const [imageUri, setImageUri] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState(getRandomColor());

  function getRandomColor() {
    const colors = ["#FF5733", "#F76D57", "#FEAA74", "#F2C5A4", "#FEDEA0"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  const handleButtonPress = (category) => {
    const timestamp = Date.now();
    let newImageUri = `https://source.unsplash.com/random/?${category}&timestamp=${timestamp}`;
    setImageUri(newImageUri);
    setBackgroundColor(getRandomColor());
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text>Choose a topic from below !</Text>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={{ height: 200, width: 200 }} />
      ) : null}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <Button
            title="Animals"
            onPress={() => handleButtonPress("animals")}
          />
        </View>
        <View style={styles.buttonRow}>
          <Button title="Plants" onPress={() => handleButtonPress("plants")} />
        </View>
        <View style={styles.buttonRow}>
          <Button
            title="Architecture"
            onPress={() => handleButtonPress("architecture")}
          />
        </View>
        <View style={styles.buttonRow}>
          <Button title="Food" onPress={() => handleButtonPress("food")} />
        </View>
        <View style={styles.buttonRow}>
          <Button title="Nature" onPress={() => handleButtonPress("nature")} />
        </View>
        <View style={styles.buttonRow}>
          <Button title="Random" onPress={() => handleButtonPress("random")} />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: "row",
    margin: 5,
  },
});

export default App;
