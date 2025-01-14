export const userStore = (() => {
  let token: string | null = null;
  let name: string | null = null;

  const setUser = (newToken: string, newName: string) => {
    token = newToken;
    name = newName;
  };

  const clearUser = () => {
    token = null;
    name = null;
  };

  const getUser = () => {
    return {
      token,
      name
    };
  };

  return {
    setUser,
    clearUser,
    getUser
  };
})();
