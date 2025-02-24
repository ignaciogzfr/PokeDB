import React from "react";
import { Container, Typography } from "@mui/material";

export default function PkPresentation() {
    return (
        <Container sx={{ paddingY: 2 }}>
            <Typography variant="h5" sx={{ marginY: 2 }}>Pokedex - All Pokemon</Typography>
            <Typography variant="h6" fontWeight={400}>If you want to look for a specific Pokémon, you can use the Search Bar</Typography>
        </Container>
    );
}