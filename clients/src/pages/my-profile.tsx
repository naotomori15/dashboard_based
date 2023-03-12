import { useGetIdentity, useOne } from '@pankod/refine-core';
import { Profile } from 'components';
import BackdropLoader from 'components/common/BackdropLoader';
import CustomErrorComponent from 'components/common/CustomErrorComponent';
import React from 'react';

export default function MyProfile() {
  const { data: user } = useGetIdentity();
  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: user?.userid,
  });
  const myProfile = data?.data ?? [];
  console.log(myProfile);
  if (isLoading) return <BackdropLoader isOpen={isLoading} />;
  if (isError) return <CustomErrorComponent />;
  return (
    <Profile
      type='My'
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}></Profile>
  );
}
