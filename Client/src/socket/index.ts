import {SOCKET_ENDPOINT} from '../Constants/socketEvents';
import socketClient from 'socket.io-client';

export const socket = socketClient(SOCKET_ENDPOINT,{transports: ['websocket'], upgrade: false})