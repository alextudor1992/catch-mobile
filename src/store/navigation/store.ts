import { action, computed, observable } from "mobx";
import { useNavigation, useRoute } from "@react-navigation/native";
import { hydrate } from "../../store";

export class NavigationStore {
  @observable
  protected navigator = useNavigation();

  @observable
  protected currentRoute = useRoute().name;

  @computed
  getCurrentPage = () => {
    const { name } = useRoute();
    return name;
  }

  @action
  changePage = (route: string, data: any) => {
    this.navigator.navigate(route, data);
  }

  @action
  changeToPreviousPage = () => {
    this.navigator.goBack();
  }

  @computed
  canGoBackToPreviousPage = () => {
    return this.navigator.canGoBack();
  }
}

export const getNavigationStore = async () => await hydrate('nav', new NavigationStore());
