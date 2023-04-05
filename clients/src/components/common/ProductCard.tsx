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
import { ProductCardProps } from 'interfaces/property';

export default function ProductCard({ id, title, photo }: ProductCardProps) {
  return (
    <Card
      component={Link}
      to={`/products/show/${id}`}
      sx={{
        maxWidth: '290px',
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
        </Stack>
      </CardContent>
    </Card>
  );
}
