import React from 'react';
import {Modal, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';

type TModalProps = {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function DeleteModal({visible, onConfirm, onCancel}: TModalProps) {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            statusBarTranslucent
        >
            <TouchableWithoutFeedback onPress={onCancel}>
                <Overlay>
                    <TouchableWithoutFeedback>
                        <ModalContainer>
                            <Title>Confirmar deleção</Title>
                            <Message>Tem certeza que deseja deletar essa tarefa?</Message>

                            <ButtonRow>
                                <CancelButton onPress={onCancel}>
                                    <CancelText>Cancelar</CancelText>
                                </CancelButton>

                                <ConfirmButton onPress={onConfirm}>
                                    <ConfirmText>Confirmar</ConfirmText>
                                </ConfirmButton>
                            </ButtonRow>
                        </ModalContainer>
                    </TouchableWithoutFeedback>
                </Overlay>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const Overlay = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.4);
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.View`
    width: 85%;
    background-color: #fff;
    border-radius: 12px;
    padding: 20px;
    elevation: 5;
    shadow-color: #000;
    shadow-offset: 0px 4px;
    shadow-opacity: 0.25;
    shadow-radius: 8px;
`;

const Title = styled.Text`
    font-size: 18px;
    font-weight: 700;
    color: #111;
    text-align: center;
    margin-bottom: 10px;
`;

const Message = styled.Text`
    font-size: 15px;
    color: #444;
    text-align: center;
    margin-bottom: 20px;
`;

const ButtonRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const CancelButton = styled.TouchableOpacity`
    flex: 1;
    padding: 12px;
    border-radius: 8px;
    background-color: #ccc;
    margin-right: 8px;
    align-items: center;
`;

const ConfirmButton = styled.TouchableOpacity`
    flex: 1;
    padding: 12px;
    border-radius: 8px;
    background-color: #e53935;
    margin-left: 8px;
    align-items: center;
`;

const CancelText = styled.Text`
    color: #222;
    font-weight: 600;
`;

const ConfirmText = styled.Text`
    color: white;
    font-weight: 600;
`;
