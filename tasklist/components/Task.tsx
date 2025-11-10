import {ITask} from "@/utils/types";
import styled from 'styled-components/native'
import BouncyCheckbox from "react-native-bouncy-checkbox/lib";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import {Link} from "expo-router";
import {useAppDispatch} from "@/store/hooks";
import {deleteTask, updateTask} from "@/store/tasks/tasksSlice";
import DeleteModal from "@/components/DeleteModal";
import Toast from "react-native-toast-message";

type TTaskProps = { task: ITask }

export default function Task({ task }: TTaskProps) {
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = React.useState(false);

    const toggleDone = async (isChecked: boolean) => {
        try {
            dispatch(updateTask({ id: task.id, done: isChecked }));
        } catch (e) {
            Toast.show({
                type: "error",
                text1: "Erro",
                text2: "Erro ao atualizar tarefa"
            });
            console.log(`Erro ao atualizar tarefa: `, e);
        }
    };

    const handleDelete = async () => {
        try {
            await dispatch(deleteTask(task.id));
        } catch (e) {
            Toast.show({
                type: "error",
                text1: "Erro",
                text2: "Erro ao deletar tarefa"
            });
            console.log(`Erro ao deletar tarefa: `, e);
        }
    };

    return (
        <Container>
            <Box>
                <BouncyCheckbox
                    isChecked={task.done}
                    onPress={(isChecked: boolean) => toggleDone(isChecked)}
                    fillColor="#BF4F74"
                />
                <StyledText done={task.done}>{task.title}</StyledText>
            </Box>
            <Box>
                <CircleButton>
                    <Link href={{ pathname: "CreateTask", params: { id: task.id } }}>
                        <FontAwesome
                            name="pencil"
                            size={15}
                            color="#ededed"
                        />
                    </Link>
                </CircleButton>
                <CircleButton
                    onPress={() => setShowModal(true)}
                >
                    <FontAwesome
                        name="trash"
                        size={15}
                        color="#ededed"
                    />
                </CircleButton>
            </Box>

            <DeleteModal
                visible={showModal}
                onConfirm={handleDelete}
                onCancel={() => setShowModal(false)}
            />
        </Container>
    )
}

const Container = styled.View`
    width: 94%;
    background-color: #30133a;
    padding: 18px;
    margin: 12px 24px 6px 8px;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 8px;
`;

const Box = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    gap: 8px;
`;

const StyledText = styled.Text<{ done: boolean }>`
    color: #BF4F74;
    font-size: 20px;
    word-break: break-word;
    width: 200px;
    text-decoration: line-through;
    text-decoration: ${({ done }) => (done ? 'line-through' : '')};
`;

const CircleButton = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: #BF4F74;
    justify-content: center;
    align-items: center;
    align-self: center
`;