/**
File from Optional AI in Mobile Development Final Project
Author: Carlos Francisco Gonzalez Mantilla
UNAB 2025
Available in Expo: https://snack.expo.dev/WWPLMy57LnyHDymgI6enR?platform=android 
**/

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

export default function App() {
  const [features, setFeatures] = useState({
    Distancia: 50,
    habitaciones: 3,
    Banos: 2,
    Carros: 1,
    AreaCons: 200,
    AreaNoConstruida: 100,
  });
  const [predictedPrice, setPredictedPrice] = useState(null);

  const handlePredict = async () => {
    try {
      console.log('hice clic');
      console.log(JSON.stringify(features));
      const response = await fetch('http://ec2-3-80-199-116.compute-1.amazonaws.com:8080/predecir', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(features),
      });
      console.log(response);
      const data = await response.json();
      setPredictedPrice(Math.round(data.precio_predicho));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>PERITO UNAB</Text>
      <Text style={styles.subtitle}>Carlos Francisco 2025</Text>

      <View style={styles.card}>
        {Object.keys(features).map((key) => (
          <View key={key} style={styles.sliderContainer}>
            <Text style={styles.label}>{key}: {features[key]}</Text>
            <Slider
              value={features[key]}
              minimumValue={key === 'Distancia' ? 0 : key === 'AreaCons' ? 40 : 0}
              maximumValue={key === 'Distancia' ? 100 : key === 'habitaciones' ? 20 : key === 'Banos' ? 8 : key === 'Carros' ? 20 : key === 'AreaCons' ? 1200 : 1000}
              step={key === 'AreaCons' || key === 'AreaNoConstruida' ? 10 : 1}
              onValueChange={(val) => setFeatures({ ...features, [key]: val })}
              style={styles.slider}
            />
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePredict}>
        <Text style={styles.buttonText}>Predecir Precio</Text>
      </TouchableOpacity>

      {predictedPrice && (
        <View style={styles.resultContainer}>
          <Text style={styles.priceText}>Precio Predicho:</Text>
          <Text style={styles.priceValue}>${predictedPrice.toLocaleString()}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  sliderContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  slider: {
    width: '100%',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  priceValue: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
});
