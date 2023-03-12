import { Place, LocationCity } from '@mui/icons-material';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from '@pankod/refine-mui';
import { Link } from '@pankod/refine-react-router-v6';
import { PropertyCardProps } from 'interfaces/property';

export default function PropertyCard({
  id,
  title,
  location,
  price,
  photo,
  propertyType,
}: PropertyCardProps) {
  return (
    <Card
      component={Link}
      to={`/properties/show/${id}`}
      sx={{
        maxWidth: '330px',
        padding: '10px',
        '&:hover': { boxShadow: '0 22px 45px 2px rgba(176, 176, 176, 0.1)' },
        cursor: 'pointer',
      }}>
      <CardMedia
        component='img'
        width='100%'
        height='210'
        image={photo}
        alt={title}
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
          padding: '5px',
        }}>
        <Stack
          direction='column'
          gap={1}>
          <Typography
            textTransform='capitalize'
            fontSize={16}
            fontWeight={500}
            color='#11142D'>
            {title}
          </Typography>
          <Stack
            direction='row'
            gap={0.5}
            alignItems='center'>
            <Place sx={{ fontSize: 18, color: '#11142D', marginTop: 0.5 }} />
            <Typography
              fontSize={14}
              mr={2}
              textTransform='capitalize'
              color='808191'>
              {location}
            </Typography>
            <LocationCity
              sx={{ fontSize: 18, color: '#11142D', marginTop: 0.5 }}
            />
            <Typography
              fontSize={14}
              textTransform='capitalize'
              color='808191'>
              {propertyType}
            </Typography>
          </Stack>
        </Stack>
        <Box
          bgcolor='#dadefa'
          height='fit-content'
          px={1.5}
          py={0.5}
          borderRadius={1}>
          <Typography
            fontSize={12}
            fontWeight={600}
            color='#20a6a0'>
            ${price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
