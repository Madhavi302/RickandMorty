"use client"; // This is a client component
import { Box, CircularProgress, List, ListItemButton, ListItemText, formGroupClasses } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface EpisodeTypes {
  name: string;
  characters: string[];
}

interface EipsodeListProps {
  activeEpisode: string;
  setActiveEpisode: (value: string) => void;
  setCharacters: (value: string[]) => void;
  setError: (value: string) => void;
}

export const EpisodesList = (props: EipsodeListProps) => {
  const { activeEpisode, setActiveEpisode, setCharacters, setError } = props;
  const [episodesList, setEpisodesList] = useState<EpisodeTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true)
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
        setEpisodesList(results)
        setLoading(false)
      }).catch((e: Error) => {
        setLoading(false)
        setError(e.message)
      });
    }
    fetchEpisodes();
  }, []);
  return (
    <Box sx={{ height: "calc(100% - 40px)" }}>
      <div>Episodes List</div>
      {!loading ? (
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
      ) : (
        <Box sx={{ display: 'flex', height: '200px', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};
