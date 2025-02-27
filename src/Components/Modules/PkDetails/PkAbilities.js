import React from "react";
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';
import { Typography } from "@mui/material";

export default function PkAbilities({ Abilities }) {


    return (
        <Grid container spacing={2} size={12} sx={{ marginTop: 3 }}>
            
            <Grid size={{ xs: 12 }} sx={{ textAlign: 'center' }}>
                <Typography fontSize={16} fontWeight={600} sx={{ marginTop: 3, textAlign: 'center' }}>Abilities</Typography>
                {Abilities.map((ability, index) => {
                    return (
                        <Grid sx={{ alignItems: 'center', marginBottom: 3 }}>
                            <Typography sx={{ textAlign: 'left', fontSize: 14, }} fontWeight={500} fontSize={14}> {ability.name} {ability.hidden && '(Hidden)'} </Typography>
                            {ability.effect && <Typography sx={{ textAlign: 'left', marginTop: 2, marginLeft: 2 }} fontWeight={400} fontSize={13}> {ability.effect}</Typography>}
                        </Grid>
                    );
                }
                )}
            </Grid>
        </Grid>
    );
}