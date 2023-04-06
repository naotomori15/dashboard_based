import { BaseKey } from '@pankod/refine-core';

export interface FormFieldProp {
  title: string,
  labelName: string
}

export interface FormValues {
    title: string,
    description: string,
    propertyType: string,
    location: string,
    price: number | undefined,
}

export interface ProductCardProps {
  id?: BaseKey | undefined,
  title: string,
  photo: string,
}
export interface HeroCardProps {
  id?: BaseKey | undefined,
  title: string,
  photo: string,
  telp : number,
  email : string,
  description : string
}
export interface AboutCardProps {
  id?: BaseKey | undefined,
  description: string,
  photo: string,
}
export interface GamblingCardProps {

  url: string,
  photo: string,
}
