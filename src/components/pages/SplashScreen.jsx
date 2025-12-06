import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const SplashScreen = ({ onFinish }) => {
  const [showFullBody, setShowFullBody] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowFullBody(true); // Troca para a foto de corpo inteiro
    }, 5000); // Mostra o rosto por 5 segundos

    const timer2 = setTimeout(() => {
      onFinish(); // Finaliza a splash
    }, 10000); // Duração total da splash (10 segundos)

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <SplashContainer>
      <Content>
        <CharacterContainer>
          <Character
            src="/card-iron-man.jpg"
            alt="Personagem Rosto"
            $visible={!showFullBody}
            $small
          />
          <Character
            src="/card-iron-man.png"
            alt="Personagem Corpo Inteiro"
            $visible={showFullBody}
          />
        </CharacterContainer>
        <div>
          <Logo src="/download.jpeg" alt="Logo Marvel" />
          <Text>Bem-vindo ao Universo Marvel!</Text>
        </div>
      </Content>
    </SplashContainer>
  );
};

export default SplashScreen;

// Animações
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-2px);
  }
  75% {
    transform: translateX(2px);
  }
`;

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// Estilos
const SplashContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
  color: #fff;
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start; /* Alinha à esquerda */
  gap: 20px; /* Espaçamento entre o personagem e o restante */
`;

const CharacterContainer = styled.div`
  position: relative;
  width: 150px; /* Menor largura inicial para o rosto */
  height: 300px; /* Altura consistente */
`;

const Character = styled.img`
  position: absolute;
  width: ${(props) => (props.$small ? "80%" : "100%")}; /* Rosto menor */
  height: auto;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: opacity 1s ease-in-out; /* Transição suave */
`;

const Logo = styled.img`
  width: 150px;
  animation: ${pulse} 1.5s infinite; /* Efeito de pulsação */
`;

const Text = styled.h1`
  margin-top: 10px;
  font-size: 24px;
  animation: ${shake} 0.5s infinite; /* Efeito de tremor */
`;