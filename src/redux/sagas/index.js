import { all, takeEvery } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import postItem from './shelfSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    // postItem(),
    // watchIncrementAsync()
  ]);
  yield takeEvery('ADD_ITEM', postItem);
}
