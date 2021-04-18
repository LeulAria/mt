import React, { useEffect, useState } from 'react';
import { Container, Badge } from '@material-ui/core';
// import { ReactComponent as MessageLogo } from '../../public/icons/icons8_message.svg';
// import { ReactComponent as MessageLogo } from '../../public/chat_icons/icons_chat_start.svg';
// import { ReactComponent as CloseMessage } from '../../public/icons/icons8_delete_sign_4.svg';
import './chat.css';
// import { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import {
    getRealTimeUserSupportProviders, 
    setIsActiveStatus
} from "../../../features/chat";
import Popup from './popup';
import { RootState } from '../../../app/store';


const Chatbox = (): JSX.Element => {
    const auth = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const openChatBox = useSelector((state: RootState) => state.chat.isActive)
    const messageView = useSelector((state: RootState) => state.chat.messageView)

    useEffect(() => {
        dispatch(getRealTimeUserSupportProviders(auth.currentUser.uid));
    }, [])


    const initiate_chat = () => {
        dispatch(setIsActiveStatus(true))
    }

    const endMessage = () => {
        setTimeout(() => {
            dispatch(setIsActiveStatus(false))
        }, 1000);
    }

    return (
        <Container>
            <div className="message"></div>

            <div className="chat-widget" id="chatWidget">
                {/* <!-- chat toggle --> */}
                <input
                    id="chat-widget-toggle"
                    className="chat-widget-toggle"
                    type="checkbox"
                    onClick={() => { initiate_chat() }}
                />

                {/* <!-- chat close button --> */}
                <label
                    title="close chat"
                    htmlFor="chat-widget-toggle"
                    className="chat-widget-button chat-close-button"
                    onClick={() => { endMessage() }}
                >
                    {/* <CloseMessage /> */}
                </label>
                {openChatBox && <Popup uid_1={auth.currentUser.uid} />}
                {/* <!-- chat open button --> */}
                <label
                    title="open chat"
                    htmlFor="chat-widget-toggle"
                    className="chat-widget-button chat-open-button chat-widget-toggle"
                >
                    <Badge badgeContent={messageView} color="secondary">
                        {/* <MessageLogo width="4rem" height="4rem" /> */}
                    </Badge>
                </label>
            </div>
        </Container>
    );
};

export default Chatbox;