import {useDispatch, useSelector} from 'react-redux';
import {AuthState, GlobalState} from '../types';
import {AppDispatch, actions} from '../redux';

interface Output extends AuthState {
  signUp: (params: {email: string; password: string}) => void;
  signIn: (params: {email: string; password: string}) => void;
  logout: () => void;
}

const useAuth = (): Output => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLogin, loading} = useSelector(({auth}: GlobalState) => auth);

  const signUp = async (params: {email: string; password: string}) => {
    try {
      await dispatch(actions.signUp(params)).unwrap();
      signIn(params);
    } catch (e) {}
  };

  const signIn = (params: {email: string; password: string}) => {
    dispatch(actions.signIn(params));
  };

  const logout = () => {
    dispatch(actions.updateLoginStatus(false));
  };

  return {isLogin, loading, signUp, logout, signIn};
};

export default useAuth;
