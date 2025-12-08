import React, { useState, useEffect } from "react";
import axios from "axios";
import CharacCard from "../CharacCard";
import styled from "styled-components";
import ThemeToggler from "../ThemeToggler";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(10); // 🔹 começa mostrando 10
  const [procuraPersonagem, setProcuraPersonagem] = useState("");

  useEffect(() => {
    fetchCharacters(true); // 🔹 busca inicial
  }, []);

  const fetchCharacters = async (reset = false) => {
    try {
      const response = await axios.get("/characters.json", {
        headers: { "Cache-Control": "no-cache" }
      });

      const data = response.data;
      const newCharacters = Array.isArray(data)
        ? data
        : Array.isArray(data.characters)
        ? data.characters
        : Object.values(data);

      setCharacters((prev) =>
        reset ? newCharacters : [...prev, ...newCharacters]
      );
    } catch (error) {
      console.error("Erro ao buscar personagens:", error);
    }
  };

  const searchCharactersByName = async (name) => {
    try {
      const response = await axios.get("/characters.json", {
        headers: { "Cache-Control": "no-cache" }
      });

      const data = response.data;
      const all = Array.isArray(data)
        ? data
        : Array.isArray(data.characters)
        ? data.characters
        : Object.values(data);

      const query = name.trim().toLowerCase();
      const results = all.filter((c) =>
        String(c.Character || "").toLowerCase().includes(query)
      );

      setCharacters(results);
      setOffset(10); // 🔹 sempre volta a mostrar 10 quando faz busca
    } catch (error) {
      console.error("Erro ao buscar personagem por nome:", error);
    }
  };

  const resetToTen = () => {
    setOffset(10); // 🔹 volta a mostrar só 10
  };

  return (
    <Container>
      <Header>
        <Logo src="/download.png" alt="Marvel logo" />
        <h1>Lista de Personagens</h1>
      </Header>
      <Controls>
        <ThemeToggler />
        <SearchInput
          type="text"
          placeholder="Buscar personagem..."
          value={procuraPersonagem}
          onChange={(e) => {
            const value = e.target.value;
            setProcuraPersonagem(value);

            if (value.trim() === "") {
              fetchCharacters(true);
              setOffset(10); // 🔹 reset quando apaga busca
            } else {
              searchCharactersByName(value);
            }
          }}
        />
      </Controls>
      <CharacterGrid>
        {characters.length > 0 ? (
          <>
            {characters.slice(0, offset).map((character, index) => (
              <CharacCard
                key={character.id || index}
                id={character.id}
                name={character.Character}
                thumbnail={character.thumbnail}
              />
            ))}
          </>
        ) : (
          <p>Nenhum personagem encontrado.</p>
        )}
      </CharacterGrid>

      {/* 🔹 Botão Carregar Mais */}
      {offset < characters.length && (
        <Botao onClick={() => setOffset((prev) => prev + 10)}>
          Carregar Mais
        </Botao>
      )}

      {/* 🔹 Botão Voltar a dez */}
      {offset > 10 && <Botao onClick={resetToTen}>Voltar a dez</Botao>}
    </Container>
  );
};

export default Home;

// Estilos
const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 2px;
  padding: 160px 0 20px;
`;

const Logo = styled.img`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: auto;
  z-index: 0;
  filter: ${({ theme }) =>
    theme.background === "#333" ? "brightness(1.2)" : "none"};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Botao = styled.div`
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  border: 2px solid ${({ theme }) => theme.buttonText};
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-top: 10px;
  margin-bottom: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
    transform: scale(1.05);
  }

  &:active {
    opacity: 0.9;
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

const SearchInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 300px;

  background-color: ${({ theme }) =>
    theme.background === "#333" ? "#fff" : "#333"};
  color: ${({ theme }) =>
    theme.background === "#333" ? "#000" : "#fff"};

  &::placeholder {
    color: ${({ theme }) =>
      theme.background === "#333" ? "#666" : "#ddd"};
  }
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;