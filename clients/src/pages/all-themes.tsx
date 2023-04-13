import { Add, Edit } from '@mui/icons-material';
import { useTable } from '@pankod/refine-core';
import {
  FormGroup,
  FormControlLabel,
  Switch,
  Stack,
  Box,
  Typography,
} from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';
import { CustomButton, GamblingCard } from 'components';
import BackdropLoader from 'components/common/BackdropLoader';
import CustomErrorComponent from 'components/common/CustomErrorComponent';

export default function AllThemes() {
  const navigate = useNavigate();
  const {
    tableQueryResult: { data, isLoading, isError },
  } = useTable();
  const allThemes = data?.data ?? [];
  console.log(allThemes);
  if (isLoading) return <BackdropLoader isOpen={isLoading} />;
  if (isError) return <CustomErrorComponent />;
  return (
    <div>
      <Stack
        mt={2}
        direction='row'
        justifyContent='space-between'
        alignItems='center'>
        {allThemes.length > 0 ? (
          allThemes.map((item) => (
            <CustomButton
              title='Edit'
              handleClick={() => navigate(`/theme/edit/${item._id}`)}
              backgroundColor='#20a6a0'
              icon={<Edit />}
              color='#fff'
            />
          ))
        ) : (
          <CustomButton
            title='Create Custom Themes'
            handleClick={() => navigate('/theme/create')}
            backgroundColor='#20a6a0'
            icon={<Add />}
            color='#fff'
          />
        )}
      </Stack>
      <Stack
        mt={3}
        display='flex'
        direction='row'
        alignItems='center'>
        {allThemes.length > 0 ? (
          allThemes.map((item) => (
            <div key={item._id}>
              <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'>
                <Typography
                  fontSize={18}
                  fontWeight={600}>
                  Theme First Color
                </Typography>
                <Box
                  mt={1}
                  width='80px'
                  height='80px'
                  bgcolor={item.firstColor}></Box>
                <Typography>{item.firstColor}</Typography>
              </Box>
              <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'>
                <Typography
                  fontSize={18}
                  fontWeight={600}>
                  Theme Second Color
                </Typography>
                <Box
                  mt={1}
                  width='80px'
                  height='80px'
                  bgcolor={item.secondColor}></Box>
                <Typography>{item.secondColor}</Typography>
              </Box>
            </div>
          ))
        ) : (
          <div>
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='center'>
              <Typography
                fontSize={18}
                fontWeight={600}>
                Theme First Color
              </Typography>
              <Box
                mt={1}
                width='80px'
                height='80px'
                bgcolor='#FD8451'></Box>
              <Typography>'#FD8451'</Typography>
            </Box>
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='center'>
              <Typography
                fontSize={18}
                fontWeight={600}>
                Theme Second Color
              </Typography>
              <Box
                mt={1}
                width='80px'
                height='80px'
                bgcolor='#FFBD6F'></Box>
              <Typography>'#FFBD6F'</Typography>
            </Box>
          </div>
        )}
      </Stack>
    </div>
  );
}
