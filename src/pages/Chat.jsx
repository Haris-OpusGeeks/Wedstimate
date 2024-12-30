import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { addReview, getChatMessages, getMessagesList, markMessagesRead, sendMessage } from '../Redux/Reducers/chatSlice';
import useChatSelector from '../Redux/Selectors/useChatSelector';
import { base_url, convertUtcToLocalTime } from '../Redux/Utils/helper';
import { CLEAR_CHAT_LIST } from '../Redux/Constants/types';
import { ChatList, Input, MessageList, Button, Navbar } from 'react-chat-elements';
import "react-chat-elements/dist/main.css";
import Rating from 'react-rating';
import { deleteEventPreference } from '../Redux/Reducers/dashboardSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const hub_endpoint = `${base_url}/notifications`;

const ChatPage = () => {
  // const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('');
  const dispatch = useDispatch();
  const { messagesListItem, chatItem: { chats } } = useChatSelector();
  const [isConnected, setConnected] = useState(false);
  const navigate = useNavigate();
  const { chatId } = useParams();
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem('accessToken'));
  const user = JSON.parse(localStorage.getItem('user'));
  const date = localStorage.getItem('weddingDate');
  const [review, setReview] = useState(false);
  const [added, setAdded] = useState(false);
  const [reviewAdded, setReviewAdded] = useState(false);
  const [openButton, setOpenButton] = useState(false);
  const messagesListRef = useRef(null);
  let width = screen.width;

  useEffect(() => {
    if (messagesListRef.current) {
      console.log("run");
      messagesListRef.current.scrollIntoView({  behavior: 'smooth', block: 'end'  });
    }
  }, [messages, chats, dispatch]);

  useEffect(() => {
    if (date) {
      const storedDate = new Date(date);
      const currentDate = new Date();
      // console.log(storedDate);
      // console.log(currentDate);
      
      
      if (storedDate < currentDate) {
        // console.log('Date has already passed:', storedDate.toLocaleDateString());
        setReview(true);
      } else {
        // console.log('Date is in the future:', storedDate.toLocaleDateString());
      }
    } else {
      // console.log('No date found in local storage.');
    }
  }, [date]);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(hub_endpoint, { accessTokenFactory: () => token })
      .withAutomaticReconnect([1000, 5000, 10000, 20000])
      .configureLogging(LogLevel.Debug)
      .build();

    connection.start()
      .then(() => {
        setConnected(true);
        console.log('connection started');
      })
      .catch(err => console.log(`Error starting the connection: ${err.toString()}`));

    connection.on('NotificationFromServer', (user, message) => {
      // console.log(message);
      const formattedMessage = {
        position: 'left',
        type: 'text',
        title: message.user.name,
        text: message.text,
        date: convertUtcToLocalTime(message.createdAt),
      };

      setMessages(previousMessages => [...previousMessages, formattedMessage]);
    });

    connection.onclose(() => {
      setConnected(false);
    });

    return () => {
      connection.stop();
      setConnected(false);
      setMessages([]);
      dispatch({ type: CLEAR_CHAT_LIST });
    };
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(getMessagesList());
    console.log(formattedChatListData);
  }, [dispatch]);

  const formattedChatListData = messagesListItem.messages.map(chat => ({
    id: chat.id,
    title: chat.name,
    subtitle: chat.lastMessage || 'No messages',
    avatar: base_url + '/' + chat.imageUrl || 'default-avatar-url',
    date: chat.date,
    unread: chat.unReadCount || 0,
    isAdded: chat.isAdded || false,
    isReviewAdded: chat.isReviewAdded || false, // Ensure this is correctly set
  }));
  
  
  console.log(messagesListItem.messages);
  

  const handleChatClick = (id, title, isVendor, isReviewAdded) => {
    navigate(`/categories/chat/${id}`, { state: { selectedVendorTitle: title, added : isVendor, reviewAdded : isReviewAdded } });
    dispatch(getMessagesList());
  };  

  useEffect(() => {
    if (location.state?.selectedVendorTitle) {
      setSelectedVendor(location.state.selectedVendorTitle);
      setAdded(location.state.added);
      setReviewAdded(location.state.isReviewAdded);
      console.log('added : ', added, 'review : ', location.state.isReviewAdded);
      
      // console.log(added);
    }
  }, [location.state]);

  useEffect(() => {
    if (chatId) {
      dispatch(getChatMessages(chatId));
      dispatch(markMessagesRead(chatId));
    }
  }, [chatId, dispatch]);

  useEffect(() => {
    if (chats) {
      const formattedMessages = chats.map(msg => ({
        position: msg.user.id === user.id ? 'right' : 'left',
        type: 'text',
        title: msg.user.name,
        text: msg.text,
        date: convertUtcToLocalTime(msg.createdAt),
      }));
      setMessages(formattedMessages);
    }
    if (width>768) {
      setOpenButton(false);
    } else {
      setOpenButton(true);
    }
  }, [chats, user.id, width]);

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const requestData = {
        chatId: chatId,
        message: inputValue,
      };

      dispatch(sendMessage(requestData)).unwrap()
        .then(newMessage => {
          const formattedMessage = {
            position: 'right',
            type: 'text',
            title: user.fullName,
            text: requestData.message,
            date: new Date(newMessage.createdAt),
          };
          setMessages(prevMessages => [...prevMessages, formattedMessage]);
          setInputValue('');
        })
        .catch(error => console.error('Error sending message:', error));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleDelete = () => {
    return () =>{
      const requestData = {
        eventDetailId: chatId
      };
      try {
        dispatch(deleteEventPreference(requestData));
        dispatch(getMessagesList());
        navigate('/categories/chat');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const reviewForm = useFormik({
    initialValues: {
      rating: 0,
      // review: '',
    },
    validationSchema: Yup.object({
      // review : Yup.string(),
      rating : Yup.number().required('Please Enter Rating'),
    }),
    onSubmit: (values, { resetForm }) => {
      // Handle form submission
      var reviewData = {
        // review : values.review,
        // rating : values.rating,
        rating : 4,
        coupleId : user.id,
        eventDetailId : chatId
      }
      console.log('Review submitted:', reviewData);
      try {
        dispatch(addReview({requestData : reviewData}));
        resetForm();
      } catch (error) {
        console.log(error);
      }
      // Add form submission logic here
    },
  });

  const renderReview = () => {
    if (review && added) {
      // if (!reviewAdded) {
        return (
          <div className="reviewDiv">
            <h4>Provide Your Rating Here</h4>
            <Rating
              emptySymbol={<i className="bi bi-star"></i>}
              fullSymbol={<i className="bi bi-star-fill"></i>}
              initialRating={reviewForm.values.rating}
              onChange={value => reviewForm.setFieldValue('rating', value)}
            />
            {reviewForm.errors.rating && reviewForm.touched.rating ? (
              <div className="error">{reviewForm.errors.rating}</div>
            ) : null}
            {/* <textarea
              name="review"
              placeholder="Write your review here"
              {...reviewForm.getFieldProps('review')}
            />
            {reviewForm.errors.review && reviewForm.touched.review ? (
              <div className="error">{reviewForm.errors.review}</div>
            ) : null} */}
            <button className="btn" type="button" onClick={reviewForm.handleSubmit}>Submit</button>
          </div>
        );
      // }
    }
    return null;
  };


  const renderAddToDashboard = () => {
    if (added){
      if (chatId && user.isVendor){
        return(
          <button className='btn' onClick={handleDelete()}>Remove From Dashboard</button>
        );
      } else {
        return;
      }
    } else {
      <button className='btn'>Add To Dashboard</button>
    }
  }
  

const chatListMenu = () => {
  const chatList = document.querySelector('.chatList');
  if (chatList) {
    return () => {
      chatList.classList.toggle('show');
    }
  }
}


  return (
    <div className="container mt-4 chatPage" style={{ height: '70vh' }}>
      <div className="h-100 d-flex">
        <div className="mt-2 chatList">
          {openButton ? <div className="container-fluid d-flex"><button className="btn open" onClick={chatListMenu()}><i className="bi bi-x-circle"></i></button></div> : null}
          <ChatList 
            className='chat-list' 
            dataSource={formattedChatListData}
            onClick={(e) => handleChatClick(e.id, e.title, e.isAdded, e.isReviewAdded)}
          />
        </div>
        <div className="chat-box overflow-auto bg-light border p-3" style={{ borderRadius: '10px' }} >
          <Navbar left={<div className='left'>{openButton ? <button className="btn open" onClick={chatListMenu()}><i className="bi bi-list"></i></button> : null}<h5>{selectedVendor ? selectedVendor : "Select a Chat"}</h5></div>}  
          right={renderAddToDashboard()}/>
          <div className={"messageListing"} ref={messagesListRef}>
            <MessageList
              className='message-list'
              lockable={true}
              toBottomHeight={'100%'}
              dataSource={messages}
            />
          </div>
          {/*<div ref={messagesListRef}></div>*/}
          {renderReview()}
          <Input 
            placeholder='Type Here...' 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            rightButtons={<Button color='white' backgroundColor='black' text='Send' onClick={handleSendMessage} />}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
