import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {api} from "@/api/api";
import {ITask} from "@/utils/types";

interface ITasksState {
    list: ITask[],
    loading: boolean
}

export const getTasks = createAsyncThunk<ITask[]>('tasks/fetch', async () => {
    const response = await api.get('/tasks');
    return response.data as ITask[];
});

export const createTask = createAsyncThunk<ITask, Partial<ITask>>('tasks/add', async (task) => {
    const response = await api.post('/task/create', task);
    return { data: response.data, status: response.status };
});

export const updateTask = createAsyncThunk<ITask, ITask>('tasks/update', async (task, { dispatch }) => {
    const response = await api.put('/task/update', task);
    await dispatch(getTasks());
    return { status: response.status };
});

export const deleteTask = createAsyncThunk<number, number>('tasks/delete', async (id, { dispatch }) => {
    await api.delete(`/task/delete/${id}`);
    await dispatch(getTasks());
});

const initialState: ITasksState = {
    list: [],
    loading: false,
};

export const tasksSlice = createSlice<ITasksState>({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(createTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                const { data } = action.payload;

                state.list.push(data);
            })
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
            });
    },
});
export default tasksSlice.reducer;
