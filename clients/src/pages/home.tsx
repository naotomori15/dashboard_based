import { useList, useTable } from '@pankod/refine-core';
import React from 'react';
import {
  PieChart,
  PropertyRefferal,
  TotalRevenue,
  ProductCard,
} from 'components';

import { Box, Typography, Stack } from '@pankod/refine-mui';
import BackdropLoader from 'components/common/BackdropLoader';
import CustomErrorComponent from 'components/common/CustomErrorComponent';

export default function Home() {
  const {
    tableQueryResult: { data, isLoading, isError },
  } = useTable({
    resource: 'products',
  });
  const latestProducts = data?.data ?? [];
  console.log(latestProducts);
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
          title='Total Products'
          value={latestProducts.length}
          series={[75, 25]}
          colors={['#20a6a0', '#2be9e0']}
        />
      </Box>
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
          Latest Products
        </Typography>
        <Box
          mt={2.5}
          sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {latestProducts.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              title={product.title}
              photo={product.photo}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
