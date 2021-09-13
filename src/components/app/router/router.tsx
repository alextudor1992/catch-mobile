import React, { FunctionComponent } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { observer } from "mobx-react-lite";
import { routes } from "./routes";
import { useStore } from "../../../store";

const Stack = createNativeStackNavigator();

export const Router: FunctionComponent = observer(() => {
    const store = useStore();
    return <NavigationContainer ref={ref => ref && store.navigationStore.setNavigator(ref)}>
        <Stack.Navigator>
            {
                Object.entries(routes).map(([route, component]) => <Stack.Screen key={route} name={route} component={component as FunctionComponent} />)
            }
        </Stack.Navigator>
    </NavigationContainer>;
});
