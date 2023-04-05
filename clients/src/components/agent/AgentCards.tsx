import {
  EmailOutlined,
  Description,
  ShoppingCartCheckout,
  BurstMode,
  LocationCity,
  Phone,
  Place,
} from '@mui/icons-material';
import { useGetIdentity } from '@pankod/refine-core';
import { Box, Stack, Typography } from '@pankod/refine-mui';
import { Link } from '@pankod/refine-react-router-v6';
import { AgentCardProp, InfoBarProps } from 'interfaces/agent';
import React from 'react';

const InfoBar = ({ icon, name }: InfoBarProps) => {
  return (
    <Stack
      flex={1}
      minWidth={{ xs: '100%', sm: 300 }}
      gap={1}
      direction='row'>
      {icon}
      <Typography
        fontSize={14}
        color='#808191'>
        {name}
      </Typography>
    </Stack>
  );
};
export default function AgentCards({
  id,
  name,
  email,
  avatar,
  noOfProduct,
  noOfHero,
  noOfAbout,
}: AgentCardProp) {
  const { data: currentUser } = useGetIdentity();
  const genereteLink = () => {
    if (currentUser.email === email) {
      return '/my-profile';
    } else {
      return `/agents/show/${id}`;
    }
  };
  return (
    <Box
      component={Link}
      to={genereteLink()}
      width='100%'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        xs: 'column',
        sm: 'row',
        gap: '20px',
        padding: '20px',
        '&:hover': {
          boxShadow: '0 22px 45px 2px rgba(176, 176, 176,0.1)',
        },
      }}>
      <img
        src={avatar}
        alt={`Users-${name}`}
        width={90}
        height={90}
        style={{ borderRadius: 8, objectFit: 'cover' }}
      />
      <Stack
        direction='column'
        justifyContent='space-between'
        flex={1}
        gap={{ xs: 4, sm: 2 }}>
        <Stack
          gap={2}
          direction='row'
          flexWrap='wrap'
          alignItems='center'>
          <Typography
            fontSize={22}
            fontWeight={600}
            color='#11142D'>
            {name}
          </Typography>
          <Typography
            fontSize={14}
            color='#808191'>
            Ads Agent
          </Typography>
        </Stack>
        <Stack
          direction='row'
          flexWrap='wrap'
          justifyContent='space-between'
          alignItems='center'
          gap={2}>
          <InfoBar
            icon={<EmailOutlined sx={{ color: '#808191' }} />}
            name={email}
          />
          <InfoBar
            icon={<Place sx={{ color: '#808191' }} />}
            name={'Jakarta'}
          />
          <InfoBar
            icon={<Phone sx={{ color: '#808191' }} />}
            name={'+628967529383'}
          />
          <InfoBar
            icon={<ShoppingCartCheckout sx={{ color: '#808191' }} />}
            name={`${noOfProduct} Product`}
          />
          <InfoBar
            icon={<BurstMode sx={{ color: '#808191' }} />}
            name={`${noOfHero} Hero Data`}
          />
          <InfoBar
            icon={<Description sx={{ color: '#808191' }} />}
            name={`${noOfAbout} About Data`}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
