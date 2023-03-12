import { useTable } from '@pankod/refine-core';
import { Box, Stack, Skeleton } from '@pankod/refine-mui';
import { SkeletonLoadingCustom } from 'interfaces/common';
import React from 'react';

function SkeletonLoadingAllProperties() {
  const arrDummy = [0, 1, 2];
  return (
    <Box>
      <Stack spacing={1}>
        <Skeleton
          animation='wave'
          variant='text'
          sx={{ fontSize: '3rem', width: '300px', bgcolor: '#cbd5e1' }}
        />
      </Stack>
      <Stack
        direction='row'
        gap='4px'>
        <Skeleton
          animation='wave'
          variant='rounded'
          width={150}
          height={45}
          sx={{ bgcolor: '#cbd5e1' }}
        />{' '}
        <Skeleton
          animation='wave'
          variant='rounded'
          width={200}
          height={45}
          sx={{ bgcolor: '#cbd5e1' }}
        />
        <Skeleton
          animation='wave'
          variant='rounded'
          width={150}
          height={45}
          sx={{ bgcolor: '#cbd5e1' }}
        />
      </Stack>
      <Stack mt={2}>
        <Skeleton
          animation='wave'
          variant='rounded'
          width={150}
          height={45}
          sx={{ bgcolor: '#cbd5e1' }}
        />
      </Stack>
      <Box
        mt='20px'
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {arrDummy.map((_, index) => (
          <Box
            key={index}
            justifyContent='start'
            alignItems='center'
            flexDirection='column'
            sx={{
              width: 330,
              height: 310,
              bgcolor: '#e2e8f0',
              borderRadius: '4px',
              display: 'flex',
            }}>
            <Stack mt={1}>
              <Skeleton
                variant='rounded'
                animation='wave'
                width={310}
                height={150}
                sx={{ bgcolor: '#cbd5e1' }}
              />{' '}
              <Box
                mt='2px'
                sx={{ display: 'flex' }}
                justifyContent='space-between'>
                <Skeleton
                  animation='wave'
                  variant='text'
                  sx={{ fontSize: '1.2em', width: '175px', bgcolor: '#cbd5e1' }}
                />
                <Skeleton
                  animation='wave'
                  variant='text'
                  sx={{ fontSize: '1.2em', width: '75px', bgcolor: '#cbd5e1' }}
                />
              </Box>
              <Skeleton
                animation='wave'
                variant='text'
                sx={{ fontSize: '1.2em', width: '125px', bgcolor: '#cbd5e1' }}
              />
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
function SkeletonLoadingDetailProperties() {
  return (
    <Box
      bgcolor='#fcfcfc'
      width='fit-content'
      borderRadius='15px'
      padding='20px'>
      <Stack direction='column'>
        <Skeleton
          variant='text'
          animation='wave'
          sx={{ fontSize: '2em', bgcolor: '#cbd5e1' }}
          width={120}
        />
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
          <Skeleton
            variant='rounded'
            animation='wave'
            width={764}
            height={546}
            sx={{ bgcolor: '#cbd5e1' }}
          />
          <Box
            bgcolor='#cbd5e1'
            borderRadius='12px'
            width={326}
            height={352}
            alignItems='center'
            padding='32px'
            sx={{ display: 'flex', flexDirection: 'column' }}>
            <Skeleton
              variant='circular'
              animation='wave'
              width={70}
              height={70}
              sx={{ bgcolor: '#e2e8f0' }}
            />
            <Skeleton
              variant='text'
              animation='wave'
              width={180}
              sx={{ bgcolor: '#e2e8f0', fontSize: '1.2em', mt: 2 }}
            />
            <Skeleton
              variant='text'
              animation='wave'
              width={150}
              sx={{ bgcolor: '#e2e8f0', fontSize: '1.2em', mt: '2px' }}
            />
            <Skeleton
              variant='text'
              animation='wave'
              width={240}
              sx={{ bgcolor: '#e2e8f0', fontSize: '1.2em', mt: '6px' }}
            />
            <Skeleton
              variant='text'
              animation='wave'
              width={150}
              sx={{ bgcolor: '#e2e8f0', fontSize: '1.2em', mt: '4px' }}
            />
            <Stack
              direction='row'
              gap={2}
              mt={5}>
              <Skeleton
                animation='wave'
                variant='rounded'
                width={140}
                height={40}
                sx={{ bgcolor: '#e2e8f0' }}
              />{' '}
              <Skeleton
                animation='wave'
                variant='rounded'
                width={140}
                height={40}
                sx={{ bgcolor: '#e2e8f0' }}
              />
            </Stack>
          </Box>
          <Box
            width={746}
            justifyContent='space-between'
            sx={{ display: 'flex' }}>
            <Skeleton
              variant='text'
              animation='wave'
              sx={{ fontSize: '1.8em', bgcolor: '#cbd5e1' }}
              width={240}
            />
            <Skeleton
              variant='text'
              animation='wave'
              sx={{ fontSize: '1.8em', bgcolor: '#cbd5e1' }}
              width={240}
            />
          </Box>
          <Box
            width={746}
            justifyContent='space-between'
            sx={{ display: 'flex' }}>
            <Skeleton
              variant='text'
              animation='wave'
              sx={{ fontSize: '1.8em', bgcolor: '#cbd5e1' }}
              width={240}
            />
            <Skeleton
              variant='text'
              animation='wave'
              sx={{ fontSize: '1.8em', bgcolor: '#cbd5e1' }}
              width={240}
            />
          </Box>
        </Box>
        <Skeleton
          variant='text'
          animation='wave'
          sx={{ fontSize: '1.4em', bgcolor: '#cbd5e1', my: 1 }}
          width={200}
        />
        <Skeleton
          variant='text'
          animation='wave'
          sx={{ fontSize: '1em', bgcolor: '#cbd5e1' }}
          width={640}
        />
        <Skeleton
          variant='text'
          animation='wave'
          sx={{ fontSize: '1em', bgcolor: '#cbd5e1' }}
          width={500}
        />
        <Skeleton
          variant='text'
          animation='wave'
          sx={{ fontSize: '1em', bgcolor: '#cbd5e1' }}
          width={400}
        />
        <Skeleton
          variant='text'
          animation='wave'
          sx={{ fontSize: '1em', bgcolor: '#cbd5e1' }}
          width={260}
        />
      </Stack>
    </Box>
  );
}
export { SkeletonLoadingAllProperties, SkeletonLoadingDetailProperties };
