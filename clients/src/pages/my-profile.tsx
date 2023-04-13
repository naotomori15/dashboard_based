import { useGetIdentity, useOne } from '@pankod/refine-core';
import { Profile } from 'components';
import BackdropLoader from 'components/common/BackdropLoader';
import CustomErrorComponent from 'components/common/CustomErrorComponent';

export default function MyProfile() {
  const { data: user } = useGetIdentity();
  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: user?.userid,
  });
  const myProfile = data?.data ?? [];

  if (isLoading) return <BackdropLoader isOpen={isLoading} />;
  if (isError) return <CustomErrorComponent />;
  return (
    <Profile
      type='My'
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      products={myProfile.allProducts}></Profile>
  );
}
