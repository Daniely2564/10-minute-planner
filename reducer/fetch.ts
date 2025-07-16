export type Refetch = () => void;

export interface Action<T = string> {
  type: T;
  payload?: any;
}

export interface FetchPayload<T = any> {
  loading: boolean;
  data: T;
  error: string | null;
}

export type FetchAction =
  | "FETCH_START"
  | "FETCH_SUCCESS"
  | "FETCH_ERROR"
  | "FETCH_INITIAL";

export type Reducer<T, S> = (state: T, action: Action<S>) => void;

export type FetchReducer<T> = (state: T, action: Action<FetchAction>) => T;

/**
 * @desc Update admin form
 */
export const fetchReducer: FetchReducer<FetchPayload> = (
  state: FetchPayload,
  action,
) => {
  switch (action.type) {
    case "FETCH_INITIAL": {
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    }
    case "FETCH_START": {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case "FETCH_SUCCESS": {
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    }
    case "FETCH_ERROR": {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
  }
};
