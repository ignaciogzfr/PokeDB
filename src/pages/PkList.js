import React, { useEffect, useState } from "react";
import PkTable from "../components/modules/PkTable";
import { Container } from "@mui/material";
import PkPresentation from "../components/modules/PkPresentation";

export default function PkList() {
    const [Pokemon, setPokemons] = useState([]);
    const Limit = 1025;
    const Offset = 0;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_POKEAPI_FETCH}?limit=${Limit}&offset=${Offset}`).then((res) => res.json()).then((data) => {
            setPokemons(data.results);
        });
    }, []);
    return (
        <Container maxWidth="lg" sx={{ backgroundColor: '#ffffff', paddingX: '10px' }}>
            <PkPresentation></PkPresentation>
            <PkTable PokeList={Pokemon}></PkTable>
        </Container>

    );
};