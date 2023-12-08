import api from './api';

type SignUpResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

type SignInResponse = {
  user: SignUpResponse;
  accessToken: string;
  refreshToken: string;
};

export default {
  signUpApi: (data: {email: string; password: string}) =>
    api.any<SignUpResponse, unknown>({
      method: 'POST',
      url: '/auth/signup',
      data: {
        ...data,
        firstName: 'Tester',
        lastName: 'Mr',
      },
    }),
  signInApi: (data: {email: string; password: string}) =>
    api.any<SignInResponse, unknown>({
      method: 'POST',
      url: '/auth/signin',
      data,
    }),
};
