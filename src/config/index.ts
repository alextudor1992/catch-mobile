import { configure } from "mobx";

configure({
  useProxies: "ifavailable"
})

export default {
  api: {
    token: '',
    httpEndpoint: 'http://localhost:4000/graphql',
    wsEndpoint: 'ws://localhost:4005/subscriptions',
  }
};
