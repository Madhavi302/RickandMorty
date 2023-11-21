"use client"; // This is a client component
import { Grid } from "@mui/material";
import { EpisodesList } from "./EpisodesList";
import { CharactersList } from "./CharactersList";
import { useState } from "react";

export default function Home() {
  const [activeEpisode, setActiveEpisode] = useState<string>("");
  const [characters, setCharacters] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {error ? (<h2>{error}</h2>) : (
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
              setError={setError}
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
              setError={setError}
            />
          </Grid>
        </Grid>
      )}
    </main>
  );
}
