import {useSelector} from 'react-redux';

export default () => {
  const {preferenceItem, isLoading} = useSelector(
    state => state?.preferenceReducer,
  );

  return {
    preferenceItem,
    isLoading,
  };
};