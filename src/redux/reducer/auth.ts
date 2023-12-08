import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {AuthState, SignInRequest, SignUpRequest, SliceName} from '../../types';
import {authApi} from '../../services';
import {storage} from '..';

const initialState = {
  isLogin: false,
  loading: false,
} as AuthState;

const signUp = createAsyncThunk(
  'auth/signup',
  async (payload: SignUpRequest, {}) => {
    const response = await authApi.signUpApi(payload);
    console.log('response', response);
    if (response.ok && response.data) {
      return response.data;
    } else {
      throw new Error(response.originalError?.message);
    }
  },
);

const signIn = createAsyncThunk(
  'auth/signin',
  async (payload: SignInRequest) => {
    const response = await authApi.signInApi(payload);
    if (response.ok && response.data) {
      storage.save({key: 'token', data: response.data.accessToken});
      return response.data;
    } else {
      throw new Error(response.originalError?.message);
    }
  },
);

const authSlice = createSlice({
  name: SliceName.auth,
  initialState,
  reducers: {
    updateLoginStatus: (state, {payload}) => {
      state.isLogin = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(signUp.pending, state => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(signUp.rejected, state => {
      state.loading = false;
    });
    builder.addCase(signIn.pending, state => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, state => {
      state.isLogin = true;
      state.loading = false;
    });
    builder.addCase(signIn.rejected, state => {
      state.loading = false;
    });
  },
});
export default authSlice;
export const authActions = {...authSlice.actions, signIn, signUp};
