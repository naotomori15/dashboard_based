import { FormGroup, FormControlLabel, Switch } from '@pankod/refine-mui';

import React, { useState } from 'react';
import { FieldValues, useForm } from '@pankod/refine-react-hook-form';

import FormGambling from 'components/common/FormGambling';

export default function EditGambling() {
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
        type='Edit'
        register={register}
        onFinish={onFinish}
        onFinishHandler={onFinishHandler}
        formLoading={formLoading}
        handleSubmit={handleSubmit}></FormGambling>
    </>
  );
}
