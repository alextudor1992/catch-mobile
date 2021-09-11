import React, { ClassicComponent, FunctionComponent } from "react";
import {Text} from "react-native";

type PageRoutes = {[key in Route]: FunctionComponent<any> | ClassicComponent<any, any> };

export enum Route {
  FEED = 'Feed',

  POST = 'Post',
  NEW_POST = 'New Post',
  EDIT_POST = 'Edit Post',

  LOGIN = 'Login',
  REGISTER = 'Register',
  MFA = 'Multi Factor Authentication',
  RECOVER_PASSWORD = 'Recover Password',

  NEW_PROFILE = 'New Profile',
  PROFILES = 'Profiles',
  PROFILE = 'Profile',
}

export const routes: PageRoutes = {
  [Route.FEED]: () => <Text>This is the feed page</Text>,

  [Route.POST]: () => null,
  [Route.NEW_POST]: () => null,
  [Route.EDIT_POST]: () => null,

  [Route.LOGIN]: () => null,
  [Route.REGISTER]: () => null,
  [Route.MFA]: () => null,
  [Route.RECOVER_PASSWORD]: () => null,

  [Route.NEW_PROFILE]: () => null,
  [Route.PROFILES]: () => null,
  [Route.PROFILE]: () => null,
};
