import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  Stack,
  Input,
} from '@pankod/refine-mui';
import { FormThemesProps } from 'interfaces/common';
import CustomButton from './CustomButton';
import BackdropLoader from './BackdropLoader';

import { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import { useTable } from '@pankod/refine-core';

export default function FormThemes({
  type,
  register,
  handleSubmit,

  formLoading,
  onFinishHandler,
}: FormThemesProps) {
  const {
    tableQueryResult: { data, isLoading, isError },
  } = useTable();
  const [sketchPickerOne, setSketchPickerOne] = useState('#FD8451');
  const [sketchPickerTwo, setSketchPickerTwo] = useState('#FFBD6F');
  useEffect(() => {
    data?.data.map((item) => {
      return (
        setSketchPickerOne(item.firstColor),
        setSketchPickerTwo(item.secondColor)
      );
    });
  }, [data?.data]);

  return (
    <Box>
      <BackdropLoader isOpen={formLoading} />
      <Typography
        fontSize={26}
        fontWeight={700}
        color='#11142D'>
        {type} a custom themes
      </Typography>
      <Box
        mt={2.5}
        borderRadius='15px'
        padding='20px'
        bgcolor='#fcfcfc'>
        <form
          style={{
            marginTop: '40px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
          onSubmit={handleSubmit(onFinishHandler)}>
          <Stack
            display='flex'
            direction='row'
            width='full'
            gap={4}>
            <Box>
              <Typography>Pick first color</Typography>
              <Box
                mt={2}
                bgcolor={sketchPickerOne}
                border='1px'
                borderColor='solid white'>
                <SketchPicker
                  color={sketchPickerOne}
                  onChange={(color) => {
                    setSketchPickerOne(color.hex);
                  }}
                />
              </Box>
            </Box>
            <Box>
              <Typography>Pick second color</Typography>
              <Box
                mt={2}
                bgcolor={sketchPickerTwo}
                border='1px'
                borderColor='solid white'>
                <SketchPicker
                  color={sketchPickerTwo}
                  onChange={(color) => {
                    setSketchPickerTwo(color.hex);
                  }}
                />
              </Box>
            </Box>
            <Stack>
              <Typography mb='16px'>your visualisasi on front end</Typography>
              <Stack
                display='flex'
                direction='column'
                justifyContent='center'
                alignItems='start'
                style={{
                  background: `linear-gradient(to bottom right, ${sketchPickerOne}, ${sketchPickerTwo})`,
                }}
                padding='30px 60px'
                width='600px'
                height='300px'>
                <Typography
                  fontSize='48px'
                  fontWeight='600'
                  color='#fff'>
                  Brand Name
                </Typography>
                <Typography
                  fontSize='20px'
                  color='#1e293b'>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem,
                  nam veritatis dolor ipsum consequuntur dolorem ipsam
                  blanditiis nobis cumque?
                </Typography>
              </Stack>
              <Stack
                direction='row'
                gap={6}>
                <Box>
                  <Typography>
                    first color{' '}
                    <Box
                      bgcolor={sketchPickerOne}
                      width='80px'
                      height='80px'></Box>
                    <Typography
                      display='inline-block'
                      fontWeight={600}
                      color='#111827'>
                      {sketchPickerOne}
                    </Typography>
                  </Typography>
                </Box>
                <Box>
                  <Typography>
                    second color{' '}
                    <Box
                      bgcolor={sketchPickerTwo}
                      width='80px'
                      height='80px'></Box>
                    <Typography
                      display='inline-block'
                      fontWeight={600}
                      color='#111827'>
                      {sketchPickerTwo}
                    </Typography>
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            display='flex'
            direction='row'
            width='full'
            gap={3}>
            <TextField
              id='outlined-controlled'
              {...register('firstColor', {
                required: true,
              })}
            />
            <TextField
              id='outlined-controlled'
              {...register('secondColor', {
                required: true,
              })}
            />
          </Stack>
          <Typography color='#ff1744'>
            Format must be HEX, just copy HEX code from color picker
          </Typography>
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
