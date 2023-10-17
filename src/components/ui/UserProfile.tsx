/* eslint-disable @next/next/no-img-element */
'use client';
import {
  BadgeOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
  SellOutlined,
} from '@mui/icons-material';
import { useSession } from 'next-auth/react';
import { Grid } from '@mui/material';
import { SummaryTile } from './SummaryTile';

const UserProfile = () => {
  const { data: session }: any = useSession();

  return (
    <>
      <Grid container spacing={1}>
        <SummaryTile
          title={session?.user.email}
          subTitle={'Email'}
          icon={<GroupOutlined color='success' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={session?.user.name}
          subTitle={'Name'}
          icon={<BadgeOutlined color='warning' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={session?.user.role}
          subTitle={'Role'}
          icon={<SellOutlined color='error' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={new Date(session?.user.createdAt).toLocaleString()}
          subTitle={'Creation date'}
          icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />}
        />
      </Grid>
    </>
  );
};

export default UserProfile;
