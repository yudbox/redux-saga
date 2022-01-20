import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import { createBrowserHistory } from 'history';
import {peopleReducer} from './people'
import { appReducer } from './blog';
import { peopleDetailsReducer } from './peopleDetails';

export const history = createBrowserHistory();



const rootReducer = combineReducers({
    app: appReducer,
    router: connectRouter(history),
    people: peopleReducer,
    peopleDetails: peopleDetailsReducer
})

export default rootReducer;