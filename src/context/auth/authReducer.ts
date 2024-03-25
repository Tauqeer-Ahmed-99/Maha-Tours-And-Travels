import { User } from "firebase/auth";
import { ActionType, IAction } from "./authTypes";

export interface IContext {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  isError: boolean;
  message: string;
  errorMessage: string;
}

export const initialContext: IContext = {
  user: null,
  isLoading: false,
  isLoggedIn: false,
  isError: false,
  message: "No Message.",
  errorMessage: "No Error Message.",
};

const authReducer = (context = initialContext, action: IAction): IContext => {
  const { type, payload } = action;

  switch (type) {
    case ActionType.CREATE_USER_START:
      return {
        ...context,
        isLoading: true,
        message: payload?.message as string,
      };
    case ActionType.CREATE_USER_SUCCESS:
      return {
        ...context,
        user: payload?.user as User,
        isLoading: false,
        isLoggedIn: true,
        message: payload?.message as string,
      };
    case ActionType.CREATE_USER_FAIL:
      return {
        ...context,
        isLoading: false,
        isLoggedIn: false,
        isError: true,
        errorMessage: payload?.errorMessage as string,
      };
    case ActionType.USER_SIGNIN_START:
      return {
        ...context,
        isLoading: true,
        message: payload?.message as string,
      };
    case ActionType.USER_SIGNIN_SUCCESS:
      return {
        ...context,
        user: payload?.user as User,
        isLoading: false,
        isLoggedIn: true,
      };
    case ActionType.USER_SIGNIN_FAIL:
      return {
        ...context,
        isLoading: false,
        isLoggedIn: false,
        isError: true,
        errorMessage: payload?.errorMessage as string,
      };
    case ActionType.LOAD_USER_START:
      return {
        ...context,
        isLoading: true,
        message: payload?.message as string,
      };
    case ActionType.LOAD_USER_SUCCESS:
      return {
        ...context,
        user: payload?.user as User,
        isLoading: false,
        isLoggedIn: true,
        message: payload?.message as string,
      };
    case ActionType.LOAD_USER_FAIL:
      return {
        ...context,
        user: null,
        isLoading: false,
        isLoggedIn: false,
        isError: false,
        errorMessage: payload?.errorMessage as string,
      };
    case ActionType.USER_SIGNOUT_START:
      return {
        ...context,
        isLoading: true,
        message: payload?.message as string,
      };
    case ActionType.USER_SIGNOUT_SUCCESS:
      return {
        ...context,
        isLoading: false,
        isLoggedIn: false,
        message: payload?.message as string,
      };
    case ActionType.USER_SIGNOUT_FAIL:
      return {
        ...context,
        isLoading: false,
        isError: true,
        errorMessage: payload?.errorMessage as string,
      };
    case ActionType.PASSWORD_RECOVERY_START:
      return {
        ...context,
        isLoading: true,
        message: payload?.message as string,
      };
    case ActionType.PASSWORD_RECOVERY_SUCCESS:
      return {
        ...context,
        isLoading: false,
        message: payload?.message as string,
      };
    case ActionType.PASSWORD_RECOVERY_FAIL:
      return {
        ...context,
        isLoading: false,
        isError: true,
        errorMessage: payload?.errorMessage as string,
      };
    case ActionType.RESET_PASSWORD_START:
      return {
        ...context,
        isLoading: true,
        message: payload?.message as string,
      };
    case ActionType.RESET_PASSWORD_SUCCESS:
      return {
        ...context,
        isLoading: false,
        message: payload?.message as string,
      };
    case ActionType.RESET_PASSWORD_FAIL:
      return {
        ...context,
        isLoading: false,
        isError: true,
        errorMessage: payload?.errorMessage as string,
      };
    case ActionType.CLEAR_ERROR:
      return {
        ...context,
        isError: false,
        errorMessage: payload?.errorMessage as string,
      };
    default:
      return context;
  }
};

export default authReducer;
