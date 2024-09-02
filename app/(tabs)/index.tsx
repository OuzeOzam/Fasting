import React, { useState } from 'react';
import { View, StyleSheet, Platform, Button, TouchableWithoutFeedback, Modal, Text, Pressable, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

export default function HomeScreen() {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const insets = useSafeAreaInsets();

  const onChange = (event: Event, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || time;
    setShowPicker(Platform.OS === 'ios'); // Gestion spécifique à iOS
    setTime(currentDate);
  };

  const showTimepicker = () => {
    setShowPicker(true);
  };

  const hideTimepicker = () => {
    setShowPicker(false);
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Heure du dernier repas</ThemedText>
        <View style={styles.main}>
          <Button onPress={showTimepicker} title="Sélectionner l'heure" />
          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View>
          <View>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
            <View style={styles.datepickerContainer}>
              {showPicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={time}
                  mode="datetime"
                  is24Hour={true}
                  display="spinner"
                  locale="fr"
                  onChange={onChange} // Utilisation de la fonction ajustée onChange
                  style={{ width: '100%', alignSelf: 'center' }}
                />
              )}
            </View>
        </View>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {},
  stepContainer: {
    padding: 20,
    alignItems: 'center',
  },
  datepickerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
