import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { clearNotification } from '../../redux/notficationSlice'

function NotificationBar() {
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("green");

    const notificationState = useSelector((state) => state.notification);

    const dispatch = useDispatch();

    useEffect(() => {
        if (notificationState.message !== "") {
            setMessage(notificationState.message);
            switch (notificationState.type) {
                case "Error":
                    setColor("red");
                    break;
                case "Warning":
                    setColor("yellow");
                    break;
                default:
                    setColor("green");
                    break;
            }

            document.getElementById('notification-bar').classList.add('show');
            setTimeout(() => {
                document.getElementById('notification-bar').classList.remove('show');
                dispatch(clearNotification());
            }, 3000);
        }
    }, [notificationState]) //eslint-disable-line

    const handleCloseClick = () => {
        document.getElementById('notification-bar').classList.remove('show');
    }

    return (
        <NotificationContainer id="notification-bar" style={{ backgroundColor: `${color}` }}>
            <p>{message}</p>
            <span
                onClick={() => handleCloseClick()}
            >X</span>
        </NotificationContainer >
    )
}

export default NotificationBar

const NotificationContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: rgba(255,255,255);
    padding: 12px 0px;
    font-size: 0.9rem;
    z-index: 90;
    position: fixed;
    top: 35px;
    left: 0;
    width: 100%;
    transition: all 250ms ease-in-out;

    /* background: green; */

    span {
        position: absolute;
        right: 0;
        margin-right: 50px;
        cursor: pointer;
    }
`