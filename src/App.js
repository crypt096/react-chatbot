import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from './components/chat/chat.component';
import './App.css';

export class App extends Component {
  render() {
    const { feed, sendMessage } = this.props;

    const sendMsgResetInput = e => {
      if (e.keyCode === 13) {
        sendMessage(e.target.value);
        e.target.value = null;
      }
    };
    return (
      <div className='container'>
        <div class='messaging'>
          <div class='inbox_msg'>
            <div class='mesgs'>
              <div class='msg_history'>
                {feed.map(entry =>
                  entry.sender === 'user' ? (
                    <div class='incoming_msg'>
                      <div class='incoming_msg_img'>
                        {' '}
                        <img
                          src='https://ptetutorials.com/images/user-profile.png'
                          alt='sunil'
                        />{' '}
                      </div>
                      <div class='received_msg'>
                        <div class='received_withd_msg'>
                          <p>{entry.text}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div class='outgoing_msg'>
                      <div class='outgoing_msg_img'>
                        {' '}
                        <img
                          src='https://www.falcon.io/wp-content/uploads/2018/06/bot-icon-2883144_640-1-332x332.png'
                          alt='sunil'
                        />{' '}
                      </div>
                      <div class='sent_msg'>
                        <p>{entry.text}</p>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div class='input-group mb-3'>
                <div class='input-group-prepend'></div>
                <input
                  type='text'
                  class='form-control chat-message-input'
                  placeholder='Type a message'
                  onKeyDown={e => sendMsgResetInput(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feed: state
});

export default connect(mapStateToProps, { sendMessage })(App);
