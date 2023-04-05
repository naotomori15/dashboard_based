import { useGetIdentity } from '@pankod/refine-core';
import React, { useState } from 'react';
import { FieldValues, useForm } from '@pankod/refine-react-hook-form';
import Form from 'components/common/Form';

import Swal from 'sweetalert2';
export default function EditProperties() {
  const { data: user } = useGetIdentity();
  const [productImage, setProductImage] = useState({ name: '', url: '' });
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
      setProductImage({ name: file?.name, url: result })
    );
  };
  const onFinishHandler = async (data: FieldValues) => {
    if (!productImage.name) Swal.fire('Please Reupload Products Image');

    await onFinish({ ...data, photo: productImage.url, email: user.email });
  };
  return (
    <Form
      type='Edit'
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      image={productImage}></Form>
  );
}
