import React, { useState, useEffect } from "react";
import CharacterCard from "./CharacterCard.js";
import Pagination from "./Pagination.js";
import Filter from "./Filter.js";
import axios from "axios";
import "../styles/CharacterList.css";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const characterPerPage = 10;

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          "https://rickandmortyapi.com/api/character"
        );
        const characterData = response.data.results;
        const episodePromises = characterData.map(async (character) => {
          const episodeUrls = character.episode;
          const episodeRequests = episodeUrls.map(async (url) => {
            const episodeResponse = await axios.get(url);
            return episodeResponse.data;
          });
          const episodesData = await Promise.all(episodeRequests);
          return { ...character, episodes: episodesData };
        });

        // setCharacters(characterData);
        // setFilteredCharacters(response.data.results);
        // setLoading(false);
        const charactersWithEpisodes = await Promise.all(episodePromises);
        setCharacters(charactersWithEpisodes);
        setFilteredCharacters(charactersWithEpisodes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, []);

  const getCurrentCharacters = (characters, currentPage) => {
    const indexOfLastCharacter = currentPage * characterPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - characterPerPage;
    return characters.slice(indexOfFirstCharacter, indexOfLastCharacter);
  };

  const currentCharacters = getCurrentCharacters(
    filteredCharacters,
    currentPage
  );

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilter = ({ name, status }) => {
    const filtered = characters.filter((character) => {
      const nameMatch = name
        ? character.name.toLowerCase().includes(name.toLowerCase())
        : true;
      const statusMatch = status
        ? character.status.toLowerCase() === status.toLowerCase()
        : true;
      return nameMatch && statusMatch;
    });
    setFilteredCharacters(filtered);
    setCurrentPage(1);
  };

  return (
    <div className="character-list">
      <Filter onFilter={handleFilter} />
      <div className="character-list__items">
        {currentCharacters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredCharacters.length / characterPerPage)}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default CharacterList;
