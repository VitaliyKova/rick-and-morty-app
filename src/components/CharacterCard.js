import React from "react";
import "../styles/CharacterCard.css";

const CharacterCard = ({ character }) => {
  return (
    <div className="character-card">
      <img
        className="character-card__img"
        src={character.image}
        alt={character.name}
      />
      <div className="character-card__info">
        <div className="character-card__info-top">
          <h2>{character.name}</h2>
          <p
            className={`character-card__info-status ${
              character.status === "Alive"
                ? "character-card__info-alive-status"
                : "character-card__info-dead-status"
            }`}
          >
            {character.status} - {character.species}
          </p>
        </div>
        <div className="character-card__info-midle">
          <p className="character-card__info-heading">Last known location:</p>
          <p>{character.location.name}</p>
        </div>
        <div className="character-card__info-butom">
          <p className="character-card__info-heading">First seen in:</p>
          <p>{character.episodes[0].name}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
