import React from "react";
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
const PkEvolutionChain = (EvolutionInfo) => {

    const { EvolutionChain } = EvolutionInfo;

    const getGridSize = (EvolutionAmount) => {
        return 100 / EvolutionAmount;
    };

    const getConditionText = (Conditions) => {
        const Details = Conditions.Details.map((detail) => {
            return detail.split(':');
        });

        let string = Conditions.Trigger + Details.filter((con) => con[0] !== 'trigger').map((detail) => {
            console.log('detail', detail);
            switch (detail[0]) {
                case 'min_level':
                    return ` to level ${detail[1]}`;
                case 'min_happiness':
                    return ` at happiness ${detail[1]}`;
                case 'item':
                    return Conditions.Trigger !== 'Use item' ? ` with ${detail[1]}` : ` ${detail[1]}`;
                case 'relative_physical_stats':
                    return detail[1] === '0' ? ' with same Attack and Defense' : detail[1] === '1' ? ' with Higher Attack than Defense' : ' with Lower Attack than Defense';
                case 'turn_upside_down':
                    return ' while holding the console upside down';
            }
        }).join(', ');

        return string;
    };


    const createEvolutionGrid = (Evolutions) => {

        return Evolutions.map((evolution, index) => {
            return (
                <>
                    {/* <Typography>{evolution.Conditions.Trigger} {getConditionText()}</Typography> */}
                    <Grid key={index} sx={{ justifyContent: 'center', textAlign: 'center', width: [`${getGridSize(EvolutionChain.EvolvesTo.length)}%`] }}>
                        <img src={evolution.Sprite}></img>
                        <Typography>{evolution.Name}</Typography>

                        <Typography fontSize={12}>{getConditionText(evolution.Conditions)}</Typography>
                    </Grid>
                    {
                        evolution.EvolvesTo.length > 0 &&
                        createEvolutionGrid(evolution.EvolvesTo)
                    }

                </>
            );
        });
    };


    return (
        <>
            {EvolutionChain.EvolvesTo.length > 0 &&
                <Grid container>
                    <Grid size={12} sx={{ textAlign: 'center' }}>
                        <img src={EvolutionChain.Sprite}></img>
                        <Typography>{EvolutionChain.Name}</Typography>
                    </Grid>
                    {createEvolutionGrid(EvolutionChain.EvolvesTo)}
                </Grid>
            }
        </>
    );

};
export default PkEvolutionChain;