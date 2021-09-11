import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from "mobx-persist";

export const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
  debounce: 3000,
});
