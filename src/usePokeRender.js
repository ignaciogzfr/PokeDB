import { useState } from "react";

export default function usePokeAPI(limit, offset, Pokemon) {
    const [Pokemon, setPokemons] = useState([]);

    useEffect(() => {
        if (limit || offset) {
            fetch(`${process.env.REACT_APP_POKEAPI_FETCH}?limit=${limit}&offset=${offset}`).then((res) => res.json()).then((data) => {
                setPokemons(data.results);
            });
        }
        if(Pokemon){
            fetch
        }
    }, []);

    return Pokemon;
}