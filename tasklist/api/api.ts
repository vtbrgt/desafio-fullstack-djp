import axios from 'axios';
import {ITask} from "@/utils/types";

export const api = axios.create({
    baseURL: 'http://192.168.0.17:9001/'
});