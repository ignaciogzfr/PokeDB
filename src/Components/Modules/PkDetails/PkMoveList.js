import React from "react";
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";

export default function PkMoveList({ Moves }) {
    return (
        <>
            <Grid container>
                <Grid size={12}>
                    <Typography fontSize={16} fontWeight={600} sx={{ marginTop: 3, textAlign: 'center' }}>Base Stats</Typography>
                </Grid>
            </Grid>
        </>
    );
}