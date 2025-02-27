import React from "react";
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";


export default function PkBaseStats({ BaseStats }) {

    const findStat = (StatName) => {
        return BaseStats.find((item) => item.stat.name == StatName).base_stat;
    };

    return (<>


        <Grid container>
            <Grid size={12}>
                <Typography fontSize={16} fontWeight={600} sx={{ marginTop: 3, textAlign: 'center' }}>Base Stats</Typography>
            </Grid>
            <Grid size={{ xs: 6, md: 2 }} sx={{ marginY: 3, textAlign: 'center' }}>
                <Typography fontSize={14} fontWeight={500}> HP</Typography>
                <Typography fontSize={12}>{findStat('hp')}</Typography>
            </Grid>
            <Grid size={{ xs: 6, md: 2 }} sx={{ marginY: 3, textAlign: 'center' }}>
                <Typography fontSize={14} fontWeight={500}> Attack</Typography>
                <Typography fontSize={12}>{findStat('attack')}</Typography>
            </Grid>
            <Grid size={{ xs: 6, md: 2 }} sx={{ marginY: 3, textAlign: 'center' }}>
                <Typography fontSize={14} fontWeight={500}> Defense</Typography>
                <Typography fontSize={12}>{findStat('defense')}</Typography>
            </Grid>
            <Grid size={{ xs: 6, md: 2 }} sx={{ marginY: 3, textAlign: 'center' }}>
                <Typography fontSize={14} fontWeight={500}> Sp. Attack</Typography>
                <Typography fontSize={12}>{findStat('special-attack')}</Typography>
            </Grid>
            <Grid size={{ xs: 6, md: 2 }} sx={{ marginY: 3, textAlign: 'center' }}>
                <Typography fontSize={14} fontWeight={500}> Sp. Defense</Typography>
                <Typography fontSize={12}>{findStat('special-defense')}</Typography>
            </Grid>
            <Grid size={{ xs: 6, md: 2 }} sx={{ marginY: 3, textAlign: 'center' }}>
                <Typography fontSize={14} fontWeight={500}> Speed</Typography>
                <Typography fontSize={12}>{findStat('speed')}</Typography>
            </Grid>
        </Grid>

    </>);
}