import SensitiveInfo from 'react-native-sensitive-info';

export class SecureStorage {
  protected readonly options = {
    keychainService: 'catch',
    sharedPreferencesName: 'catchLocalStorage',
    touchID: true,
    showModal: true,
  };

  getItem = async (key: string) => SensitiveInfo.getItem(key, this.options);
  setItem = async (key: string, value: string) => SensitiveInfo.setItem(key, value, this.options);
  removeItem = async (key: string) => SensitiveInfo.deleteItem(key, this.options);
}
