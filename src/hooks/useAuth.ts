import useStore from '../store/useStore';

export const useAuth = () => {
  const store = useStore();
  
  return {
    user: store.user,
    login: store.login,
    logout: store.logout,
    socialLogin: store.socialLogin,
    setUser: store.setUser,
  };
};