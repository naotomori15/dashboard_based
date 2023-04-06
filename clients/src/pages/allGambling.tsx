import { Add, Edit } from '@mui/icons-material';
import { useTable } from '@pankod/refine-core';
import { FormGroup, FormControlLabel, Switch, Stack } from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';
import { CustomButton, GamblingCard } from 'components';
import BackdropLoader from 'components/common/BackdropLoader';
import CustomErrorComponent from 'components/common/CustomErrorComponent';

export default function AllGambling() {
  const navigate = useNavigate();
  const {
    tableQueryResult: { data, isLoading, isError },
  } = useTable();
  const allGamblings = data?.data ?? [];
  if (isLoading) return <BackdropLoader isOpen={isLoading} />;
  if (isError) return <CustomErrorComponent />;
  return (
    <div>
      <Stack
        mt={2}
        direction='row'
        justifyContent='space-between'
        alignItems='center'>
        {allGamblings.length > 0 ? (
          allGamblings.map((item) => (
            <CustomButton
              title='Edit'
              handleClick={() => navigate(`/gambling/edit/${item._id}`)}
              backgroundColor='#20a6a0'
              icon={<Edit />}
              color='#fff'
            />
          ))
        ) : (
          <CustomButton
            title='Create Gambling'
            handleClick={() => navigate('/gambling/create')}
            backgroundColor='#20a6a0'
            icon={<Add />}
            color='#fff'
          />
        )}
      </Stack>
      <Stack mt={2}>
        {allGamblings.length > 0
          ? allGamblings.map((item) => (
              <FormGroup key={item._id}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={item.isGambling}
                      disabled
                    />
                  }
                  label={item.isGambling ? 'ON' : 'OFF'}
                />
              </FormGroup>
            ))
          : ''}
      </Stack>
      <Stack
        direction='column'
        display='flex'
        alignItems='center'
        mt='12px'>
        {allGamblings?.map((item) => (
          <GamblingCard
            photo={item.photo}
            url={item.url}
          />
        ))}
      </Stack>
    </div>
  );
}
