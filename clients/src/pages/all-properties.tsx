import { Add, LocationCity } from '@mui/icons-material';
import { useTable } from '@pankod/refine-core';
import {
  Box,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';
import { PropertyCard, CustomButton } from 'components';
import BackdropLoader from 'components/common/BackdropLoader';
import CustomErrorComponent from 'components/common/CustomErrorComponent';

import { useMemo } from 'react';

export default function AllProperties() {
  const navigate = useNavigate();
  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter,
    setSorter,
    filters,
    setFilters,
  } = useTable();

  const allProperties = data?.data ?? [];

  const currentPrice = sorter.find((item) => item.field === 'price')?.order;
  const toggleSort = (field: string) => {
    setSorter([{ field, order: currentPrice === 'asc' ? 'desc' : 'asc' }]);
  };
  const currentFilterValue = useMemo(() => {
    const logicalFilters = filters.flatMap((item) =>
      'field' in item ? item : []
    );
    return {
      title: logicalFilters.find((item) => item.field === 'title')?.value || '',
      propertyType:
        logicalFilters.find((item) => item.field === 'propertyType')?.value ||
        '',
      location:
        logicalFilters.find((item) => item.field === 'location')?.value || '',
    };
  }, [filters]);

  if (isLoading) return <BackdropLoader isOpen={isLoading} />;
  if (isError) return <CustomErrorComponent />;

  return (
    <Box>
      <Box
        mt='20px'
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Stack
          direction='column'
          width='100%'>
          <Typography
            fontSize={25}
            fontWeight={700}
            color='#11142D'>
            {!allProperties.length ? 'No Properties' : 'All Properties'}
          </Typography>
          <Box
            mb={2}
            mt={3}
            display='flex'
            width='84%'
            justifyContent='space-between'
            flexWrap='wrap'>
            <Box
              display='flex'
              gap={2}
              flexWrap='wrap'
              mb={{ xs: '20px', sm: 0 }}>
              <CustomButton
                title={`Sort Price ${currentPrice === 'asc' ? '↑' : '↓'}`}
                handleClick={() => toggleSort('price')}
                backgroundColor='#20a6a0'
                color='#fcfcfc'
              />
              <TextField
                variant='outlined'
                color='success'
                placeholder='Search by title'
                value={currentFilterValue.title}
                onChange={(e) => {
                  setFilters([
                    {
                      field: 'title',
                      operator: 'contains',
                      value: e.currentTarget.value
                        ? e.currentTarget.value
                        : undefined,
                    },
                  ]);
                }}
              />
              <Select
                variant='outlined'
                color='success'
                displayEmpty
                required
                inputProps={{ 'aria-label': 'Without label' }}
                defaultValue=''
                value={currentFilterValue.propertyType}
                onChange={(e) => {
                  setFilters(
                    [
                      {
                        field: 'propertyType',
                        operator: 'eq',
                        value: e.target.value,
                      },
                    ],
                    'replace'
                  );
                }}>
                <MenuItem value=''>All</MenuItem>
                {[
                  'Apartement',
                  'Villa',
                  'FarmHouse',
                  'Condos',
                  'Townhouse',
                  'Duplex',
                  'Studio',
                  'Chalet',
                ].map((type) => (
                  <MenuItem
                    key={type}
                    value={type.toLowerCase()}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Stack>
      </Box>

      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'>
        <CustomButton
          title='Add Property'
          handleClick={() => navigate('/properties/create')}
          backgroundColor='#20a6a0'
          icon={<Add />}
          color='#fff'
        />
      </Stack>
      <Box
        mt='20px'
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {allProperties.length === 0
          ? 'No Properties'
          : allProperties.map((property) => (
              <PropertyCard
                key={property._id}
                id={property._id}
                title={property.title}
                price={property.price}
                propertyType={property.propertyType}
                location={property.location}
                photo={property.photo}
              />
            ))}
      </Box>
      {allProperties.length > 0 && (
        <Box
          display='flex'
          gap={2}
          mt={3}
          flexWrap='wrap'>
          <CustomButton
            title={'Previos'}
            handleClick={() => setCurrent((prev) => prev - 1)}
            backgroundColor='#20a6a0'
            color='#fcfcfc'
            disabled={!(current > 1)}
          />
          <Box
            display={{ xs: 'hidden', sm: 'flex' }}
            alignItems='center'
            gap='5px'>
            Page{''}
            <strong>
              {current} of {pageCount}
            </strong>
          </Box>
          <CustomButton
            title={'Next'}
            handleClick={() => setCurrent((prev) => prev + 1)}
            backgroundColor='#20a6a0'
            color='#fcfcfc'
            disabled={current === pageCount}
          />
          <Select
            variant='outlined'
            color='success'
            displayEmpty
            required
            inputProps={{ 'aria-label': 'Without label' }}
            defaultValue={10}
            onChange={(e) =>
              setPageSize(e.target.value ? Number(e.target.value) : 10)
            }>
            {[10, 20, 30, 40, 50].map((size) => (
              <MenuItem
                key={size}
                value={size}>
                Show {size}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  );
}
