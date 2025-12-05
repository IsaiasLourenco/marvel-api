import React, { useState, useEffect } from "react";
import axios from "axios";
import CharacCard from "../CharacCard";
import styled from "styled-components";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(0);
  const [procuraPersonagem, setProcuraPersonagem] = useState("");

  useEffect(() => {
    fetchCharacters(0, true); // Busca inicial de personagens
  }, []);

  const fetchCharacters = async (newOffset, reset = false) => {
    try {
      const response = await axios.get("/api/characters", {
        params: { offset: newOffset },
      });

      const newCharacters = response.data.data.results;

      setCharacters((prev) =>
        reset ? newCharacters : [...prev, ...newCharacters]
      );

      setOffset(newOffset + 10); // Atualiza o offset
    } catch (error) {
      console.error("Erro ao buscar personagens da Marvel:", error);
    }
  };

  const searchCharactersByName = async (name) => {
    try {
      const response = await axios.get("/api/characters", {
        params: { nameStartsWith: name, limit: 10 },
      });

      const results = response.data.data.results;
      setCharacters(results); // Atualiza com os resultados encontrados
      setOffset(0); // Reseta o offset
    } catch (error) {
      console.error("Erro ao buscar personagem por nome:", error);
    }
  };

  const resetToTen = () => {
    fetchCharacters(0, true);
  };

  return (
    <Container>
      <LogoContainer>
        <LogoImage src="/download.jpeg" alt="Logo Marvel" />
      </LogoContainer>
      <h1>Lista de Personagens</h1>
      <input
        type="text"
        placeholder="Buscar personagem..."
        value={procuraPersonagem}
        onChange={(e) => {
          const value = e.target.value;
          setProcuraPersonagem(value);

          if (value.trim() === "") {
            fetchCharacters(0, true); // Reseta para a lista padrão
          } else {
            searchCharactersByName(value); // Busca pelo nome
          }
        }}
        style={{
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          width: "300px",
        }}
      />
      <CharacterGrid>
        {characters.length > 0 ? (
          characters.map((character) => (
            <CharacCard
              key={character.id}
              name={character.name}
              thumbnail={character.thumbnail}
              id={character.id}
            />
          ))
        ) : (
          <p>Nenhum personagem encontrado.</p>
        )}
      </CharacterGrid>
      <Botao onClick={() => fetchCharacters(offset)}>Carregar Mais</Botao>
      {offset > 10 && <Botao onClick={resetToTen}>Voltar a dez</Botao>}
    </Container>
  );
};

export default Home;

// Estilos
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -150px;
`;

const LogoImage = styled.img`
  width: 200px;
  height: auto;
  margin-top: -150px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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

const CharacterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin: auto;
  width: 80%;
  justify-items: center;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
  }
`;