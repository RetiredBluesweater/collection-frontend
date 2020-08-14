import { FormStatusType } from '@vkontakte/vkui/dist/types';

export interface ValidatedFieldsProps {
  selectedCity: { status: FormStatusType; text: string };
  selectedCountry: { status: FormStatusType; text: string };
  firstName: { status: FormStatusType; text: string };
  lastName: { status: FormStatusType; text: string };
  age: { status: FormStatusType; text: string };
  work: { status: FormStatusType; text: string };
  field: { status: FormStatusType; text: string };
  email: { status: FormStatusType; text: string };
}
