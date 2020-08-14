import { ValidatedFieldsProps } from '../types/types';

export interface RegistrationFormProps {
  selectedCity: { id: number; title: string };
  selectedCountry: { id: number; title: string };
  firstName: string;
  lastName: string;
  age: string;
  work: string;
  field: { id: string; title: string };
  email: string;
}

/* type ValueOf<T> = T[keyof T];

function typedKeys<T>(o: T): (keyof T)[] {
  return Object.keys(o) as (keyof T)[];
} */

export const validateForm = (form: RegistrationFormProps) => {
  const newValidatedObject: any = {};
  const valid = { status: 'valid', text: '' };
  const createErrorStatus = (text: string) => ({ status: 'error', text });

  const simpleFields = [
    { key: 'firstName', value: form.firstName },
    { key: 'lastName', value: form.lastName },
  ];

  const noSymbolsReg = /^[_A-zА-я0-9]*((-|\s)*[_A-zА-я0-9])*$/;

  simpleFields.forEach((field) => {
    const length = field.value.trim().length;

    if (length >= 1 && length <= 20 && noSymbolsReg.test(field.value.trim())) {
      newValidatedObject[field.key] = valid;
    } else if (length >= 1 && !noSymbolsReg.test(field.value.trim())) {
      newValidatedObject[field.key] = createErrorStatus('Поле содержит недопустимые символы');
    } else if (length > 20) {
      newValidatedObject[field.key] = createErrorStatus('Вводимый текст не должен превышать 20 символов');
    } else {
      newValidatedObject[field.key] = createErrorStatus('Поле не заполнено');
    }
  });

  const ageReg = /^[0-9]{2,3}$/;
  const age = Number(form.age);

  if (ageReg.test(form.age) && age <= 100 && age >= 10) {
    newValidatedObject['age'] = valid;
  } else {
    newValidatedObject['age'] = createErrorStatus('Поле должно быть целым числом от 10 до 100');
  }

  // eslint-disable-next-line no-useless-escape
  const emailReg = /[^@]+@[^\.]+\..+/;
  if (emailReg.test(form.email)) {
    newValidatedObject['email'] = valid;
  } else {
    newValidatedObject['email'] = createErrorStatus('Неверный формат e-mail');
  }

  if (form?.selectedCity?.title.trim().length >= 1) {
    newValidatedObject['selectedCity'] = valid;
  } else {
    newValidatedObject['selectedCity'] = createErrorStatus('Город не выбран');
  }

  if (form?.selectedCountry?.title.trim().length >= 1) {
    newValidatedObject['selectedCountry'] = valid;
  } else {
    newValidatedObject['selectedCountry'] = createErrorStatus('Страна не выбрана');
  }

  if (form.work.trim().length >= 1 && form.work.trim().length <= 100 && noSymbolsReg.test(form.work.trim())) {
    newValidatedObject['work'] = valid;
  } else if (form.work.trim().length >= 1 && !noSymbolsReg.test(form.work.trim())) {
    newValidatedObject['work'] = createErrorStatus('Поле содержит недопустимые символы');
  } else if (form.work.trim().length > 100) {
    newValidatedObject['work'] = createErrorStatus('Вводимый текст не должен превышать 100 символов');
  } else {
    newValidatedObject['work'] = createErrorStatus('Поле не заполнено');
  }

  if (form.field.title.trim().length >= 1) {
    newValidatedObject['field'] = valid;
  } else {
    newValidatedObject['field'] = createErrorStatus('Специализация не выбрана');
  }

  const status = Object.values(newValidatedObject).every((field: any) => field.status === 'valid');
  return { status, newValidatedObject };
};

export const validationInitial: ValidatedFieldsProps = {
  age: { status: 'default', text: '' },
  email: { status: 'default', text: '' },
  field: { status: 'default', text: '' },
  firstName: { status: 'default', text: '' },
  lastName: { status: 'default', text: '' },
  selectedCity: { status: 'default', text: '' },
  selectedCountry: { status: 'default', text: '' },
  work: { status: 'default', text: '' },
};
