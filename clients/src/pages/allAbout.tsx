import { Add } from '@mui/icons-material';
import { useTable } from '@pankod/refine-core';
import { Box, Stack, Typography } from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';
import { ProductCard, CustomButton } from 'components';
import AboutCard from 'components/common/AboutCard';
import BackdropLoader from 'components/common/BackdropLoader';
import CustomErrorComponent from 'components/common/CustomErrorComponent';

export default function AllAbout() {
  const navigate = useNavigate();
  const {
    tableQueryResult: { data, isLoading, isError },
  } = useTable();

  const allAbout = data?.data ?? [];

  if (isLoading) return <BackdropLoader isOpen={isLoading} />;
  if (isError) return <CustomErrorComponent />;

  return (
    <Box>
      <Box
        mt='20px'
        mb='12px'
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Stack
          direction='column'
          width='100%'>
          <Typography
            fontSize={25}
            fontWeight={700}
            color='#11142D'>
            {!allAbout.length ? 'No About Section Data' : 'All About Data'}
          </Typography>
        </Stack>
      </Box>

      {allAbout.length > 0 ? (
        ''
      ) : (
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'>
          <CustomButton
            title='Add About Data'
            handleClick={() => navigate('/about/create')}
            backgroundColor='#20a6a0'
            icon={<Add />}
            color='#fff'
          />
        </Stack>
      )}
      <Box
        mt='20px'
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {allAbout.length === 0
          ? 'No About Data'
          : allAbout.map((about) => (
              <AboutCard
                key={about._id}
                id={about._id}
                description={about.description}
                photo={about.photo}
              />
            ))}
      </Box>
    </Box>
  );
}
