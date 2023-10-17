'use client';
import Link from 'next/link';
import { AppBar, Box, Button, Link as MuiLink, Toolbar, Typography } from '@mui/material';
import { useAppDispatch } from '@/redux/hooks';
import { toggleSideMenu } from '@/redux/slices/sideMenuSlice';
import { ThemeToggle } from './ThemeToggle';

const AdminNavbar = () => {
  const dispatch = useAppDispatch();

  return (
    <AppBar>
      <Toolbar>
        <>
          <MuiLink component={Link} href='/' display='flex' alignItems='center'>
            <Typography variant='h6'>Next App |</Typography>
            <Typography sx={{ ml: 0.5, mt: 0.5 }}>Shop</Typography>
          </MuiLink>
        </>

        <Box flex={1} />
        <ThemeToggle />

        <Button onClick={() => dispatch(toggleSideMenu())}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
export default AdminNavbar;
