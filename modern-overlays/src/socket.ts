import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://rh2-aspan.local";

export const socket = io(URL);