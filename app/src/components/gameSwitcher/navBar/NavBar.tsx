import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { INavBarProps } from './INavBarProps';

export function NavBar(props: INavBarProps) {

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    props.setSelected(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={props.selected} onChange={handleChange} centered>
          <Tab label="Tic-Tac-Toe" />
          <Tab label="Snake" />
        </Tabs>
      </Box>
    </Box>
  );
}
