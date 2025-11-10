import {StatusBar} from 'expo-status-bar';
import {Platform, StyleSheet} from 'react-native';
import {ScreenContainer} from "@/components/ScreenContainer";
import React from "react";
import styled from "styled-components/native";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {createTask, updateTask} from "@/store/tasks/tasksSlice";
import {useNavigation} from "@react-navigation/core";
import {Stack, useLocalSearchParams} from "expo-router";
import Toast from "react-native-toast-message";
import {StyledButton} from "@/components/StyledButton";

export default function CreateTask() {
  const dispatch = useAppDispatch();
  const { list: tasks } = useAppSelector((state) => state.tasks);
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [text, setText] = React.useState('');

  const ErrorToast = () => Toast.show({
    type: "error",
    text1: "Erro",
    text2: `Erro ao ${id ? 'editar' : 'criar'} tarefa. Tente novamente`
  });

  const handleSubmit = async () => {
    if (!text) return Toast.show({
      type: "error",
      text1: "Erro",
      text2: "Tarefa não pode ser vazia"
    });

    try {
      let response;
      if (id) response = await dispatch(updateTask({ id: Number(id), title: text }));
      else response = await dispatch(createTask({ title: text }));

      if (response.status !== 204 || response.status !== 200) navigation.goBack();
      else ErrorToast();
    } catch (e) {
      ErrorToast();
      console.log(`Erro ao ${id ? 'editar' : 'criar'} tarefa: `, e);
    }

  };

  React.useEffect(() => {
    if (!id) return
    const task = tasks.find(t => Number(t.id) === Number(id));
    setText(task.title);
  }, [id])

  return (
    <ScreenContainer>
      <Stack.Screen
          options={{
            title: id ? "Editar Tarefa" : "Criar Tarefa",
          }}
      />

      <StyledInput
          onChangeText={setText}
          value={text}
          placeholder="Digite aqui a tarefa"
          placeholderTextColor="#BF4F74"
          multiline
      />
      <StyledButton
          title={id ? 'Editar' : 'Criar'}
          onPress={handleSubmit}
          color="#4f75bf"
          textColor="#fefefe"
      />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ScreenContainer>
  );
}

const StyledInput = styled.TextInput`
  width: 95%;
  min-height: 50px;
  color: #692b40;
  margin: 12px;
  border: 1px solid #BF4F74;
  padding: 10px;
  background-color: #c9afb8;
  border-radius: 4px;
`;