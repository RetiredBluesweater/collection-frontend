import { FormStatusType } from '@vkontakte/vkui/dist/types';

export interface ValidatedArticleModalFieldsProps {
  title: { status: FormStatusType; text: string };
  link: { status: FormStatusType; text: string };
  collectionId: { status: FormStatusType; text: string };
}
