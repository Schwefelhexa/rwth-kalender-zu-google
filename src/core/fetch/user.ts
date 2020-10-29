import GoogleUserInfo from '../model/GoogleUserInfo';

export const getUserInfo = (token: string): Promise<GoogleUserInfo> =>
  fetch('https://openidconnect.googleapis.com/v1/userinfo', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json() as Promise<GoogleUserInfo>);
