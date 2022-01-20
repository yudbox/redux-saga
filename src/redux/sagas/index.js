import {
  fork,
  spawn,
  call,
  all,

} from 'redux-saga/effects';
import peopleSaga from './people';


export default function* rootSaga() {
  const sagas = [
    peopleSaga
  ];
  const retrySagas = yield sagas.map((saga) => {
    return spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          console.log('error', e);
        }
      }
    });
  });

  yield all(retrySagas);
}
