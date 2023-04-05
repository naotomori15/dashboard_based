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
} from '@pankod/refine-mui';

import { FormProps } from 'interfaces/common';
import CustomButton from './CustomButton';

import BackdropLoader from './BackdropLoader';

export default function FormHero({
  type,
  register,
  handleSubmit,
  handleImageChange,
  formLoading,
  onFinishHandler,
  image,
}: FormProps) {
  return (
    <Box>
      <BackdropLoader isOpen={formLoading} />
      <Typography
        fontSize={26}
        fontWeight={700}
        color='#11142D'>
        {type} a hero
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
              Enter hero title
            </FormHelperText>
            <TextField
              fullWidth
              required
              id='outlined-basic'
              color='success'
              placeholder='your brand'
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
              Enter hero description
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
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: 16,
                color: '#11142D',
              }}>
              Enter hero email
            </FormHelperText>
            <TextField
              fullWidth
              required
              type='email'
              id='outlined-basic'
              color='success'
              placeholder='johndoe@gmail.com'
              variant='outlined'
              {...register('emailUI', {
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
              Enter hero number
            </FormHelperText>
            <TextField
              fullWidth
              required
              type='number'
              id='outlined-basic'
              color='success'
              placeholder='8124232432'
              variant='outlined'
              {...register('telp', {
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
                Hero Photo
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
              {image?.name}
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
