import React, { useEffect, useState } from "react";
import Splashscreen from 'react-native-splash-screen';
import { observer } from "mobx-react-lite"
import { Router } from "../navigation";
import { accountStore } from "../../store/account";
import SystemNavigationBar from "react-native-system-navigation-bar";

const App = observer(() => {
  Splashscreen.show();
  SystemNavigationBar.stickyImmersive();

  useEffect(() => {
    setTimeout(() => {
      console.debug('App loaded, hiding splashscreen');
      Splashscreen.hide();

      }, 2000);

  }, []);

  return <Router/>;
});

export default App;
