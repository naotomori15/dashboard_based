import { useGetIdentity } from '@pankod/refine-core';
import { useForm, FieldValues } from '@pankod/refine-react-hook-form';
import { useNavigate } from '@pankod/refine-react-router-v6';
import FormAbout from 'components/common/FormAbout';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function CreateAbout() {
  const navigate = useNavigate();
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
    if (!aboutImage.name) Swal.fire('Please select a image');
    await onFinish({ ...data, photo: aboutImage.url, email: user.email });
  };

  return (
    <>
      <FormAbout
        type='Create'
        register={register}
        onFinish={onFinish}
        formLoading={formLoading}
        handleSubmit={handleSubmit}
        image={aboutImage}
        handleImageChange={handleImageChange}
        onFinishHandler={onFinishHandler}
      />
    </>
  );
}
