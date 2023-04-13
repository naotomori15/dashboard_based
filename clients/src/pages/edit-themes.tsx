import { useGetIdentity } from '@pankod/refine-core';
import { useForm, FieldValues } from '@pankod/refine-react-hook-form';
import FormThemes from 'components/common/FormThemes';

export default function EditThemes() {
  const { data: user } = useGetIdentity();
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const onFinishHandler = async (data: FieldValues) => {
    await onFinish({ ...data, email: user.email });
  };

  return (
    <>
      <FormThemes
        type='Edit'
        register={register}
        onFinish={onFinish}
        formLoading={formLoading}
        handleSubmit={handleSubmit}
        onFinishHandler={onFinishHandler}></FormThemes>
    </>
  );
}
