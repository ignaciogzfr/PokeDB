import React from "react";
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";

export default function PkBasicInfo({ Pokemon, Species, Artwork, PokemonNames }) {
    return (
        <>
            <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: 'center' }}>
                <Typography fontSize={16} fontWeight={500} sx={{ marginTop: 3 }}> Official Artwork</Typography>

                {Artwork && <img src={Artwork} alt={`Sprite of ${Pokemon.name}`} className="poke-img-detailed" style={{ marginLeft: '22px' }} />}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: 'center', marginLeft: [2, 2, 0] }}>
                <Typography fontSize={16} fontWeight={500} sx={{ marginTop: 3 }}> Names</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography fontSize={14} sx={{ textAlign: 'left', fontWeight: 500, marginRight: 2 }}>English: </Typography>
                    <Typography sx={{ textAlign: 'left', fontWeight: 400 }}> {Pokemon.name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography fontSize={14} sx={{ textAlign: 'left', fontWeight: 500, marginRight: 2 }}>Japanese: </Typography>
                    <Typography sx={{ textAlign: 'left' }} fontWeight={400} fontSize={14}> {PokemonNames['roomaji']} (<span style={{ fontSize: 12 }}>{PokemonNames['ja-Hrkt']}</span>)</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography fontSize={14} sx={{ textAlign: 'left', fontWeight: 500, marginRight: 2 }}>French: </Typography>
                    <Typography sx={{ textAlign: 'left' }} fontWeight={400} fontSize={14}> {PokemonNames['fr']}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography fontSize={14} sx={{ textAlign: 'left', fontWeight: 500, marginRight: 2 }}>German: </Typography>
                    <Typography sx={{ textAlign: 'left' }} fontWeight={400} fontSize={14}> {PokemonNames['de']}</Typography>
                </Box>
            </Grid>

            <Grid container spacing={2} size={12} sx={{ marginTop: 3 }}>
                <Grid size={{ xs: 6, md: 3 }} sx={{ textAlign: 'center' }}>
                    <Typography fontSize={14} fontWeight={500}> Height</Typography>
                    <Typography fontSize={14} fontWeight={400}> {Pokemon.height / 10}m</Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }} sx={{ textAlign: 'center' }}>
                    <Typography fontSize={14} fontWeight={500}> Weight</Typography>
                    <Typography fontSize={14} fontWeight={400}> {Pokemon.weight / 10}kg</Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }} sx={{ textAlign: 'center' }}>
                    <Typography fontSize={14} fontWeight={500}> Classification</Typography>
                    <Typography fontSize={14} fontWeight={400}> {Species?.genera[7]?.genus}</Typography>

                </Grid>
                <Grid size={{ xs: 6, md: 3 }} style={{ textAlign: 'center' }}>
                    <Typography fontSize={14} fontWeight={500}> Types</Typography>
                    {Pokemon.types.map((type) => (
                        <img src={type} alt={type} className="type-img" />
                    ))}
                </Grid>

            </Grid>
        </>
    );

} 