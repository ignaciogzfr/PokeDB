import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import { Container, Typography } from "@mui/material";
import PkBasicInfo from "./PkBasicInfo";
import PkEvolutionChain from "./PkEvolutionChain";
import PkAbilities from "./PkAbilities";
import PkBaseStats from "./PkBaseStats";
import PkMoveList from "./PkMoveList";
import PkTmList from "./PkTmList";
import PkEggMoves from "./PkEggMoves";
import MovesDictionary from "../../../MovesDictionary";

const PkDetails = ({ Pokemon, open, onOpen, onClose }) => {

    const [Species, setSpecies] = useState(null);
    const [EvolutionChain, setEvolutionChain] = useState(null);
    const [Abilities, setAbilities] = useState([]);
    const [PokemonNames, setPokemonNames] = useState({
        'ja-Hrkt': '',
        'roomaji': '',
        'fr': '',
        'de': ''
    });
    const [Moves, setMoves] = useState([]);
    const [TMMoves, setTMMoves] = useState([]);
    const [EggMoves, setEggMoves] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const Artwork = Pokemon.sprites.other["official-artwork"].front_default;
    const MainSprite = Pokemon.sprites.front_default;


    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    const removeDashes = (str) => str.replace(/-+/g, ' ');

    useEffect(() => {
        if (Pokemon) {
            console.log('Pokemon', Pokemon);


            const fetchDetails = async () => {
                const species = await fetchPokemonSpecies(Pokemon.species.url);
                setSpecies(species);
                findLanguages(['ja-Hrkt', 'roomaji', 'fr', 'de'], species.names);
                const evolutionChain = await fetchPokemonEvolutionChain(`${species.evolution_chain.url}`);
                setEvolutionChain(evolutionChain);
                const abilities = await fetchAbilities(Pokemon.abilities);
                setAbilities(abilities);
                await fetchMoves(Pokemon.moves);


            };

            fetchDetails();
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
            const asyncFetchSpecies = async () => {
                for (const step of data.chain.evolves_to) {
                    step.species = await fetchPokemonSpecies(step.species.url);
                }
            };
            asyncFetchSpecies();
            return data.chain;
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

    const fetchAbilities = async (abilities) => {
        const newAbilities = [];

        for (const ability of abilities) {

            const response = await fetch(ability.ability.url);
            const data = await response.json();
            const findEntryEN = data.effect_entries.find(entry => entry.language.name === 'en');
            newAbilities.push({ ...ability.ability, effect: findEntryEN.effect, hidden: ability.is_hidden, name: capitalize(ability.ability.name) });
        }

        return newAbilities;
    };

    const fetchMoves = async (moves) => {
        const LevelUp = [];
        const TMs = [];
        const Egg = [];
        for (const move of moves) {
            const response = await fetch(move.move.url);
            const findMove = await response.json();

            const FilterFlavorText = findMove.flavor_text_entries.filter((entry) => entry.language.name === 'en');
            const moveInfo = {
                ID: findMove.id,
                Name: removeDashes(capitalize(findMove.name)),
                Type: MovesDictionary[findMove.type.name],
                Category: MovesDictionary[findMove.damage_class.name],
                Power: findMove.power ?? "-",
                PP: findMove.pp ?? "-",
                Accuracy: findMove.accuracy ?? "-",
                EffectChance: findMove.effect_chance ?? "-",
                FlavorText: FilterFlavorText[FilterFlavorText.length - 1]?.flavor_text,
            };

            const isLevelUpMove = move.version_group_details.find((version) => { return version.move_learn_method.name === 'level-up' && version.version_group.name === 'scarlet-violet'; });
            const isTMMove = move.version_group_details.find((version) => { return version.move_learn_method.name === 'machine' && version.version_group.name === 'scarlet-violet'; });
            const isEggMove = move.version_group_details.find((version) => { return version.move_learn_method.name === 'egg' && version.version_group.name === 'scarlet-violet'; });
            const isMoveInArray = (Array) => {
                return Array.find((item) => item.ID === moveInfo.ID);
            };
            if (isLevelUpMove && !isMoveInArray(LevelUp)) {
                LevelUp.push({ ...moveInfo, LearnedAt: isLevelUpMove.level_learned_at });
            }
            if (isTMMove && !isMoveInArray(TMs)) {

                const ScarletVioletTM = findMove.machines.find((item) => item.version_group.name === 'scarlet-violet');
                await fetch(ScarletVioletTM.machine.url).then((res) => res.json()).then((data) => {
                    TMs.push({ ...moveInfo, TM: data.item.name.replace("tm", "") });
                    
                    return data;
                });
                

            }
            if (isEggMove && !isMoveInArray(Egg)) {
                Egg.push(moveInfo);
            }

        }

        setMoves(LevelUp.sort((a, b) => a.LearnedAt - b.LearnedAt));
        setTMMoves(TMs.sort((a, b) => a.TM - b.TM));
        setEggMoves(Egg);
        setIsLoading(false);
    };

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <IconButton onClick={onClose}>
                    <ChevronRightIcon />
                </IconButton>

            </Box>
            {Pokemon && isLoading === false && (
                <Container sx={{ width: [300, 500, 900] }} >
                    <Box style={{ textAlign: "center", display: 'flex', justifyContent: 'center' }}>
                        {MainSprite && <img src={MainSprite} alt={`Sprite of ${Pokemon.name}`} className="poke-img-detailed" />}
                        <Typography variant="h6" sx={{ marginTop: 3 }}> {Pokemon.name} #{Pokemon.id}</Typography>
                    </Box>
                    <Divider />

                    {Species && <Grid container spacing={2} sx={{ marginTop: 1 }}>
                        <PkBasicInfo Pokemon={Pokemon} Species={Species} Artwork={Artwork} PokemonNames={PokemonNames} />
                    </Grid>}


                    {EvolutionChain &&
                        <>
                            <Divider style={{ marginTop: 13 }} />
                            <Grid>
                                <PkEvolutionChain EvolutionChain={EvolutionChain}></PkEvolutionChain>
                            </Grid>
                        </>
                    }

                    <Divider style={{ marginTop: 13 }} />

                    {Abilities && <PkAbilities Abilities={Abilities} />}

                    <Divider style={{ marginTop: 13 }} />

                    <PkBaseStats BaseStats={Pokemon.stats}></PkBaseStats>

                    <Divider style={{ marginTop: 13 }} />

                    <PkMoveList Moves={Moves}>

                    </PkMoveList>

                    <PkTmList Moves={TMMoves}>

                    </PkTmList>

                    <PkEggMoves Moves={EggMoves}>

                    </PkEggMoves>


                </Container >
            )}
        </>
    );
};

export default PkDetails;
