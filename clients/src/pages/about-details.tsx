import { useDelete, useGetIdentity, useShow } from '@pankod/refine-core';
import { Box, Typography, Stack } from '@pankod/refine-mui';
import { useParams, useNavigate } from '@pankod/refine-react-router-v6';
import React, { useState } from 'react';

import {
  ChatBubble,
  Delete,
  Edit,
  Phone,
  Place,
  Star,
} from '@mui/icons-material';
import { CustomButton } from 'components';
import Swal from 'sweetalert2';
import BackdropLoader from 'components/common/BackdropLoader';
import { SkeletonLoadingDetailProperties } from 'components/common/SkeletonLoading';
import CustomErrorComponent from 'components/common/CustomErrorComponent';

function checkImage(url: any) {
  const img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

export default function AboutDetails() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutate } = useDelete();
  const { data: user } = useGetIdentity();
  const { queryResult } = useShow();
  const { data, isLoading, isError, status } = queryResult;

  const aboutDetails = data?.data ?? {};
  const isCurrentUser = user?.email === aboutDetails?.creator?.email;
  const handleDeleteProperty = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        setOpen(result.isConfirmed);
        console.log(open);
        mutate(
          {
            resource: 'about',
            id: id as string,
          },

          {
            onSuccess: () => {
              Swal.fire('Deleted!', 'Your Item has been deleted.', 'success');
              navigate('/about');
            },
            onError: (error) => {
              setOpen(false);
              console.log('error' + error);
            },
          }
        );
      }
    });
  };
  if (isLoading) return <SkeletonLoadingDetailProperties />;
  if (isError) return <CustomErrorComponent />;

  return (
    <>
      <Box
        borderRadius='15px'
        padding='20px'
        bgcolor='#fcfcfc'
        width='100%'>
        <BackdropLoader isOpen={open} />
        <Typography
          fontSize={25}
          fontWeight={700}
          color='#11142D'>
          Details
        </Typography>
        <Box
          mt='20px'
          display='flex'
          flexDirection={{ xs: 'column', lg: 'row' }}
          gap={4}>
          <Box
            flex={1}
            maxWidth={764}>
            <img
              src={aboutDetails.photo}
              alt='Detail'
              height={546}
              style={{ objectFit: 'cover', borderRadius: '10px' }}
              className='property_details-img'
            />
          </Box>
          <Box
            width='100%'
            flex={1}
            maxWidth={326}
            display='flex'
            flexDirection='column'
            gap='20px'>
            <Stack
              width='100%'
              p={2}
              direction='column'
              justifyContent='center'
              alignItems='center'
              border='1px solid #e4e4e4'
              borderRadius={2}>
              <Stack
                mt={2}
                justifyContent='center'
                alignItems='center'
                textAlign='center'>
                <img
                  src={
                    checkImage(aboutDetails.creator.avatar)
                      ? aboutDetails.creator.avatar
                      : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
                  }
                  alt={aboutDetails.creator.name}
                  width={90}
                  height={90}
                  style={{ borderRadius: '100%', objectFit: 'cover' }}
                />
                <Box mt='15px'>
                  <Typography
                    fontSize={18}
                    fontWeight={600}
                    color='#11142D'>
                    {aboutDetails.creator.name}
                  </Typography>
                  <Typography
                    mt='5px'
                    fontSize={14}
                    fontWeight={400}
                    color='#808191'>
                    Agent
                  </Typography>
                </Box>
                <Stack
                  mt='15px'
                  direction='row'
                  alignItems='center'
                  gap={1}>
                  <Place sx={{ color: '#808191' }} />
                  Jakarta, Indonesia
                </Stack>
                <Typography
                  mt={1}
                  fontSize={16}
                  fontWeight={600}
                  color='#11142D'>
                  {aboutDetails.creator.allAbouts.length} About
                </Typography>
              </Stack>
              <Stack
                width='100%'
                mt='25px'
                direction='row'
                flexWrap='wrap'
                gap={2}>
                <CustomButton
                  title={!isCurrentUser ? 'Message' : 'Edit'}
                  backgroundColor='#eab308'
                  color='#fcfcfc'
                  fullWidth
                  icon={!isCurrentUser ? <ChatBubble /> : <Edit />}
                  handleClick={() => {
                    if (isCurrentUser) {
                      navigate(`/about/edit/${aboutDetails._id}`);
                    }
                  }}
                />
                <CustomButton
                  title={!isCurrentUser ? 'Call' : 'Delete'}
                  backgroundColor='#dc2626'
                  color='#fcfcfc'
                  fullWidth
                  icon={!isCurrentUser ? <Phone /> : <Delete />}
                  handleClick={() => {
                    handleDeleteProperty();
                  }}
                />
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box mt='15px'>
          <Stack>
            <Box>
              <Stack
                mt='25px'
                direction='column'
                gap='10px'>
                <Typography
                  fontSize={18}
                  fontWeight={600}
                  color='#11142D'>
                  Description
                </Typography>
                <Typography
                  fontSize={14}
                  fontWeight={500}
                  color='#808191'>
                  {aboutDetails.description}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
