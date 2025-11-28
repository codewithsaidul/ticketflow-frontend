"use client";
import { persistor } from "@/redux/persistor";
import { store } from "@/redux/store";
import { IChildren } from "@/types";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const ReduxProviders = ({ children }: IChildren) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProviders;