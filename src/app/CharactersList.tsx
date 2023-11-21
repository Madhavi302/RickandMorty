/* eslint-disable @next/next/no-img-element */
import { Box, CircularProgress, ImageList, ImageListItem, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface CharacterTypes {
  name: string;
  image: string;
}

interface CharactersListProps {
  characters: string[];
  activeEpisode: string;
  setError: (value: string) => void;
}

export const CharactersList = (props: CharactersListProps) => {
  const { characters, activeEpisode, setError } = props;
  const [charachtersList, setCharactersList] = useState<CharacterTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true)
      if (characters.length > 0) {
        let url = "https://rickandmortyapi.com/api/character/";
        const characterIds = characters?.map(
          (character: string) => character.split("character/")[1]
        );
        characterIds?.map((id: string, i: number) => {
          if (i > 0) url = url.concat(`,${id}`);
          else url = url.concat(id.toString());
        });
        axios.get(url).then((res) => {
          console.log(res);
          setCharactersList(res?.data || []);
          setLoading(false)
        }).catch((e: Error) => {
          setError(e.message)
          setLoading(false)
        });
      } else {
        axios.get("https://rickandmortyapi.com/api/character").then((res) => {
          setCharactersList(res?.data?.results || []);
          setLoading(false)
        }).catch((e: Error) => {
          setError(e.message)
          setLoading(false)
        });
      }
    }
    fetchCharacters();
  }, [characters]);

  return (
    <Box sx={{ height: "calc(100% - 40px)" }}>
      <div>
        {activeEpisode !== ""
          ? `${activeEpisode} characters`
          : "All characters"}
      </div>
      {!loading ? (
        <ImageList cols={5} sx={{ overflow: "auto", height: "100%" }}>
          {charachtersList?.map((character: CharacterTypes, index: number) => {
            return (
              <ImageListItem key={index}>
                <img src={character?.image} alt={character?.name} />
                <Typography align="center">{character?.name}</Typography>
              </ImageListItem>
            );
          })}
        </ImageList>
      ) : (
        <Box sx={{ display: 'flex', height: '200px', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};
