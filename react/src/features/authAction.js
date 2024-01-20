import { createAction } from '@reduxjs/toolkit';

export const authentication = createAction('auth/authenticate');

export const logOut = createAction('auth/logOut');

