import React, { useEffect } from "react";
import Splashscreen from 'react-native-splash-screen';
import { observer } from "mobx-react-lite"
import { Router } from "./router";
import SystemNavigationBar from "react-native-system-navigation-bar";

const App = observer(() => {
  Splashscreen.show();
  SystemNavigationBar.stickyImmersive();
  useEffect(() => { setTimeout(() => Splashscreen.hide(), 2000); }, []);
  return <Router/>;
});

export default App;
