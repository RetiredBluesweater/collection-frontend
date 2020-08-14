import { UserInfo } from '@vkontakte/vk-bridge';

export interface VkUserReducerState extends UserInfo {}

const initialState: VkUserReducerState = {
  first_name: '',
  last_name: '',
  city: { id: 1, title: '' },
  country: { id: 1, title: '' },
  id: 0,
  photo_100: '',
  photo_200: '',
  sex: 0,
  timezone: 0,
  bdate: '',
};

/**
 * Responsible for user info from VKontakte
 * @param {UserReducerState} state
 * @returns {UserReducerState}
 */
export function vkUserReducer(state: VkUserReducerState = initialState) {
  return state;
}
