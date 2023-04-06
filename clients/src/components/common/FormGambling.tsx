import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Input,
  Checkbox,
} from '@pankod/refine-mui';

import { FormPropsGambling } from 'interfaces/common';
import CustomButton from './CustomButton';

import BackdropLoader from './BackdropLoader';
import { useState, useEffect } from 'react';
import { useTable } from '@pankod/refine-core';

export default function FormGambling({
  type,
  register,
  handleSubmit,
  formLoading,
  onFinishHandler,
}: FormPropsGambling) {
  const {
    tableQueryResult: { data, isLoading, isError },
  } = useTable();
  const allGamblings: any = data?.data ?? [];
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };
  console.log(checked);
  return (
    <Box>
      <BackdropLoader isOpen={formLoading} />
      <Typography
        fontSize={26}
        fontWeight={700}
        color='#11142D'>
        {type} a gambling
      </Typography>
      <Box
        mt={2.5}
        borderRadius='15px'
        padding='20px'
        bgcolor='#fcfcfc'>
        <form
          style={{
            marginTop: '20px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
          onSubmit={handleSubmit(onFinishHandler)}>
          {allGamblings < 1 ? (
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={checked}
                    onClick={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                    {...register('isGambling')}
                  />
                }
                label={checked ? 'ON' : 'OFF'}
              />
            </FormGroup>
          ) : (
            allGamblings?.map((item: any) =>
              item.isGambling ? (
                checked ? (
                  <FormGroup key={item._id}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={false}
                          onClick={handleChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                          {...register('isGambling')}
                        />
                      }
                      label='OFF'
                    />
                  </FormGroup>
                ) : (
                  <FormGroup key={item._id}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={true}
                          onClick={handleChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                          {...register('isGambling')}
                        />
                      }
                      label='ON'
                    />
                  </FormGroup>
                )
              ) : checked ? (
                <FormGroup key={item._id}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={true}
                        onClick={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        {...register('isGambling')}
                      />
                    }
                    label='ON'
                  />
                </FormGroup>
              ) : (
                <FormGroup key={item._id}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={false}
                        onClick={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        {...register('isGambling')}
                      />
                    }
                    label='OFF'
                  />
                </FormGroup>
              )
            )
          )}
          <CustomButton
            type='submit'
            title={formLoading ? '...' : 'Submit'}
            backgroundColor='#20a6a0'
            color='#fcfcfc'
          />
        </form>
      </Box>
    </Box>
  );
}
