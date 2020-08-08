import React, { useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PageHeader from '../../components/PageHeader';
import { ScrollView } from 'react-native-gesture-handler';
import TeacherItem from '../../components/TeacherItem';
import TopBarFixed from '../../components/TopBarFixed';
import AsyncStorage from '@react-native-community/async-storage';
import { Teacher } from '../../components/TeacherItem';
import styles from './styles';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  async function loadFavorites() {
    const response = await AsyncStorage.getItem('favorites');
    if (response) {
      const favoritedTeachers = JSON.parse(response);
      setFavorites(favoritedTeachers);
    }
  }

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <View style={styles.container}>
      <TopBarFixed />
      <ScrollView>
        <PageHeader title="Meus Proffys favoritos" />
        {favorites.map((teacher: Teacher) => {
          return (
            <TeacherItem key={teacher.id} teacher={teacher} favorited={true} />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Favorites;
