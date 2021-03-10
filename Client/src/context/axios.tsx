import React from 'react'
import {configAxios} from 'crickboardapi/axios';

export const axios = React.createContext(configAxios('https://crickboardv2.herokuapp.com/api'));

export default axios
