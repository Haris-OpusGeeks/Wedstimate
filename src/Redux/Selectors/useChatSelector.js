import {useSelector} from 'react-redux';

export default () => {
  const {messagesListItem, chatItem, reviewItem} = useSelector(
    state => state?.chatReducer,
  );

  return {
    messagesListItem,
    chatItem,
    reviewItem,
  };
};