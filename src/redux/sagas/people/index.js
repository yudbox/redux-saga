import { LOCATION_CHANGE } from "connected-react-router";
import { matchPath } from "react-router-dom";
import { apply, call, fork, put, select, take, takeEvery } from "redux-saga/effects";
import { LOAD_USERS, LOAD_USERS_SUCCESS } from "../../reducers/people/actions";
import { getRouteConfig, MAIN_ROUTE, PEOPLE_DETAILS_ROUTE } from '../../../routes'
import { LOAD_USER_DETAILS, LOAD_USER_DETAILS_SUCCESS, LOAD_USER_DETAILS_FAILURE } from "../../reducers/peopleDetails/actions";

//worker
export function* loadPeopleDetails({ payload }) {
    const { id } = payload

    try {
        const request = yield call(fetch, `https://swapi.dev/api/people/${id}`)
        console.log('request', request);
    
        const data = yield apply(request, request.json)
        console.log('data', data);
        yield put({
            type: LOAD_USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        yield put({
            type: LOAD_USER_DETAILS_FAILURE,
            payload: error
        })
    }


}
 
export function* loadPeopleList({ payload }) {
    const { page, search} = payload
    const request = yield call(fetch, `https://swapi.dev/api/people?page=${page}&search=${search}`)
    console.log('request', request);
 
    const data = yield apply(request, request.json)
    console.log('data', data);
    yield put({
        type: LOAD_USERS_SUCCESS,
        payload: data
    })
}
//watcher
export function* routeChageSaga() {
    while (true) {
        const action = yield take(LOCATION_CHANGE)


        if (matchPath(action.payload.location.pathname, getRouteConfig(MAIN_ROUTE))) {
            const state = yield select(s => s.people)
            const { page, search } = state
            
            yield put({
                type: LOAD_USERS,
                payload: {page, search}
            })
        }
        const detailsPage = matchPath(action.payload.location.pathname, getRouteConfig(PEOPLE_DETAILS_ROUTE))

        if (detailsPage) {
            console.log('detailsPage', detailsPage);
            const { id } = detailsPage.params
            
            if (id) {
                console.log('id', id);
                yield put({
                    type: LOAD_USER_DETAILS,
                    payload: {id}
                })
            }
        }

  
    }
}

export default function* peopleSaga() {
    yield fork(routeChageSaga)
    yield takeEvery(LOAD_USERS, loadPeopleList)
    yield takeEvery(LOAD_USER_DETAILS, loadPeopleDetails)
}