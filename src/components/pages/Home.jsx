import React, { useState, useEffect } from "react";
import axios from "axios";
import CharacCard from "../CharacCard";
import styled from "styled-components";
import ThemeToggler from "../ThemeToggler";

const Home = () => {
  const [procuraPersonagem, setProcuraPersonagem] = useState(() => {
    return localStorage.getItem("search") || "";
  });
  const [isSearching, setIsSearching] = useState(() => {
    return localStorage.getItem("isSearching") === "true";
  });
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(() => {
    const saved = localStorage.getItem("offset");
    return saved ? parseInt(saved, 10) : 10;
  });

  // 🔹 Função para normalizar texto (remove acentos e deixa minúsculo)
  const normalize = (str) =>
    String(str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");

  useEffect(() => {
    // salvar sempre que mudar
    localStorage.setItem("offset", offset);
    localStorage.setItem("search", procuraPersonagem);
    localStorage.setItem("isSearching", isSearching);

    const fetchData = async () => {
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

        if (isSearching && procuraPersonagem.trim() !== "") {
          const q = normalize(procuraPersonagem);
          const results = all.filter((c) => {
            const name = normalize(c.Character);
            const powers = normalize(c.Powers);
            return name.includes(q) || powers.includes(q);
          });
          setCharacters(results);
        } else {
          setCharacters(all);
        }
      } catch (error) {
        console.error("Erro ao buscar personagens:", error);
      }
    };

    fetchData();
  }, [offset, procuraPersonagem, isSearching]);

  const resetToTen = () => {
    setOffset(10); // volta a mostrar só 10
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
          placeholder="Buscar por nome ou poder..."
          value={procuraPersonagem}
          onChange={(e) => {
            const value = e.target.value;
            setProcuraPersonagem(value);

            if (value.trim() === "") {
              setIsSearching(false);
              setOffset(10);
            } else {
              setIsSearching(true);
            }
          }}
        />
      </Controls>
      <CharacterGrid>
        {characters.length > 0 ? (
          <>
            {isSearching
              ? characters.map((character, index) => (
                  <CharacCard
                    key={character.id || index}
                    id={character.id}
                    name={character.Character}
                    thumbnail={character.thumbnail}
                  />
                ))
              : characters.slice(0, offset).map((character, index) => (
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

      {/* Botão Carregar Mais */}
      {!isSearching && offset < characters.length && (
        <Botao onClick={() => setOffset((prev) => prev + 10)}>
          Carregar Mais
        </Botao>
      )}

      {/* Botão Voltar a dez */}
      {!isSearching && offset > 10 && (
        <Botao onClick={resetToTen}>Voltar a dez</Botao>
      )}
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