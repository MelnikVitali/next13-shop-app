import { FC } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';

interface Props {
  title: string | number;
  subTitle: string;
  icon: JSX.Element;
}

export const SummaryTile: FC<Props> = ({ title, subTitle, icon }) => {
  return (
    // <Grid item xs={12} sm={4} md={3}>
    <Grid item xs={12}>
      <Card sx={{ display: 'flex', backgroundColor: 'lightgray' }}>
        <CardContent
          sx={{ ml: 4, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {icon}
        </CardContent>
        <CardContent sx={{ ml: 4, flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h3'>{title}</Typography>
          <Typography variant='body2'>{subTitle}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
