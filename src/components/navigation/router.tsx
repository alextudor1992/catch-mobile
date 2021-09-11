import React, { FunctionComponent } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { observer } from "mobx-react-lite";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { routes } from "./routes";

const Stack = createNativeStackNavigator();

export const Router = observer(() =>
  <NavigationContainer>
    <Stack.Navigator>
      {
        Object.entries(routes).map(([route, component]) => <Stack.Screen key={route} name={route} component={component as FunctionComponent} />)
      }
    </Stack.Navigator>
</NavigationContainer>);
