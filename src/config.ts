export interface Config {
  gqlHttpUrl: string;
  groupId: number;
}

// Application build config. We don't check if variables are passed, due to
// this logic is placed in prebuild.js file
const config: Config = {
  gqlHttpUrl: process.env.REACT_APP_GQL_HTTP_URL || '',
  groupId: 197914033,
};

export default config;
