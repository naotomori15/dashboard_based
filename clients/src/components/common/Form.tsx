import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Stack,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from '@pankod/refine-mui';
import React from 'react';
import { FormProps } from 'interfaces/common';
import CustomButton from './CustomButton';
import SpinnerLoader from './SpinnerLoader';
import BackdropLoader from './BackdropLoader';

export default function Form({
  type,
  register,
  handleSubmit,
  handleImageChange,
  formLoading,
  onFinishHandler,
  propertyImage,
}: FormProps) {
  return (
    <Box>
      <BackdropLoader isOpen={formLoading} />
      <Typography
        fontSize={26}
        fontWeight={700}
        color='#11142D'>
        {type} a property
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
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: 16,
                color: '#11142D',
              }}>
              Enter property name
            </FormHelperText>
            <TextField
              fullWidth
              required
              id='outlined-basic'
              color='success'
              variant='outlined'
              {...register('title', {
                required: true,
              })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: 16,
                color: '#11142D',
              }}>
              Enter property description
            </FormHelperText>
            <TextareaAutosize
              minRows={5}
              required
              placeholder='write description'
              color='success'
              style={{
                width: '100%',
                fontSize: '16px',
                borderColor: 'rgba(0,0,0,0.23)',
                borderRadius: 6,
                padding: 10,
                color: '#919191',
              }}
              {...register('description', {
                required: true,
              })}
            />
          </FormControl>
          <Stack
            direction='row'
            gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: '10px 0',
                  fontSize: 16,
                  color: '#11142D',
                }}>
                Select Property Type
              </FormHelperText>
              <Select
                variant='outlined'
                color='success'
                displayEmpty
                required
                inputProps={{ 'aria-label': 'Without label' }}
                defaultValue='apartement'
                {...register('propertyType', {
                  required: true,
                })}>
                <MenuItem value='apartement'>Apartement</MenuItem>
                <MenuItem value='villa'>Villa </MenuItem>
                <MenuItem value='farmhouse'>Farmhouse</MenuItem>
                <MenuItem value='condos'>Condos</MenuItem>
                <MenuItem value='townhouse'>Townhouse</MenuItem>
                <MenuItem value='duplex'>Duplex</MenuItem>
                <MenuItem value='studio'>Studio</MenuItem>
                <MenuItem value='chalet'>Chalet</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: '10px 0',
                  fontSize: 16,
                  color: '#11142D',
                }}>
                Enter property price
              </FormHelperText>
              <TextField
                fullWidth
                required
                id='outlined-basic'
                color='success'
                type='number'
                variant='outlined'
                {...register('price', {
                  required: true,
                })}
              />
            </FormControl>
          </Stack>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: 16,
                color: '#11142D',
              }}>
              Enter property location
            </FormHelperText>
            <TextField
              fullWidth
              required
              id='outlined-basic'
              color='success'
              variant='outlined'
              {...register('location', {
                required: true,
              })}
            />
          </FormControl>
          <Stack
            direction='column'
            gap={1}
            justifyContent='center'
            mb={2}>
            <Stack
              direction='row'
              gap={2}>
              <Typography
                color='#11142D'
                fontWeight={500}
                my='10px'
                fontSize={16}>
                Property Photo
              </Typography>
              <Button
                component='label'
                sx={{
                  width: 'fit-content',
                  color: '#20a6a0',
                  textTransform: 'capitalize',
                  fontSize: 16,
                }}>
                Upload *
                <input
                  hidden
                  accept='image/**'
                  type='file'
                  onChange={(e) => {
                    // @ts-ignore
                    handleImageChange(e.target.files[0]);
                  }}
                />
              </Button>
            </Stack>
            <Typography
              fontSize={14}
              color='#808191'
              sx={{ wordBreak: 'break-all' }}>
              {propertyImage?.name}
            </Typography>
          </Stack>
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
