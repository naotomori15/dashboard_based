import { useList } from '@pankod/refine-core';
import React from 'react';
import {
  PieChart,
  PropertyRefferal,
  TotalRevenue,
  TopAgents,
  PropertyCard,
} from 'components';

import { Box, Typography, Stack } from '@pankod/refine-mui';
import BackdropLoader from 'components/common/BackdropLoader';
import CustomErrorComponent from 'components/common/CustomErrorComponent';

export default function Home() {
  const { data, isLoading, isError } = useList({
    resource: 'properties',
    config: {
      pagination: {
        pageSize: 4,
      },
    },
  });
  const latestProperties = data?.data ?? [];
  console.log(latestProperties);
  if (isLoading) return <BackdropLoader isOpen={isLoading} />;
  if (isError) return <CustomErrorComponent />;
  return (
    <Box>
      <Typography
        fontSize={25}
        fontWeight={700}
        color='#11142D'>
        Dashboard
      </Typography>
      <Box
        mt='20px'
        display='flex'
        flexWrap='wrap'
        gap={4}>
        <PieChart
          title='Properties for Sale'
          value={684}
          series={[75, 25]}
          colors={['#20a6a0', '#2be9e0']}
        />
        <PieChart
          title='Properties for rent'
          value={550}
          series={[60, 40]}
          colors={['#20a6a0', '#2be9e0']}
        />
        <PieChart
          title='Total Customers'
          value={5540}
          series={[75, 25]}
          colors={['#20a6a0', '#2be9e0']}
        />
        <PieChart
          title='Properties for cities'
          value={55}
          series={[75, 25]}
          colors={['#20a6a0', '#2be9e0']}
        />
      </Box>
      <Stack
        mt='25px'
        width='100%'
        gap={2}
        direction={{ xs: 'column', lg: 'row' }}>
        <TotalRevenue />
        <PropertyRefferal />
      </Stack>
      <Box
        flex={1}
        borderRadius='15px'
        padding='20px'
        bgcolor='#fcfcfc'
        display='flex'
        flexDirection='column'
        minWidth='100%'
        mt='25px'>
        <Typography
          fontSize='18px'
          fontWeight={600}
          color='#11142D'>
          Latest Properties
        </Typography>
        <Box
          mt={2.5}
          sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {latestProperties.map((property) => (
            <PropertyCard
              key={property._id}
              id={property._id}
              title={property.title}
              location={property.location}
              price={property.price}
              photo={property.photo}
              propertyType={property.propertyType}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
