import { useOne } from '@pankod/refine-core';
import { useParams } from '@pankod/refine-react-router-v6';
import { Profile } from 'components';
import BackdropLoader from 'components/common/BackdropLoader';
import CustomErrorComponent from 'components/common/CustomErrorComponent';
import React from 'react';

export default function AgentProperties() {
  const { id } = useParams();
  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: id as string,
  });
  const myProfile = data?.data ?? [];

  if (isLoading) return <BackdropLoader isOpen={isLoading} />;
  if (isError) return <CustomErrorComponent />;
  return (
    <Profile
      type='Data'
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      products={myProfile.allProducts}></Profile>
  );
}
