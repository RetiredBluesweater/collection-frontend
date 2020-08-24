// Перечислить (зарегистрировать) все ключевые названия используемых модалок,
// использовать соответствующий ключ в качестве id компонента Modal
// Содержимое модалок для конкретного id не фиксируется и может быть ллюбым.

export const modals = [
  'ADD_FOLDER',
  'EDIT_FOLDER',
  'ADD_ARTICLE',
  'EDIT_ARTICLE',
  'FOLDERS',
  'EDIT_FOLDERS',
  'TRANSFER',
] as const;

export type ModalId = typeof modals[number];
