import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import { Teacher } from '../../components/TeacherItem';
import TopBarFixed from '../../components/TopBarFixed';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';

const TeacherList = () => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');
  const [teachers, setTeachers] = useState([]);

  // useEffect(() => {
  //   loadFavorites();
  // }, []);

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map(
          (teacher: Teacher) => {
            return teacher.id;
          }
        );
        setFavorites(favoritedTeachersIds);
      }
    });
  }

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFiltersSubmit() {
    loadFavorites();
    const response = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setTeachers(response.data);
    setIsFiltersVisible(false);
  }

  return (
    <View style={styles.container}>
      <TopBarFixed />
      <ScrollView>
        <PageHeader
          title="Proffys disponíveis"
          headerRight={
            <BorderlessButton onPress={handleToggleFiltersVisible}>
              <Feather name="filter" size={20} color={'#FFF'} />
            </BorderlessButton>
          }
        >
          {isFiltersVisible && (
            <View style={styles.searchForm}>
              <Text style={styles.label}>Matéria</Text>
              <TextInput
                style={styles.input}
                value={subject}
                onChangeText={(text) => setSubject(text)}
                placeholder="Qual a matéria?"
                placeholderTextColor="#C1BCCC"
              />

              <View style={styles.inputGroup}>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Dia da semana</Text>
                  <TextInput
                    style={styles.input}
                    value={week_day}
                    onChangeText={(text) => setWeek_day(text)}
                    placeholder="Qual o dia?"
                    placeholderTextColor="#C1BCCC"
                  />
                </View>

                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Horário</Text>
                  <TextInput
                    style={styles.input}
                    value={time}
                    onChangeText={(text) => setTime(text)}
                    placeholder="Qual o horário?"
                    placeholderTextColor="#C1BCCC"
                  />
                </View>
              </View>

              <RectButton
                style={styles.submitButton}
                onPress={handleFiltersSubmit}
              >
                <Text style={styles.submitButtonText}>Filtrar</Text>
              </RectButton>
            </View>
          )}
        </PageHeader>
        {teachers.map((teacher: Teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
