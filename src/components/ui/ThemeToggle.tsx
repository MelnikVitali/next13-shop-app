'use client';
import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeToggleContext } from '@/context/ThemeToggleContext';

export function ThemeToggle() {
  // check theme is dark or light
  const theme = useTheme();

  const themeToggle = useContext(ThemeToggleContext);

  return (
    <IconButton sx={{ mr: 2, fontSize: '30px' }} onClick={themeToggle.toggleColorMode}>
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
