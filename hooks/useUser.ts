import { fetchReducer } from "@custom/reducer/fetch";
import { useEffect, useReducer, useState } from "react";

export interface SignupForm {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export const useSignUp = () => {
  const [payload, dispatch] = useReducer(fetchReducer, {
    loading: false,
    error: "",
    data: null,
  });

  const signup = async (form: SignupForm, cb?: () => void) => {
    dispatch({ type: "FETCH_START" });
    try {
      const res = await fetch("/api/user/signup", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      dispatch({ type: "FETCH_SUCCESS", payload: data });
      typeof cb === "function" && cb();
    } catch (err: any) {
      dispatch({ type: "FETCH_ERROR", payload: err.message.split(",") });
    }
  };

  return [signup, payload] as const;
};

export interface SigninForm {
  email: string;
  password: string;
}

export const useSignIn = () => {
  const [payload, dispatch] = useReducer(fetchReducer, {
    loading: false,
    error: "",
    data: null,
  });

  const signin = async (form: SigninForm, cb?: (user?: any) => void) => {
    dispatch({ type: "FETCH_START" });
    try {
      const res = await fetch("/api/user/signin", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      dispatch({ type: "FETCH_SUCCESS", payload: data });
      typeof cb === "function" && cb(data);
    } catch (err: any) {
      dispatch({ type: "FETCH_ERROR", payload: err.message.split(",") });
    }
  };

  return [signin, payload] as const;
};

export const useCurrentUser = () => {
  const [payload, dispatch] = useReducer(fetchReducer, {
    loading: false,
    error: "",
    data: null,
  });

  const [c, setC] = useState(0);
  const refetch = () => setC(c + 1);

  const getCurrentUser = async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const res = await fetch("/api/user/signin");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err: any) {
      dispatch({ type: "FETCH_ERROR", payload: err.message.split(",") });
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [c]);

  return [payload, refetch] as const;
};
