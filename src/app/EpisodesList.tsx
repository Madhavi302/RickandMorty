"use client"; // This is a client component
import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface EpisodeTypes {
  name: string;
  characters: string[];
}

interface EipsodeListProps {
  activeEpisode: string;
  setActiveEpisode: React.Dispatch<React.SetStateAction<string>>;
  setCharacters: React.Dispatch<React.SetStateAction<any>>;
}

export const EpisodesList = (props: EipsodeListProps) => {
  const { activeEpisode, setActiveEpisode, setCharacters } = props;
  const [episodesList, setEpisodesList] = useState([]);

  useEffect(() => {
    axios.get("https://rickandmortyapi.com/api/episode").then(async (res) => {
      let results = res?.data?.results || [];
      const totalPages = res?.data?.info?.pages;
      let page = 2;
      do {
        const response = await axios
          .get(`https://rickandmortyapi.com/api/episode?page=${page}`)
          .then((res) => res);
        results.push(...response?.data?.results);
        console.log(results);
        page++;
      } while (page <= totalPages);
      setEpisodesList(results);
    });
  }, []);
  return (
    <Box sx={{ height: "calc(100% - 40px)" }}>
      <div>Episodes List</div>
      <List sx={{ height: "100%", overflow: "auto" }}>
        {episodesList.map((episode: EpisodeTypes, index) => {
          return (
            <ListItemButton
              key={index}
              selected={activeEpisode === episode?.name}
              onClick={() => {
                if (activeEpisode === episode?.name) {
                  setActiveEpisode("");
                  setCharacters([]);
                } else {
                  setActiveEpisode(episode?.name);
                  setCharacters(episode?.characters);
                }
              }}
            >
              <ListItemText>{episode?.name}</ListItemText>
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};
