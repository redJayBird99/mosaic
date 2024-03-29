import { useReducer } from "react";
import { Batch, Batcher } from "../reddit/reddit";

type FetcherState<T> = {
  c: T[];
  error: boolean;
  loading: boolean;
  end: boolean;
};

type FetcherAction<T> = {
  type: "FETCH_SUCCESS" | "FETCH_ERROR" | "FETCH_END" | "STOP_LOADING";
  c?: T[];
};

function contentFetchReducer<T>(
  state: FetcherState<T>,
  action: FetcherAction<T>
) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        c: state.c.concat(action.c ?? []),
      };
    case "FETCH_ERROR": {
      return {
        ...state,
        error: true,
      };
    }
    case "FETCH_END":
      return {
        ...state,
        end: true,
        c: state.c.concat(action.c ?? []),
      };
    case "STOP_LOADING":
      return {
        ...state,
        loading: false,
      };
  }
}

export function useRedditApi<T>(
  reddit: Batcher<T>
): [FetcherState<T>, () => void] {
  const [state, dispatch] = useReducer(contentFetchReducer, {
    c: [],
    loading: true,
    error: false,
    end: false,
  });
  const stopLoading = () => {
    if (state.loading) {
      // two options to remove the loading, one is o fire a load event or wait a little for every case
      // for now the latter was picked
      setTimeout(() => dispatch({ type: "STOP_LOADING" }), 100);
    }
  };

  async function fetchContent() {
    let batch: Batch<T> = { data: [], done: false };

    try {
      batch = await reddit.getBatch();
    } catch (e: any) {
      console.log(e, "WHAT");
      // TODO: add some info
      dispatch({ type: "FETCH_ERROR" });
      stopLoading();
    }

    if (batch.done) {
      dispatch({ type: "FETCH_END", c: batch.data });
      stopLoading();
    } else if (batch.data.length > 0) {
      dispatch({ type: "FETCH_SUCCESS", c: batch.data });
      stopLoading();
    }
  }

  return [state as FetcherState<T>, fetchContent];
}
