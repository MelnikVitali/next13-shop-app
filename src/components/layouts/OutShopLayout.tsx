'use client';
import { Typography, Box } from '@mui/material';
import { SideMenu } from '@/components/ui/SideMenu';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ScrollToTop from 'react-scroll-to-top';
import useMediaQuery from '@mui/material/useMediaQuery';
import AdminNavbar from '../ui/AdminNavbar';
import React, { FC } from 'react';

interface Props {
  title?: string;
  subTitle?: string;
  icon?: JSX.Element;
  children: React.ReactNode;
}

const OutShopLayout: FC<Props> = ({ children, title, subTitle, icon }) => {
  const matches = useMediaQuery('(min-width:768px)');

  return (
    <>
      <nav>
        <AdminNavbar />
      </nav>

      <SideMenu />
      <main className='container'>
        {title && subTitle && (
          <Box display='flex' flexDirection='column'>
            <Typography variant='h1' component='h1'>
              {icon}
              {title}
            </Typography>
            <Typography variant='h2' sx={{ mb: 1 }}>
              {subTitle}
            </Typography>
          </Box>
        )}

        <Box className='fadeIn'>{children}</Box>
      </main>
      {matches && (
        <ScrollToTop smooth component={<ArrowUpwardIcon color='primary' />}>
          ArrowUpwardIcon
        </ScrollToTop>
      )}
    </>
  );
};

export default OutShopLayout;
