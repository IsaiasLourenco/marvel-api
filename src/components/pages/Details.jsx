import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import md5 from "blueimp-md5";

const API_BASE_URL = "https://gateway.marvel.com/v1/public/characters";
const PUBLIC_KEY = "e907b9af041b536a1c92305fe823e5b5";
const PRIVATE_KEY = "4a1702cf25820353824485807689b59fb8512d8a";

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const ts = Date.now();
        const hash = md5(`${ts}${PRIVATE_KEY}${PUBLIC_KEY}`).toString();

        const response = await axios.get(`${API_BASE_URL}/${id}`, {
          params: {
            apikey: PUBLIC_KEY,
            ts,
            hash,
          },
        });

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
        <LogoImage src="/download.jpeg" alt="Logo Marvel" style={{ width: "500px", marginBottom: "0px", padding: "0px" }} />
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

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -50px; /* Ajuste a margem conforme necessário */
`;

const LogoImage = styled.img`
  height: auto; /* Mantém a proporção da imagem */
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
  align-items: center; /* Centraliza tudo horizontalmente */
  justify-content: center;
  text-align: center;
  padding: 20px;
  margin-top: 200px;

  img {
    width: 200px; /* Tamanho fixo para uniformidade */
    height: 200px;
    object-fit: contain; /* Mantém a imagem dentro do espaço sem cortar */
    border-radius: 10px;
    display: block; /* Evita espaços estranhos */
  }

  h1, p {
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

`
  ;

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
`
  ;