import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import PokeLogo from '../../img/PokeLogo.png';
import { Typography } from "@mui/material";


export default function Header() {


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#cc323b', paddingY: 1, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <img src={PokeLogo} style={{ marginRight: 10, marginLeft: 10, maxWidth: 50 }} alt="PokeLogo"/>
                    <Typography variant="h6" component="div" sx={{ display: 'inline-block' }}>
                        PokeDB - Master Pokedex
                    </Typography>
                </Box>
            </AppBar >
        </Box >

    );
};