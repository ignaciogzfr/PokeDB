import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";


export default function Header() {


    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static" sx={{ backgroundColor: '#cc323b', paddingY: 1 }}>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="start">
                    <img src="./img/PokeLogo.png" style={{ marginRight: 10, marginLeft: 10 }}></img>
                    Master Pokedex
                </Typography>
            </AppBar>
        </Box>
    );
};