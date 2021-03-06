import { AddArticleModalStateProps } from './AddArticleModal';
import { FormStatusType } from '@vkontakte/vkui/dist/types';

export const validateArticleModal = (form: AddArticleModalStateProps) => {
  const newValidatedObject: any = {};
  const valid = { status: 'valid', text: '' };
  const createErrorStatus = (text: string) => ({ status: 'error', text });

  const linkReg = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/u;
  if (form.title.trim().length > 120) {
    newValidatedObject['title'] = createErrorStatus('Длина поля должна быть не более 120 символов');
  } else if (form.title.trim().length < 1) {
    newValidatedObject['title'] = createErrorStatus('Поле не заполнено');
  } else {
    newValidatedObject['title'] = valid;
  }

  if (form.link.trim().length < 1) {
    newValidatedObject['link'] = createErrorStatus('Поле не заполнено');
  } else if (!linkReg.test(form.link)) {
    newValidatedObject['link'] = createErrorStatus('Указана некорректная ссылка');
  } else {
    newValidatedObject['link'] = valid;
  }

  const status = Object.values(newValidatedObject).every((field: any) => field.status === 'valid');
  return { status, newValidatedObject };
};

export const validationArticleModalInitial: ValidatedArticleModalFieldsProps = {
  title: { status: 'default', text: '' },
  link: { status: 'default', text: '' },
  collectionId: { status: 'default', text: '' },
};

export interface ValidatedArticleModalFieldsProps {
  title: { status: FormStatusType; text: string };
  link: { status: FormStatusType; text: string };
  collectionId: { status: FormStatusType; text: string };
}
