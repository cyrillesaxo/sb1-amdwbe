import useStore from '../store/useStore';

export const useLanguage = () => {
  const store = useStore();
  
  return {
    language: store.language,
    setLanguage: store.setLanguage,
  };
};