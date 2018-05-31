import axios from 'axios';
import { takeEvery, call, put as dispatch } from 'redux-saga/effects';

function* postItem(action) {
    try {
        const itemPost = yield call(axios.post, '/api/shelf', action.payload);
        console.log(itemPost);
        // yield dispatch ({
        //     type: 'GET_ITEMS',
        // })
    } catch  (error) {}
}

function* rootSaga()    {
    yield takeEvery('ADD_ITEM', postItem);
}

export default rootSaga;