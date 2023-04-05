import { useGetIdentity } from '@pankod/refine-core';
import React, { useState } from 'react';
import { FieldValues, useForm } from '@pankod/refine-react-hook-form';

import Swal from 'sweetalert2';
import { FormHero } from 'components';
export default function EditHero() {
  const { data: user } = useGetIdentity();
  const [heroImage, setHeroImage] = useState({ name: '', url: '' });
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });
    reader(file).then((result: string) =>
      setHeroImage({ name: file?.name, url: result })
    );
  };
  const onFinishHandler = async (data: FieldValues) => {
    if (!heroImage.name) Swal.fire('Please Reupload Hero Image');

    await onFinish({ ...data, photo: heroImage.url, email: user.email });
  };
  return (
    <FormHero
      type='Edit'
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      image={heroImage}></FormHero>
  );
}
