import axios from 'axios';
import {base} from './api';

export const service = axios.create({
    baseURL: base
});