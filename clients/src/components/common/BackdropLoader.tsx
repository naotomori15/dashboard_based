import { Backdrop, CircularProgress } from '@pankod/refine-mui';
import React from 'react';
import { BackdropLoaderCustom } from 'interfaces/common';
export default function BackdropLoader({ isOpen }: BackdropLoaderCustom) {
  return (
    <div>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={isOpen}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
}
