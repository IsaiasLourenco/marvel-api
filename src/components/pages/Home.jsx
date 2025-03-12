import React, { useState, useEffect } from "react";
import axios from "axios";
import CharacCard from "../CharacCard";
import styled from "styled-components";
import md5 from "blueimp-md5";

const API_BASE_URL = "https://gateway.marvel.com/v1/public/characters";
const PUBLIC_KEY = "e907b9af041b536a1c92305fe823e5b5";
const PRIVATE_KEY = "4a1702cf25820353824485807689b59fb8512d8a";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(0);
  const [procuraPersonagem, setProcuraPersonagem] = useState("");

  useEffect(() => {
    fetchCharacters(0, true); // Busca inicial de personagens
  }, []);

  const fetchCharacters = async (newOffset, reset = false) => {
    try {
      const ts = Date.now();
      const hash = md5(`${ts}${PRIVATE_KEY}${PUBLIC_KEY}`).toString();

      const response = await axios.get(API_BASE_URL, {
        params: {
          limit: 10,
          offset: newOffset,
          apikey: PUBLIC_KEY,
          ts,
          hash,
        },
      });

      const newCharacters = response.data.data.results;

      setCharacters((prev) => (reset ? newCharacters : [...prev, ...newCharacters]));

      setOffset(newOffset + 10); // Atualiza o offset
    } catch (error) {
      console.error("Erro ao buscar personagens da Marvel:", error);
    }
  };

  const searchCharactersByName = async (name) => {
    try {
      const ts = Date.now();
      const hash = md5(`${ts}${PRIVATE_KEY}${PUBLIC_KEY}`).toString();

      const response = await axios.get(API_BASE_URL, {
        params: {
          nameStartsWith: name, // Busca personagens pelo nome
          limit: 10,
          apikey: PUBLIC_KEY,
          ts,
          hash,
        },
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

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -150px; /* Ajuste a margem conforme necessário */
`;

const LogoImage = styled.img`
  width: 200px; /* Ajuste o tamanho */
  height: auto; /* Mantém a proporção da imagem */
  margin-top: -150px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Botao = styled.div`
  background-color: #333; /* Cinza escuro */
  color: #fff; /* Texto branco */
  border: 2px solid #fff; /* Borda branca para contraste */
  padding: 10px 20px; /* Tamanho confortável */
  font-size: 16px; /* Tamanho da fonte */
  border-radius: 8px; /* Cantos arredondados */
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-top: 10px;
  margin-bottom: 10px;

  &:hover {
    background-color: #555; /* Cinza mais claro no hover */
    color: #000; /* Texto preto no hover */
    border-color: #ccc; /* Borda cinza no hover */
    transform: scale(1.05); /* Leve aumento no tamanho */
  }

  &:active {
    background-color: #222; /* Tom mais escuro no clique */
    transform: scale(0.95); /* Botão "afundando" */
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
