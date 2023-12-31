import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface PlayerInfo {
  Name: string;
  SteamID: string;
  Connected: string;
  Ping: number;
  Loss: number;
  State: string;
  LastSeen: number;
}

interface PlayerTableComponentProps {
  players: PlayerInfo[];
}

function formatTimeDifference(timestamp: number) {
  const nowInSeconds = Math.floor(Date.now() / 1000);
  const secondsAgo = Math.floor(nowInSeconds - timestamp);

  if (secondsAgo < 10) {
    return 'now';
  }

  if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  }

  if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  }

  if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  }

  const daysAgo = Math.floor(secondsAgo / 86400);
  return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
}

function Row(props: { row: PlayerInfo }) {
  const { row } = props;
  const humanReadableTimeLastSeen = formatTimeDifference(row.LastSeen);

  return (
    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
      <TableCell component="th" scope="row">
        {row.Name}
      </TableCell>
      <TableCell align="right">{row.SteamID}</TableCell>
      <TableCell align="right">{row.Connected}</TableCell>
      <TableCell align="right">{row.Ping}</TableCell>
      <TableCell align="right">{row.Loss}</TableCell>
      <TableCell align="right">{row.State}</TableCell>
      <TableCell align="right">{humanReadableTimeLastSeen}</TableCell>
      <TableCell align="right">x</TableCell>
      <TableCell align="right">x</TableCell>
    </TableRow>
  );
}

export default function PlayerTableComponent({
  players,
}: PlayerTableComponentProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">SteamID</TableCell>
            <TableCell align="right">Connected</TableCell>
            <TableCell align="right">Ping</TableCell>
            <TableCell align="right">Loss</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">LastSeen</TableCell>
            <TableCell align="right">Team</TableCell>
            <TableCell align="right">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => (
            <Row key={player.SteamID} row={player} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
