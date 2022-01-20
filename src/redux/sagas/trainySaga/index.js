// эффекты - это функции которые возвращают простые объекты c инструкциями которые может обрабатывать saga midleware, бывают блокирующие и не блокирующие
// take(блокирующий) указывает middleware ждать диспатч какого-то действия
// takeEvery(блокирующий) указывает middleware ждать диспатч какого-то действия
// takeLatest(блокирующий) выполнится последний диспатч
// takeLeading(блокирующий) выполнится gпервый  диспатч
// put эффект заменяющий  диспатч функцию
// call(блокирующий) эффект заменяющий  await, aа также вызывающий функцию и вторым и т.д. аргументами можно передавать параметры
// fork(не блокирующий) эффект который не останавливает код как await а разрешающий код как callback stack, т.е асинхронно как в JavaScript
// spawn (не блокирующий) эффект который работает как и fork с единственным отличием что если в fork произошел какой-то сбой или ошибка, следующий код выполняться не будет, при этом воркер завернутый в spawn при ошибке не останавливает сагу а переходит к следующей саге и выполняет ее
// join (блокирующий) эффект корый задерживает выполнение не блокирующих эффектов fork, spawn
// select (не блокирующий) эффект который позволяет обращаться к стору в текущий момент поэтому данные могут быть не актуальные, лучше его использовать в крайних случаях
import {
  take,
  takeEvery,
  takeLatest,
  takeLeading,
  put,
  call,
  fork,
  join,
  select,
} from 'redux-saga/effects';
import { SET_PEOPLE, SET_PLANETS } from '../reducers';
/*
 **************************  ПРОСТО  ФУНКЦИИ  ********************************************************
 */
const wait = (t) =>
  new Promise((resolve) => {
    setTimeout(resolve, t);
  });

const swapiGet = async (patern) => {
  const request = await fetch(`https://swapi.dev/api/${patern}`);
  const data = request.json();
  return data;
};
/*
 **************************  ЭТО ВОКЕРЫ  ********************************************************
 */

export function* workerSaga() {
  console.log('click from saga');
}
export function* workerSaga2() {
  // т.к. сага это мидвар то он ждет выполнение функции а данная функция не заканчивается а запускается следующая и перезаписывает прошлую и yield опять ждет, ечли это takeLatest выполнится последний, если это  takeLeading выпоснится первый (остальные диспатчи не будут запущены пока не закончится выпоснение первого)
  yield wait(1000);
  console.log('click from saga2');
}
export function* workerSaga3() {
  const people = yield call(swapiGet, 'people');
  console.log('people: ', people);

  const planets = yield call(swapiGet, 'planets');
  console.log('planets: ', planets);

  yield put({ type: SET_PEOPLE, payload: people.results });
  yield put({ type: SET_PLANETS, payload: planets.results });
}

export function* loadPeople() {
  const people = yield call(swapiGet, 'people');
  console.log('people: ', people);
  yield put({ type: SET_PEOPLE, payload: people.results });
}
export function* loadPlanets() {
  const planets = yield call(swapiGet, 'planets');
  console.log('planets: ', planets);
  yield put({ type: SET_PLANETS, payload: planets.results });
}

export function* workerSaga4() {
  const worekResult = yield fork(loadPeople);
  yield fork(loadPlanets);

  console.log('-------1');
  console.log('-------2');
  console.log('-------3');
  console.log('-------4');

  // хотя вокер loadPeople выполнится раньше и вернет функцию с результатом раньше еффект join
  // запустит его после другого кода

  const people = yield join(worekResult);
  console.log('------5 people', people);

  // можно получить информацию из store внутри саги но это считается плохой практикой

  const store = yield select((store) => store);
  console.log('------store', store);
}

/*
 **************************  ЭТО ВОТЧЕРЫ  ********************************************************
 */

export function* watchLoadData() {
  //   yield take('GET_SOME_DATA');
  //   yield workerSaga();
  //  данный эффект будет срабатывать на каждый диспатч
  yield takeEvery('GET_SOME_DATA', workerSaga3);
  //  данный эффект будет срабатывать только на последний диспатч
  yield takeLatest('GET_SOME_DATA', workerSaga2);
  //  данный эффект будет срабатывать сразу на первый диспатч
  yield takeLeading('GET_SOME_DATA', workerSaga2);
}

export function* watchLoadData2() {
  yield takeEvery('NEW_EVENT_FOR_WATCHER', workerSaga4);
}

export default function* rootSaga() {
  console.log(' saga ready2');
  yield fork(watchLoadData2);
  console.log(' saga ready');
  yield fork(watchLoadData);
}
