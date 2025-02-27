import React from "react";
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Autocomplete, TableFooter, TablePagination } from "@mui/material";
import TextField from '@mui/material/TextField';
import useSetPage from "../Hooks/useSetPage";
import PkDetails from "./PkDetails/PkDetails";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

export default function PkTable(PokeList) {

    const [Pokemon, setPokemon] = useState([]);
    const [DataList, setDataList] = useState([]);

    const [openDrawer, setOpenDrawer] = useState(false);
    const [SelectedPokemon, setSelectedPokemon] = useState({});


    const {
        isLoading,
        PokemonPage,
        PokemonCount,
        Page,
        PageSize,
        setFilteredPokemon,
        handleChangePage,
        handleChangePageSize,
        setIsLoading
    } = useSetPage([], 5);

    useEffect(() => {

        const PkPromise = async () => {
            await callFormatPokemon(PokeList, true);
        };

        PkPromise();

    }, [PokeList]);

    useEffect(() => {
        setIsLoading(false);
    }, [PokemonPage]);

    const toggleDrawer = (open) => (event) => {
        setOpenDrawer(open);
    };

    const callFormatPokemon = async (Pokemon) => {

        const formattedPokemon = await formatPokemon(Pokemon);
        setPokemon(formattedPokemon);
        setFilteredPokemon(formattedPokemon);

        return true;
    };


    const handleNameFilter = (inputValue) => {

        const searchTerm = inputValue.toLowerCase();
        const filteredPokemon = Pokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm));
        setFilteredPokemon(filteredPokemon);
        if (inputValue.length > 2) {
            const labeledPokemon = filteredPokemon.map((pokemon) => { return { label: pokemon.name }; });
            setDataList(filteredPokemon.map((pokemon) => { return { label: pokemon.name }; }));
            DataList.push(...labeledPokemon);
        } else {
            setDataList([]);
        }
    };


    const formatPokemon = async (List) => {
        return await Promise.all(List.PokeList.map((pokemon) => {
            return fetchPokemonURL(pokemon.url);
        }));
    };

    const fetchPokemonURL = async (url) => {
        const PkInfo = fetch(url).then((res) => res.json()).then(async (data) => {

            const types = data.types.map((type) => {
                const typeUrl = type.type.url.split("/");
                const typeNumber = typeUrl[typeUrl.length - 2];
                return `${process.env.REACT_APP_POKEAPI_TYPE_SPRITE}/${typeNumber}.png`;
            });

            const formattedName = data.name[0].toUpperCase() + data.name.slice(1).toLowerCase().replace(/-/g, " ");
            const paddedId = data.id.toString().padStart(4, "0");
            return { ...data, types, name: formattedName, id: paddedId };
        });

        return PkInfo;
    };

    const callDetails = (Pokemon) => {

        setSelectedPokemon(Pokemon);
        setOpenDrawer(true);
    };


    return (
        <>
            <SwipeableDrawer
                anchor="right"
                open={openDrawer}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {openDrawer && <PkDetails Pokemon={SelectedPokemon} open={openDrawer} onOpen={toggleDrawer(true)} onClose={toggleDrawer(false)} />}
            </SwipeableDrawer >
            <Autocomplete
                options={DataList}
                freeSolo
                disableClearable
                sx={{ width: 200 }}
                onInputChange={(e, inputValue) => handleNameFilter(inputValue)}
                renderInput={(params) =>
                    <TextField {...params} variant="outlined" placeholder="Pikachu" size="small" />
                } />

            {isLoading && <CircularProgress size={80} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />}

            {!isLoading && <TableContainer component={Paper} sx={{ marginY: 2, paddingY: 2 }}>

                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Pokemon</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>#</TableCell>
                            <TableCell>Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <>
                        <TableBody>
                            {PokemonPage.map((row) => {

                                return (
                                    <TableRow key={row.id} onClick={() => callDetails(row)} hover sx={{ cursor: 'pointer' }}>
                                        <TableCell>
                                            {/* Pokedex number + front sprite */}
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <img src={row.sprites.front_default} alt={`Sprite of ${row.name}`} className="poke-img" />
                                            </Box>

                                        </TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>
                                            {row.types.map((type, index) => (
                                                <img src={type} alt={type} className="type-img" />
                                            ))}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                            }

                        </TableBody>
                    </>
                    <TableFooter>
                        <TablePagination
                            count={PokemonCount}
                            page={Page}
                            rowsPerPageOptions={[5, 10, 25, 50, { value: -1, label: 'All' }]}
                            rowsPerPage={PageSize}
                            labelRowsPerPage='Pokemon per page'
                            showFirstButton
                            showLastButton
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangePageSize}
                        />
                    </TableFooter>
                </Table>
            </TableContainer>
            }

        </>
    );
};