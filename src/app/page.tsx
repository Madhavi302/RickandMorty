"use client"; // This is a client component
import { Grid } from "@mui/material";
import { EpisodesList } from "./EpisodesList";
import { CharactersList } from "./CharactersList";
import { useState } from "react";

export default function Home() {
  const [activeEpisode, setActiveEpisode] = useState("");
  const [characters, setCharacters] = useState([]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Grid container spacing={2} sx={{ height: "100vh" }}>
        <Grid
          item
          xs={3}
          sx={{
            border: "1px solid gray",
            height: "100%",
          }}
        >
          <EpisodesList
            activeEpisode={activeEpisode}
            setActiveEpisode={setActiveEpisode}
            setCharacters={setCharacters}
          />
        </Grid>
        <Grid
          item
          xs={9}
          sx={{
            border: "1px solid gray",
            height: "100%",
          }}
        >
          <CharactersList
            characters={characters}
            activeEpisode={activeEpisode}
          />
        </Grid>
      </Grid>
    </main>
  );
}
