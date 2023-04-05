import { Add } from '@mui/icons-material';
import { useTable } from '@pankod/refine-core';
import { Box, Stack, Typography } from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';
import { HeroCard, CustomButton } from 'components';
import AboutCard from 'components/common/AboutCard';
import BackdropLoader from 'components/common/BackdropLoader';
import CustomErrorComponent from 'components/common/CustomErrorComponent';

export default function AllHero() {
  const navigate = useNavigate();
  const {
    tableQueryResult: { data, isLoading, isError },
  } = useTable();

  const allHeros = data?.data ?? [];

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
            {!allHeros.length ? 'No Hero Data' : 'All Hero Data'}
          </Typography>
        </Stack>
      </Box>

      {allHeros.length > 0 ? (
        ''
      ) : (
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'>
          <CustomButton
            title='Add Hero Data'
            handleClick={() => navigate('/hero/create')}
            backgroundColor='#20a6a0'
            icon={<Add />}
            color='#fff'
          />
        </Stack>
      )}
      <Box
        mt='20px'
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {allHeros.length === 0
          ? 'No About Data'
          : allHeros.map((about) => (
              <HeroCard
                key={about._id}
                id={about._id}
                title={about.title}
                description={about.description}
                photo={about.photo}
                telp={about.telp}
                email={about.emailUI}
              />
            ))}
      </Box>
    </Box>
  );
}
