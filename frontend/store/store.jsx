import {createStore, combineReducers} from "redux";
import Application from "../core/Application";
import {CurrentViewActionType, currentView} from "./state/currentView";
import {index} from "./state/index";
import {theme} from "./state/theme";
import {user} from "./state/user";

var combinedReducers = combineReducers({currentView, index, theme, user});

function reducer(state, action) {
    var nextState = combinedReducers(state, action);

    switch(action.type) {
        case CurrentViewActionType.SHOW_VIEW:
            if (!action.dontSaveHistory) {
                var uri = Application.makeViewUrl(action.view, action.params);
                history.pushState(null, null, uri);
            }

            if (action.params) {
                var viewName = nextState.currentView;
                var view = Object.assign({}, nextState[viewName], action.params)

                return Object.assign({}, nextState, {[viewName]: view});
            }
            break;
    }

    return nextState;
}

var store = createStore(reducer);
export default store;