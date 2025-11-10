import styled from "styled-components/native";
import React from "react";
import { TouchableOpacityProps, Text } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    color: string;
    textColor: string;
}

export const StyledButton = ({ title, color, textColor, ...props }: ButtonProps) => {
    return (
        <ButtonContainer color={color} {...props}>
            <ButtonText textColor={textColor}>{title}</ButtonText>
        </ButtonContainer>
);
};

const ButtonContainer = styled.TouchableOpacity<{ color: string }>`
  background-color: ${({ color }) => color};
  padding: 12px 18px;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  width: 95%;
`;

const ButtonText = styled.Text<{ textColor: string }>`
  color: ${({ textColor }) => textColor};
  font-size: 16px;
  font-weight: 600;
`;
