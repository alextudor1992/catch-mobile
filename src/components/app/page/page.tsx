import React, { FunctionComponent } from "react";
import { SafeAreaView } from "react-native";
import { BackHandler } from "../backHandler";

export const Page: FunctionComponent = ({children}) => {
  return <SafeAreaView>
    <BackHandler/>
    {children}
  </SafeAreaView>
}
