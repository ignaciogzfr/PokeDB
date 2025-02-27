import React from "react";
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
const PkEvolutionChain = (EvolutionInfo) => {
    const { EvolutionChain } = EvolutionInfo;
    // console.log('Evo Chain', EvolutionChain);

    return (<>
        {EvolutionChain.evolves_to.length > 0 &&
            <Grid container>
                <Grid size={12} sx={{ textAlign: 'center' }}>
                    <Typography fontSize={16} fontWeight={600} sx={{ marginTop: 3, textAlign: 'center' }}>Evolution Chart</Typography>
                </Grid>
            </Grid>
        }
    </>);
};
export default PkEvolutionChain;