import { Box, Typography, Stack } from '@pankod/refine-mui';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ArrowCircleUpRounded } from '@mui/icons-material';
import { TotalRevenueOptions, TotalRevenueSeries } from './chart.config';

export default function TotalRevenue() {
  return (
    <Box
      p={4}
      flex={1}
      bgcolor='#fcfcfc'
      id='chart'
      display='flex'
      flexDirection='column'
      borderRadius='15px'>
      <Typography
        fontSize={18}
        fontWeight={600}
        color='#11142D'>
        Total Revenue
      </Typography>
      <Stack
        my='20px'
        direction='row'
        gap={4}
        flexWrap='wrap'>
        <Typography
          fontSize={28}
          fontWeight={700}
          color='#11142D'>
          $233,555
        </Typography>
        <Stack
          direction='row'
          alignItems='center'
          gap={1}>
          <ArrowCircleUpRounded sx={{ fontSize: 24, color: '#20a6a0' }} />
          <Stack>
            <Typography
              fontSize={15}
              color='#20a6a0'>
              0.08%
            </Typography>
            <Typography
              fontSize={15}
              color='#808191'>
              Than Last Month
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <ReactApexChart
        series={TotalRevenueSeries}
        type='bar'
        height={310}
        options={TotalRevenueOptions}
      />
    </Box>
  );
}
