import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import { Container, Typography } from "@mui/material";
import PkBasicInfo from "./PkBasicInfo";

const PkDetails = ({ Pokemon, open, onOpen, onClose }) => {

    const [Species, setSpecies] = useState(null);
    const [EvolutionChain, setEvolutionChain] = useState(null);
    const Artwork = Pokemon.sprites.other["official-artwork"].front_default;
    const MainSprite = Pokemon.sprites.front_default;
    const [PokemonNames, setPokemonNames] = useState({
        'ja-Hrkt': '',
        'roomaji': '',
        'fr': '',
        'de': ''
    });


    useEffect(() => {
        if (Pokemon) {

            const fetchSpecies = async () => {
                if (Pokemon.species.url) {
                    const species = await fetchPokemonSpecies(Pokemon.species.url);
                    setSpecies(species);
                    findLanguages(['ja-Hrkt', 'roomaji', 'fr', 'de'], species.names);
                    const evolutionChain = await fetchPokemonEvolutionChain(`${species.evolution_chain.url}`);
                    setEvolutionChain(evolutionChain);
                }
            };

            fetchSpecies();
        }

    }, [Pokemon]);


    const fetchPokemonSpecies = async (url) => {
        const SpeciesInfo = fetch(url).then((res) => res.json()).then((data) => {
            return data;
        });

        return SpeciesInfo;
    };

    const fetchPokemonEvolutionChain = async (url) => {
        const EvolutionChain = fetch(url).then((res) => res.json()).then((data) => {
            // for (const step of data.chain.evolves_to) {

            // }
            return data;
        });

        return EvolutionChain;
    };

    const findLanguages = (languages, array) => {
        const updatedNames = { ...PokemonNames };
        for (const language of languages) {
            const findName = array.find((item) => item.language.name == language);
            updatedNames[language] = findName.name || "N/A";
        }
        setPokemonNames(updatedNames);
    };

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <IconButton onClick={onClose}>
                    <ChevronRightIcon />
                </IconButton>

            </Box>
            {Pokemon && (
                <Container sx={{ width: [300, 300, 600] }} >
                    <Box style={{ textAlign: "center", display: 'flex', justifyContent: 'center' }}>
                        {MainSprite && <img src={MainSprite} alt={`Sprite of ${Pokemon.name}`} className="poke-img-detailed" />}
                        <Typography variant="h6" sx={{ marginTop: 3 }}> {Pokemon.name} #{Pokemon.id}</Typography>
                    </Box>
                    <Divider />

                    <Grid container spacing={2} sx={{ marginTop: 1 }}>
                        <PkBasicInfo Pokemon={Pokemon} Species={Species} Artwork={Artwork} PokemonNames={PokemonNames} />
                    </Grid>

                    <Divider style={{ marginTop: 13 }} />

                    <Grid>

                    </Grid>

                </Container>
            )}
        </>
    );
};

export default PkDetails;
