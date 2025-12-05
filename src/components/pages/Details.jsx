import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        // Agora chamamos a rota backend, não a Marvel diretamente
        const response = await axios.get(`/api/characters/${id}`);
        setCharacter(response.data.data.results[0]); // Pegando o primeiro item do array
      } catch (error) {
        console.error("Erro ao carregar detalhes do personagem:", error);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  if (!character) return <h2>Carregando...</h2>;

  return (
    <Container>
      <LogoContainer>
        <LogoImage
          src="/download.jpeg"
          alt="Logo Marvel"
          style={{ width: "500px", marginBottom: "0px", padding: "0px" }}
        />
      </LogoContainer>
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
      />
      <h1>{character.name}</h1>
      <Par>{character.description || "Sem descrição disponível."}</Par>

      <Botao className="back-button" onClick={() => navigate("/")}>
        ← Voltar
      </Botao>
    </Container>
  );
};

export default CharacterDetails;

// Estilos
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -50px;
`;

const LogoImage = styled.img`
  height: auto;
  margin-top: -300px;
`;

const Par = styled.div`
  width: 500px;

  @media (max-width: 1200px) {
    width: 500px;
  }

  @media (max-width: 768px) {
    width: 500px;
  }

  @media (max-width: 480px) {
    width: 300px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  margin-top: 200px;

  img {
    width: 200px;
    height: 200px;
    object-fit: contain;
    border-radius: 10px;
    display: block;
  }

  h1,
  p {
    text-align: center;
    max-width: 80%;
  }

  @media (max-width: 1200px) {
    width: 500px;
    margin-left: 150px;
  }

  @media (max-width: 768px) {
    width: 500px;
    margin-left: 5px;
  }

  @media (max-width: 480px) {
    width: 300px;
    margin-left: 30px;
  }
`;

const Botao = styled.div`
  background-color: #333;
  color: #fff;
  border: 2px solid #fff;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-top: 10px;
  margin-bottom: 10px;

  &:hover {
    background-color: #555;
    color: #000;
    border-color: #ccc;
    transform: scale(1.05);
  }

  &:active {
    background-color: #222;
    transform: scale(0.95);
  }
`;