import { View, Text, StyleSheet, Image, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import Colors from "../../../constants/Colors";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import Button from "../../../components/ButtonComponent";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import * as ImagePicker from 'expo-image-picker';

const CreateProductScreen = () => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState('');

    const { id } = useLocalSearchParams();
    const isUpdating = !!id;

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const validateInput = () => {
    setErrors("");
    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price should be a number");
      return false;
    }
    return true;
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }
    console.warn("Create Product ", name);

    resetFields();
  };

  const onUpdate = () => {
    if (!validateInput()) {
      return;
    }
    console.warn("Update Product ", name);

    resetFields();
  };

  const onSubmit = () => {
    if(isUpdating) {
        onUpdate();
    } else {
        onCreate();
    }
  };

  const onDelete = () => {
    console.warn("Delete Product");
  }

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete", [{
        text: "Cancel",
      }, {
        text: "Delete",
        style: 'destructive',
        onPress: onDelete,
    }])
  }

  return (
    <View style={styles.container}>
        <Stack.Screen options={{ title: !isUpdating? 'Create product' : 'Edit product' }} />
    
      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Margarita..."
        style={styles.input}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />

      {errors && <Text style={styles.error}>{errors}</Text>}

      <Button text={`${!isUpdating ? 'Create' : 'Update'}`} onPress={onSubmit} />
      { isUpdating && (
        <Text style={styles.textButton} onPress={confirmDelete}> Delete </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  label: {
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});

export default CreateProductScreen;
