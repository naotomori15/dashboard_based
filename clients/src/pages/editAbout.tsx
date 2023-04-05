import { useGetIdentity } from '@pankod/refine-core';
import React, { useState } from 'react';
import { FieldValues, useForm } from '@pankod/refine-react-hook-form';
import Swal from 'sweetalert2';
import FormAbout from 'components/common/FormAbout';
export default function EditAbout() {
  const { data: user } = useGetIdentity();
  const [aboutImage, setAboutImage] = useState({ name: '', url: '' });
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
      setAboutImage({ name: file?.name, url: result })
    );
  };
  const onFinishHandler = async (data: FieldValues) => {
    if (!aboutImage.name) Swal.fire('Please Reupload About Image');

    await onFinish({ ...data, photo: aboutImage.url, email: user.email });
  };
  return (
    <FormAbout
      type='Edit'
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      image={aboutImage}></FormAbout>
  );
}
