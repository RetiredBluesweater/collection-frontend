import { ofType, unionize, UnionOf } from "unionize";
import { unionizeConfig } from "../utils";
import { Insets, OS } from "../../types";
import { StatusBarMode, StatusBarStyle } from "../../theme";

export interface DeviceReducerState {
  /**
   * Device operating system
   */
  os: OS;
  /**
   * Initial device insets. Not changing during application lifetime
   */
  insets: Insets;
  /**
   * Current device insets. Changing during application lifetime. For example,
   * when virtual keyboard is being opened
   */
  currentInsets: Insets;
  /**
   * Current status bar style and color mode. Changing programmatically
   * by setCurrentStatusBarMode redux-action
   */
  currentStatusBarMode: StatusBarMode;
  /**
   * Status bar colors when currentStatusBarMode is custom
   */
  customStatusBarStyle: StatusBarStyle;
}

export const deviceActions = unionize(
  {
    setCurrentInsets: ofType<Insets>(),
    setCurrentStatusBarMode: ofType<{
      mode: StatusBarMode;
      style?: StatusBarStyle;
    }>(),
    setOS: ofType<OS>(),
  },
  unionizeConfig
);

type DeviceAction = UnionOf<typeof deviceActions>;

const initialState: DeviceReducerState = {
  os: OS.IOS,
  insets: { top: 0, bottom: 0, left: 0, right: 0 },
  currentInsets: { top: 0, bottom: 0, left: 0, right: 0 },
  currentStatusBarMode: "default",
  customStatusBarStyle: { color: "#fff", style: "dark" },
};

/**
 * Responsible for data connected with current device
 * @param {DeviceReducerState} state
 * @param {DeviceAction} action
 * @returns {unknown}
 */
export function deviceReducer(
  state: DeviceReducerState = initialState,
  action: DeviceAction
) {
  return deviceActions.match(action, {
    setCurrentInsets: (currentInsets) => ({ ...state, currentInsets }),
    setCurrentStatusBarMode: ({ mode, style }) => ({
      ...state,
      currentStatusBarMode: mode,
      customStatusBarStyle: style || state.customStatusBarStyle,
    }),
    setOS: (os) => ({ ...state, os }),
    default: () => state,
  });
}
