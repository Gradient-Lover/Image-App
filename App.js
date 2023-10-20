import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const App = () => {
  const [imageUri, setImageUri] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState(getRandomColor());
  const [inputText, setInputText] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  const clearConfirmationRef = useRef();

  function getRandomColor() {
    const colors = ["#FF5733", "#F76D57", "#FEAA74", "#F2C5A4", "#FEDEA0"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  const handleGenerateButtonPress = () => {
    const timestamp = Date.now();
    const newImageUri = `https://source.unsplash.com/random/?${inputText}&timestamp=${timestamp}`;
    setImageUri(newImageUri);
    setBackgroundColor(getRandomColor());

    if (inputText && !searchHistory.includes(inputText)) {
      setSearchHistory([inputText, ...searchHistory]);
    }

    setInputText("");
  };

  const handleHistoryButtonPress = (index) => {
    const term = searchHistory[index];
    const timestamp = Date.now();
    const newImageUri = `https://source.unsplash.com/random/?${term}&timestamp=${timestamp}`;
    setImageUri(newImageUri);
    setBackgroundColor(getRandomColor());

    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);
    setSearchHistory(updatedHistory);
  };

  const handleClearHistory = () => {
    clearConfirmationRef.current.show();
  };

  const confirmClearHistory = () => {
    setSearchHistory([]);
    clearConfirmationRef.current.hide();
  };

  const cancelClearHistory = () => {
    clearConfirmationRef.current.hide();
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text>
        Enter a topic and click "Generate" to load an image. To switch quickly
        between pictures, tap on one of your recent searches.
      </Text>

      <ImageBackground
        source={{
          uri: "https://wixmp-fe53c9ff592a4da924211f23.wixmp.com/users/445e27e7-313d-44ba-88f6-cc55bf526d21/design-previews/520f30a7-9bba-4659-bc46-400366c45511/1697830241523-thumbnail.jpeg",
        }}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={[styles.image, { height: 200, width: 200 }]}
          />
        ) : (
          <Image
            source={{
              uri: "https://wixmp-fe53c9ff592a4da924211f23.wixmp.com/users/445e27e7-313d-44ba-88f6-cc55bf526d21/design-previews/520f30a7-9bba-4659-bc46-400366c45511/1697830241523-thumbnail.jpeg",
            }}
            style={[styles.image, { height: 200, width: 200 }]}
          />
        )}
      </ImageBackground>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setInputText(text)}
          value={inputText}
          placeholder="Enter a topic..."
        />
        <Button
          title="Generate"
          onPress={handleGenerateButtonPress}
          disabled={!inputText}
        />
      </View>
      <Text style={styles.historyTitle}>History:</Text>
      <ScrollView style={styles.historyContainer}>
        {searchHistory.map((term, index) => (
          <View key={index} style={styles.historyItem}>
            <TouchableOpacity onPress={() => handleHistoryButtonPress(index)}>
              <Text style={styles.historyText}>{term}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleHistoryButtonPress(index)}
            >
              <Icon name="times" size={20} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {searchHistory.length > 0 && (
        <TouchableOpacity onPress={handleClearHistory}>
          <Text style={styles.clearHistoryText}>Clear</Text>
        </TouchableOpacity>
      )}
      <StatusBar style="auto" />
      <ClearConfirmationDialog
        ref={clearConfirmationRef}
        onConfirm={confirmClearHistory}
        onCancel={cancelClearHistory}
      />
    </View>
  );
};

const ClearConfirmationDialog = React.forwardRef(
  ({ onConfirm, onCancel }, ref) => {
    const show = () => {
      Alert.alert(
        "Clear recent searches",
        "Are you sure you want to delete your history?",
        [
          {
            text: "Cancel",
            onPress: onCancel,
            style: "cancel",
          },
          { text: "Clear", onPress: onConfirm },
        ],
        { cancelable: false }
      );
    };

    React.useImperativeHandle(ref, () => ({
      show: show,
      hide: () => {},
    }));

    return null;
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 200,
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
    marginRight: 10,
  },
  historyContainer: {
    marginTop: 10,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyText: {
    fontSize: 16,
    marginVertical: 5,
  },
  deleteButton: {
    padding: 10,
  },
  clearHistoryText: {
    fontSize: 16,
    marginVertical: 10,
    color: "blue",
  },
});

export default App;
