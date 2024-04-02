/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";

import { IAuthContext } from "./authTypes";

export const initialAuthContext: IAuthContext = {
  user: null,
  isLoading: true,
  isLoggedIn: false,
  isError: false,
  message: "No Message.",
  errorMessage: "No Error Message.",
  signup: async (
    _name: string,
    _phone: string,
    _email: string,
    _password: string,
    _securityKey: string,
  ) => {},
  signin: async (_email: string, _password: string, _remember: boolean) => {},
  signout: async () => {},
  updateUser: async (
    _name: string,
    _contact: string,
    _email: string,
    _role: string,
    _photoUrl?: string,
  ) => {},
  sendPasswordRecoveryEmail: async (_email: string) => {},
  confirmPasswordRecoveryCode: async (
    _code: string,
    _newPassword: string,
  ) => {},
  clearError: () => {},
};

const AuthContext = createContext<IAuthContext>(initialAuthContext);

export default AuthContext;
