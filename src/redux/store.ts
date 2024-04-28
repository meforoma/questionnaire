import { configureStore } from '@reduxjs/toolkit';
import answers from '@@/redux/features/answersSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'answers',
  storage,
}

const persistedAnswers = persistReducer(persistConfig, answers);

export const store = configureStore({
  reducer: {
    persistedAnswers,
  },
  // middleware: [thunk],
  /*
    redux-persist failed to create sync storage. falling back to noop storage.
    A non-serializable value was detected in an action, in the path: `register`. Value: [Function: register] 
    Take a look at the logic that dispatched this action:  {
      type: 'persist/PERSIST',
      register: [Function: register],
      rehydrate: [Function: rehydrate]
    }
  */
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type PersistedAnswers = ReturnType<typeof persistedAnswers>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
