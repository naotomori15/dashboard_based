import { Stack, CircularProgress } from '@pankod/refine-mui';
import React from 'react';

export default function SpinnerLoader() {
  return (
    <Stack sx={{ color: '#fff' }}>
      <CircularProgress color='inherit' />
    </Stack>
  );
}
