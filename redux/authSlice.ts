import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';
import { User, UserCredentials, AuthResponse } from '@/types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'failed';
  error?: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
};

// Async login action
export const loginUser = createAsyncThunk<AuthResponse, UserCredentials>(
  'auth/loginUser',
  async (credentials) => {
    const response = await api.post<AuthResponse>('/auth/login/', credentials);
    return response.data;
  }
);

// Async signup action
export const signupUser = createAsyncThunk<AuthResponse, UserCredentials>(
  'auth/signupUser',
  async (credentials) => {
    const response = await api.post<AuthResponse>('/auth/signup/', credentials);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.status = 'idle';
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.status = 'idle';
        state.user = action.payload.user;
        state.token = action.payload.token;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
