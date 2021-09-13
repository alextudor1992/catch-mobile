import { action, computed } from "mobx";
import { NavigationContainerRef } from "@react-navigation/native";

export class NavigationStore {
  protected navigator?: NavigationContainerRef;

  @action
  setNavigator = (navigator: NavigationContainerRef) => {
    this.navigator = navigator;
  }

  @computed
  getCurrentPage = () => {
    const state = this.navigator?.getState();
    return state?.routeNames[state?.index];
  }

  @action
  changePage = (route: string, data?: any) => this.navigator?.navigate(route, data);

  @action
  changeToPreviousPage = () => this.navigator?.goBack();

  @computed
  canGoBackToPreviousPage = () => this.navigator?.canGoBack();
}
