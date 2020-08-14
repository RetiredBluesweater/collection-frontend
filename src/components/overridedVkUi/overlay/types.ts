// Перечислить (зарегистрировать) все ключевые названия используемых модалок,
// использовать соответствующий ключ в качестве id компонента Modal
// Содержимое модалок для конкретного id не фиксируется и может быть ллюбым.

export const modals = ['COUNTRY', 'CITY', 'ADD_TEAM', 'CREATE_INVITES', 'EDIT_TEAM_NAME'] as const;

export type ModalId = typeof modals[number];
