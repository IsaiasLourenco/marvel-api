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
        // Busca todos os personagens porque o JSON tem raiz "characters"
        const response = await axios.get("http://localhost:3001/characters");
        const found = response.data.find(
          (c) => c.id === Number(id)
        );
        setCharacter(found);
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
          style={{ width: "500px" }}
        />
      </LogoContainer>
      <img
        src={character.image || "/placeholder.png"}
        alt={character.Character}
      />
      <h1>{character.Character}</h1>
      <Par>
        <p><strong>Nome real:</strong> {character["Real Name"]}</p>
        <p><strong>Afiliação:</strong> {character.Affiliation}</p>
        <p><strong>Poderes:</strong> {character.Powers}</p>
        <p><strong>Função:</strong> {character.Role}</p>
        <p><strong>Nível de poder:</strong> {character["Power Level"]}</p>
      </Par>
      <Botao onClick={() => navigate("/")}>← Voltar</Botao>
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

  @media (max-width: 480px) {
    width: 300px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  margin-top: 200px;

  img {
    width: 300px;
    height: 300px;
    object-fit: contain;
    border-radius: 10px;
    display: block;
    margin-bottom: 20px;
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
  transition: all 0.3s;
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