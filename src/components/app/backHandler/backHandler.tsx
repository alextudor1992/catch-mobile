import React, { FunctionComponent } from "react";
import { useBackHandler } from "@react-native-community/hooks";
import { useStore } from "../../../store";

export const BackHandler: FunctionComponent = () => {
  const store = useStore();
  useBackHandler(() => !store.navigationStore.canGoBackToPreviousPage());
  return null;
}
