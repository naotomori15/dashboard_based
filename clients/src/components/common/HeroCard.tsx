import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from '@pankod/refine-mui';
import { Link } from '@pankod/refine-react-router-v6';
import { HeroCardProps } from 'interfaces/property';

export default function HeroCard({ id, title, photo }: HeroCardProps) {
  return (
    <Card
      component={Link}
      to={`/hero/show/${id}`}
      sx={{
        width: '100%',
        height: '100%',
        padding: '10px',
        '&:hover': { boxShadow: '0 22px 45px 2px rgba(176, 176, 176, 0.1)' },
        cursor: 'pointer',
      }}>
      <CardMedia
        component='img'
        width='100%'
        height='100%'
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
            mt='10px'
            textTransform='capitalize'
            fontSize={24}
            fontWeight={600}
            color='#11142D'>
            {title}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
