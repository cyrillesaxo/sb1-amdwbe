import useStore from '../store/useStore';

export const useTheme = () => {
  const store = useStore();
  
  return {
    theme: store.theme,
    setTheme: store.setTheme,
  };
};