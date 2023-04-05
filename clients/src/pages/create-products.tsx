import { useGetIdentity } from '@pankod/refine-core';
import { useForm, FieldValues } from '@pankod/refine-react-hook-form';
import { useNavigate } from '@pankod/refine-react-router-v6';
import BackdropLoader from 'components/common/BackdropLoader';
import Form from 'components/common/Form';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function CreateProducts() {
  const navigate = useNavigate();
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
    if (!productImage.name) Swal.fire('Please select a image');
    await onFinish({ ...data, photo: productImage.url, email: user.email });
  };

  return (
    <>
      <Form
        type='Create'
        register={register}
        onFinish={onFinish}
        formLoading={formLoading}
        handleSubmit={handleSubmit}
        image={productImage}
        handleImageChange={handleImageChange}
        onFinishHandler={onFinishHandler}
      />
    </>
  );
}
