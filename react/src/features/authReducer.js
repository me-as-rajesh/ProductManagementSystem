import { createSlice } from '@reduxjs/toolkit';

export const isAuthenticated = () => {
  const storedToken = localStorage.getItem('jwtToken');
  return !!storedToken;
}

export const logout = () =>{
  localStorage.removeItem('jwtToken')
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: isAuthenticated(),
  },
  reducers: {
    authenticate: (state) => {
      state.isAuthenticated = isAuthenticated();
    },
    logOut: (state) => {
      state.isAuthenticated = logout();
    },
  },
});

export const { authenticate } = authSlice.actions;
export default authSlice.reducer;