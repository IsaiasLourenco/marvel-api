import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CharacCard = ({ name, thumbnail, id }) => {

  // se thumbnail existir, usa direto; senão usa uma imagem padrão
  const imageUrl = thumbnail ? thumbnail : "/images/placeholder-small.png";

  return (
    <CardContainer>
      <img src={imageUrl} alt={name} />
      <h3 style={{ whiteSpace: "pre-line" }}>{name}</h3>
      <Link to={`/characters/${id}`} className="details-link">
        Ver detalhes
      </Link>
    </CardContainer>
  );
};

export default CharacCard;

const CardContainer = styled.div`
  display: inline-block;
  border: 1px solid ${({ theme }) => theme.abilityText};
  border-radius: 8px;
  width: 80%;
  padding: 16px;
  text-align: center;

  /* inversão da lógica */
  background-color: ${({ theme }) =>
    theme.background === "#333" ? "#f9f9f9" : "#444"};
  color: ${({ theme }) =>
    theme.background === "#333" ? "#333" : "#fff"};

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 8px;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 8px;
    color: inherit;
  }

  .details-link {
    text-decoration: none;
    font-size: 0.9rem;
    color: #646cff;
    font-weight: bold;
    transition: color 0.3s ease;
  }

  .details-link:hover {
    color: #535bf2;
  }

  &:hover {
    transform: scale(1.05);
  }
`;