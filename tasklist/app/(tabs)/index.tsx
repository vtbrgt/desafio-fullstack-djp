import {ActivityIndicator, FlatList, Platform} from 'react-native';
import {Text} from '@/components/Themed';
import React from "react";
import {getTasks} from "@/store/tasks/tasksSlice";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {ITask} from "@/utils/types";
import Task from "@/components/Task";
import {StatusBar} from "expo-status-bar";
import {ScreenContainer} from "@/components/ScreenContainer";
import {useFocusEffect} from "@react-navigation/native";
import Toast from "react-native-toast-message";

export default function Tasklist() {
    const dispatch = useAppDispatch();
    const { list: tasks, loading } = useAppSelector((state) => state.tasks);

    useFocusEffect(
        React.useCallback(() => {
            try {
                dispatch(getTasks());
            } catch (e) {
                Toast.show({
                    type: "error",
                    text1: "Erro",
                    text2: "Erro ao buscar tarefas"
                });
                console.log(`Erro ao buscar tarefas: `, e);
            }
        }, [])
    );

    return (
      <ScreenContainer>
        {loading && <ActivityIndicator size="large" color="#30133a" />}

        <FlatList<ITask>
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Task task={item} />}
        />

        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </ScreenContainer>
    );
}