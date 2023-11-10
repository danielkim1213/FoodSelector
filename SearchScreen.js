import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';


const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SearchScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
    },
  });

export default SearchScreen;
