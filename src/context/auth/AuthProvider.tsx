import React, { useReducer, useEffect } from "react";
import AuthContext from "./AuthContext";
import { ActionType, IAuthContext } from "./authTypes";
import authReducer, { initialContext } from "./authReducer";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../routes/routes";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [context, dispatch] = useReducer(authReducer, initialContext);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: ActionType.LOAD_USER_START,
      payload: { message: "Retrieving Auth Session..." },
    });
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: ActionType.LOAD_USER_SUCCESS,
          payload: { user, message: "Auth Session Retrieved." },
        });
        navigate(Routes.DashboardScreen);
      } else {
        dispatch({
          type: ActionType.LOAD_USER_FAIL,
          payload: { errorMessage: "Auth Session Expired." },
        });
        navigate(Routes.LoginScreen);
      }
    });
  }, []);

  const signup = async (
    name: string,
    phone: string,
    email: string,
    password: string,
    _securityKey: string
  ) => {
    try {
      dispatch({
        type: ActionType.CREATE_USER_START,
        payload: { message: "Registering User..." },
      });

      const userCreds = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCreds.user, {
        displayName: name,
        photoURL: phone,
      });

      const user = userCreds.user;

      dispatch({
        type: ActionType.CREATE_USER_SUCCESS,
        payload: { user, message: "Registration Successful." },
      });
    } catch (error) {
      dispatch({
        type: ActionType.CREATE_USER_FAIL,
        payload: { errorMessage: (error as Error).message },
      });
    }
  };

  const signin = async (email: string, password: string) => {
    try {
      dispatch({
        type: ActionType.USER_SIGNIN_START,
        payload: { message: "Logging in..." },
      });

      const userCreds = await signInWithEmailAndPassword(auth, email, password);

      const user = userCreds.user;

      dispatch({
        type: ActionType.USER_SIGNIN_SUCCESS,
        payload: { user, message: "Login Successful." },
      });
    } catch (error) {
      dispatch({
        type: ActionType.USER_SIGNIN_FAIL,
        payload: { errorMessage: (error as Error).message },
      });
    }
  };

  const signout = async () => {
    try {
      dispatch({
        type: ActionType.USER_SIGNOUT_START,
        payload: { message: "Signing out..." },
      });

      await signOut(auth);

      dispatch({
        type: ActionType.USER_SIGNOUT_SUCCESS,
        payload: { message: "Signout Successful." },
      });
    } catch (error) {
      dispatch({
        type: ActionType.USER_SIGNOUT_FAIL,
        payload: { errorMessage: (error as Error).message },
      });
    }
  };

  const sendPasswordRecoveryEmail = async (email: string) => {
    try {
      dispatch({
        type: ActionType.PASSWORD_RECOVERY_START,
        payload: { message: "Sending Password Recovery Email..." },
      });

      await sendPasswordResetEmail(auth, email, { url: window.origin });

      dispatch({
        type: ActionType.PASSWORD_RECOVERY_SUCCESS,
        payload: { message: "Password Recovery Email Sent." },
      });
    } catch (error) {
      dispatch({
        type: ActionType.PASSWORD_RECOVERY_FAIL,
        payload: { errorMessage: (error as Error).message },
      });
    }
  };

  const confirmPasswordRecoveryCode = async (
    code: string,
    newPassword: string
  ) => {
    try {
      dispatch({
        type: ActionType.PASSWORD_RECOVERY_START,
        payload: { message: "Resetting Password..." },
      });

      await confirmPasswordReset(auth, code, newPassword);

      dispatch({
        type: ActionType.PASSWORD_RECOVERY_START,
        payload: { message: "Password Reset Successful." },
      });
    } catch (error) {
      dispatch({
        type: ActionType.RESET_PASSWORD_FAIL,
        payload: { errorMessage: (error as Error).message },
      });
    }
  };

  const clearError = () => {
    dispatch({
      type: ActionType.CLEAR_ERROR,
      payload: { errorMessage: "No Error Message." },
    });
  };

  const authContext: IAuthContext = {
    ...context,
    signup,
    signin,
    signout,
    sendPasswordRecoveryEmail,
    confirmPasswordRecoveryCode,
    clearError,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
