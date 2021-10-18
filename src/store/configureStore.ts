import { Middleware, createStore, applyMiddleware, combineReducers, compose } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { isBrowser } from 'utils/isBrowser';
import { reducers as rootReducers } from './rootReducers';
import { rootSagas } from './rootSagas';

const isDev = process.env.NODE_ENV === 'development';
const composeEnhancers = (isBrowser && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [''],
};

const _combineReducers = combineReducers({
  ...rootReducers,
});

const sagaMiddleware = createSagaMiddleware();
const reducers = persistReducer(persistConfig, _combineReducers);
const middleWares: Middleware[] = [sagaMiddleware];
if (isDev && isBrowser) {
  middleWares.push(logger);
}
const store = createStore(reducers, undefined, composeEnhancers(applyMiddleware(...middleWares)));
sagaMiddleware.run(rootSagas);
const persistor = persistStore(store as any);

export type Reducers = ReturnType<typeof _combineReducers>;

export { store, persistor };
