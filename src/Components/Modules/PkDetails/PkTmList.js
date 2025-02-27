import React from "react";
import Grid from '@mui/material/Grid2';
import { Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
export default function PkTmList({ Moves }) {


    return (
        <>
            <Grid size={12} sx={{ textAlign: 'center' }}>
                <Typography fontSize={16} fontWeight={600} sx={{ marginTop: 3, textAlign: 'center' }}>Moves Learned by TMs</Typography>
            </Grid>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>TM</TableCell>
                            <TableCell>Attack</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Cat.</TableCell>
                            <TableCell>Power</TableCell>
                            <TableCell>Acc</TableCell>
                            <TableCell>PP</TableCell>
                            <TableCell>Effect %</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Moves.map((Move) => (
                            <>
                                <TableRow key={Move.ID} >
                                    <TableCell rowSpan={2}>{Move.TM}</TableCell>
                                    <TableCell rowSpan={2}>{Move.Name}</TableCell>
                                    <TableCell><img src={Move.Type}></img></TableCell>
                                    <TableCell ><img src={Move.Category}></img></TableCell>
                                    <TableCell >{Move.Power}</TableCell>
                                    <TableCell >{Move.Accuracy}</TableCell>
                                    <TableCell >{Move.PP}</TableCell>
                                    <TableCell >{Move.EffectChance}</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell colSpan={6}>{Move.FlavorText}</TableCell>
                                </TableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}