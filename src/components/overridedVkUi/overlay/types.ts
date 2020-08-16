// Перечислить (зарегистрировать) все ключевые названия используемых модалок,
// использовать соответствующий ключ в качестве id компонента Modal
// Содержимое модалок для конкретного id не фиксируется и может быть ллюбым.

export const modals = ['ADD_FOLDER', 'ADD_ARTICLE', 'FOLDERS'] as const;

export type ModalId = typeof modals[number];
