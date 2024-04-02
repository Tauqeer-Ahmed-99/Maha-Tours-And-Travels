import { User } from "firebase/auth";

export interface IAuthContext {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  isError: boolean;
  message: string;
  errorMessage: string;
  signup: (
    name: string,
    phone: string,
    email: string,
    password: string,
    securityKey: string,
  ) => Promise<void>;
  signin: (email: string, password: string, remember: boolean) => Promise<void>;
  signout: () => Promise<void>;
  updateUser: (
    name: string,
    contact: string,
    email: string,
    role: string,
    photoUrl?: string,
  ) => Promise<void>;
  sendPasswordRecoveryEmail: (email: string) => Promise<void>;
  confirmPasswordRecoveryCode: (
    code: string,
    newPassword: string,
  ) => Promise<void>;
  clearError: () => void;
}

export enum ActionType {
  CREATE_USER_START = "CREATE_USER_START",
  CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS",
  CREATE_USER_FAIL = "CREATE_USER_FAIL",
  USER_SIGNIN_START = "USER_SIGNIN_START",
  USER_SIGNIN_SUCCESS = "USER_SIGNIN_SUCCESS",
  USER_SIGNIN_FAIL = "USER_SIGNIN_FAIL",
  LOAD_USER_START = "LOAD_USER_START",
  LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS",
  LOAD_USER_FAIL = "LOAD_USER_FAIL",
  USER_SIGNOUT_START = "USER_SIGNOUT_START",
  USER_SIGNOUT_SUCCESS = "USER_SIGNOUT_SUCCESS",
  USER_SIGNOUT_FAIL = "USER_SIGNOUT_FAIL",
  UPDATE_USER_START = "UPDATE_USER_START",
  UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS",
  UPDATE_USER_FAIL = "UPDATE_USER_FAIL",
  PASSWORD_RECOVERY_START = "PASSWORD_RECOVERY_START",
  PASSWORD_RECOVERY_SUCCESS = "PASSWORD_RECOVERY_SUCCESS",
  PASSWORD_RECOVERY_FAIL = "PASSWORD_RECOVERY_FAIL",
  RESET_PASSWORD_START = "RESET_PASSWORD_START",
  RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_FAIL = "RESET_PASSWORD_FAIL",
  CLEAR_ERROR = "CLEAR_ERROR",
}

export interface IPayload {
  user?: User;
  message?: string;
  errorMessage?: string;
}

export interface IAction {
  type: ActionType;
  payload?: IPayload;
}
