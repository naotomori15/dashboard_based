import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from '@pankod/refine-mui';

import { GamblingCardProps } from 'interfaces/property';

export default function GamblingCard({ url, photo }: GamblingCardProps) {
  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        padding: '10px',
        '&:hover': { boxShadow: '0 22px 45px 2px rgba(176, 176, 176, 0.1)' },
      }}>
      <CardMedia
        component='img'
        width='100%'
        height='100%'
        style={{ objectPosition: 'center', backgroundSize: 'cover' }}
        image={photo}
        alt='About data'
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'col',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
          padding: '5px',
        }}>
        <Stack
          direction='column'
          gap={1}
          mt='20px'>
          <Typography
            textTransform='capitalize'
            fontSize={24}
            fontWeight={600}
            color='#090b1a'>
            Url Ads
          </Typography>
          <Typography
            textTransform='capitalize'
            fontSize={16}
            fontWeight={400}
            color='#11142D'>
            {url}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
