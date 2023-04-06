import { FieldValues, useForm } from '@pankod/refine-react-hook-form';

import FormGambling from 'components/common/FormGambling';

export default function CreateGambling() {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();
  const onFinishHandler = async (data: FieldValues) => {
    await onFinish({ ...data });
  };
  return (
    <>
      <FormGambling
        type='Create'
        register={register}
        onFinish={onFinish}
        onFinishHandler={onFinishHandler}
        formLoading={formLoading}
        handleSubmit={handleSubmit}></FormGambling>
    </>
  );
}
