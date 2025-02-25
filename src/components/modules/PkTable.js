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


export default function PkTable(PokeList) {

    const [Pokemon, setPokemon] = useState([]);
    const [FilteredPokemon, setFilteredPokemon] = useState([]);
    const [PokemonPage, setPokemonPage] = useState([]);
    const [PokemonCount, setPokemonCount] = useState(0);

    const [isLoading, setIsLoading] = useState(true);
    const [Page, setPage] = useState(0);
    const [PageSize, setPageSize] = useState(5);
    const [DataList, setDataList] = useState([]);

    const [loadingImages, setLoadingImages] = useState(false);
    const [rowsLoaded, setRowsLoaded] = useState({});

    useEffect(() => {

        const PkPromise = async () => {
            await callFormatPokemon(PokeList, true);
        };

        PkPromise();

    }, [PokeList]);

    useEffect(() => {

        const rowsToLoad = PokemonPage.filter((pokemon) => !rowsLoaded[pokemon.id]);
        if (rowsToLoad.length === PokemonPage.length) {
            setLoadingImages(false);
        }
    }, [rowsLoaded, PokemonPage]);

    const callFormatPokemon = async (Pokemon) => {

        const formattedPokemon = await formatPokemon(Pokemon);
        setPokemon(formattedPokemon);
        setPokemonPage(formattedPokemon.slice(0, PageSize));
        setPage(0);
        setIsLoading(false);
        setPokemonCount(formattedPokemon.length);
        return true;
    };

    const handleChangePage = (event, newPage) => {
        console.log('change page (event, newPage, pageSize)', event, newPage, PageSize);
        if (PageSize === -1) return;
        setPokemonPage(FilteredPokemon.slice(newPage * PageSize, newPage * PageSize + PageSize));
        setLoadingImages(true);
        setRowsLoaded({});
        setPage(newPage);
    };

    const handleChangePageSize = (event) => {
        const newPageSize = event.target.value;
        setLoadingImages(true);
        setRowsLoaded({});
        setPage(0);
        console.log('change page size', event);

        if (event.target.value === -1) {
            setPageSize(-1);
            setPokemonPage(Pokemon);
            setPage(0);
            setIsLoading(false);
            return;
        };

        setPageSize(newPageSize);
        setPokemonPage(FilteredPokemon.slice(0, newPageSize));
        setIsLoading(false);
    };

    const handleNameFilter = (event) => {
        const searchTerm = event.toLowerCase();
        console.log('searchTerm', searchTerm, searchTerm.length);
        console.log('Pokemon', Pokemon);

        const filteredPokemon = Pokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm));
        setPage(0);
        setPokemonPage(filteredPokemon.slice(0, PageSize));
        setPokemonCount(filteredPokemon.length);
        setFilteredPokemon(filteredPokemon);
        if (event.length > 2) {
            setDataList(filteredPokemon);
            console.log('dataList', DataList);
        }

    };


    const formatPokemon = async (List) => {
        return await Promise.all(List.PokeList.map((pokemon) => {
            return fetchPokemonURL(pokemon.url);
        }));
    };

    const fetchPokemonURL = async (url) => {
        const PkInfo = fetch(url).then((res) => res.json()).then((data) => {
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

    const handleImageLoad = (id) => {
        setRowsLoaded({ ...rowsLoaded, [id]: true });
    };

    return (
        <>
            <Autocomplete
                options={DataList.map((option) => { return { label: option.name }; })}
                freeSolo
                disableClearable
                sx={{ width: 200 }}

                renderInput={(params) =>
                    <TextField {...params} variant="outlined" placeholder="Pikachu" size="small"
                        slotProps={{
                            input: {
                                ...params.inputProps,
                                onChange: (e) => handleNameFilter(e.target.value),
                            }
                        }}
                    />
                } />
            <TableContainer component={Paper} sx={{ marginY: 2, paddingY: 2 }}>

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
                        {isLoading || loadingImages ? (
                            <CircularProgress size={80} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                        ) : (
                            <TableBody>
                                {PokemonPage.map((row) => {

                                    if (!row || !row.sprites || !row.sprites.front_default) {
                                        return null; // Skip rendering this row
                                    }

                                    return (
                                        <TableRow key={row.id} onClick={() => console.log(row)}>
                                            <TableCell>
                                                {/* Pokedex number + front sprite */}
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <img src={row.sprites.front_default} alt={`Sprite of ${row.name}`} onLoad={() => handleImageLoad(row.id)} className="poke-img" />
                                                </Box>

                                            </TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>
                                                {row.types.map((type, index) => (
                                                    <span key={index} style={{ marginRight: '10px' }}>
                                                        <img src={type} alt={type} className="type-img" onLoad={() => handleImageLoad(`${row.id}-type-${index}`)} />
                                                    </span>
                                                ))}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        )}
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
        </>
    );
};