const mutations = {
  SET_TOKEN(state: any, token: string) {
    state.token = token;
  },
  SET_USER(state: any, user: any) {
    state.user = user;
  },
};

export default mutations;
