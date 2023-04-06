import { useGetIdentity } from '@pankod/refine-core';
import { useForm, FieldValues } from '@pankod/refine-react-hook-form';
import { useState } from 'react';
import Swal from 'sweetalert2';
import FormGambling from 'components/common/FormGambling';

export default function CreateGambling() {
  const { data: user } = useGetIdentity();
  const [gamblingImage, setGamblingImage] = useState({ name: '', url: '' });
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
      setGamblingImage({ name: file?.name, url: result })
    );
  };
  const onFinishHandler = async (data: FieldValues) => {
    if (!gamblingImage.name) Swal.fire('Please select a image');
    await onFinish({ ...data, photo: gamblingImage.url, email: user.email });
  };

  return (
    <>
      <FormGambling
        type='Create'
        register={register}
        onFinish={onFinish}
        formLoading={formLoading}
        handleSubmit={handleSubmit}
        image={gamblingImage}
        handleImageChange={handleImageChange}
        onFinishHandler={onFinishHandler}></FormGambling>
    </>
  );
}
