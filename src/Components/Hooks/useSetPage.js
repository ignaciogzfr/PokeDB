import { useEffect, useState } from "react";

const useSetPage = () => {

    const [FilteredPokemon, setFilteredPokemon] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [PokemonPage, setPokemonPage] = useState([]);
    const [PokemonCount, setPokemonCount] = useState(0);
    const [Page, setPage] = useState(0);
    const [PageSize, setPageSize] = useState(5);


    const updatePage = async (FilteredPokemon) => {
        setIsLoading(true);
        setPage(0);
        setPokemonPage(FilteredPokemon.slice(Page * PageSize, Page * PageSize + PageSize));
        setPokemonCount(FilteredPokemon.length);
        setFilteredPokemon(FilteredPokemon);
    };

    useEffect(() => {
        const updateTable = async () => {
            await updatePage(FilteredPokemon);
        };
        updateTable(FilteredPokemon);
    }, [FilteredPokemon]);

    const handleChangePage = (event, newPage) => {
        setIsLoading(true);
        if (PageSize === -1) return;
        setPokemonPage(FilteredPokemon.slice(newPage * PageSize, newPage * PageSize + PageSize));
        setPage(newPage);
    };

    const handleChangePageSize = (event) => {
        setIsLoading(true);
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
        setPokemonPage(FilteredPokemon.slice(0, event.target.value));
    };

    return {
        isLoading,
        FilteredPokemon,
        PokemonPage,
        PokemonCount,
        Page,
        PageSize,
        updatePage,
        handleChangePage,
        handleChangePageSize,
        setFilteredPokemon,
        setIsLoading
    };

};

export default useSetPage;