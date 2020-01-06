import { applyMiddleware, createStore } from 'redux';
import { ApiAiClient } from 'api-ai-javascript';

const accessToken = '7481b15a488c40e585584e7d4f099e23';
const client = new ApiAiClient({
  accessToken
});

const ON_MESSAGE = 'ON_MESSAGE';
export const sendMessage = (text, sender = 'user') => ({
  type: ON_MESSAGE,
  payload: { text, sender }
});

const messageMiddleware = () => next => action => {
  next(action);

  if (action.type === ON_MESSAGE) {
    const { text } = action.payload;

    const onSuccess = response => {
      console.log(response.result.fulfillment.speech);
      next(sendMessage(response.result.fulfillment.speech, 'bot'));
    };

    client.textRequest(text).then(onSuccess);
  }
};

const initState = [{ text: 'Hi', sender: 'bot' }];
const messageReducer = (state = initState, action) => {
  switch (action.type) {
    case ON_MESSAGE:
      return [...state, action.payload];
    default:
      return state;
  }
};

export const store = createStore(
  messageReducer,
  applyMiddleware(messageMiddleware)
);
