import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';

const mockRecipes = [
  { id: '1', name: 'Spaghetti Carbonara' },
  { id: '2', name: 'Chicken Alfredo' },
  // ... add more mock recipes here
];

const HealthScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const formattedQuery = text.toLowerCase();
      const filteredData = mockRecipes.filter((item) => {
        return item.name.toLowerCase().includes(formattedQuery);
      });
      setFilteredRecipes(filteredData);
    } else {
      setFilteredRecipes([]);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleSearch}
        value={searchQuery}
        placeholder="Enter ingredient"
      />
      <FlatList
        data={filteredRecipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  list: {
    margin: 12,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
  },
});

export default HealthScreen;
