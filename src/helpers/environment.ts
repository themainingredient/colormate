export const ENV = process.env.REACT_APP_ENV;

export const isProd = () => {
  return ENV === 'production';
};

export const isStaging = () => {
  return ENV === 'staging';
};

export const isDev = () => {
  return ENV === 'develop';
};
