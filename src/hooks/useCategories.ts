/* eslint-disable react-hooks/exhaustive-deps */
import {useDispatch, useSelector} from 'react-redux';
import {CategoriesState, GlobalState} from '../types';
import {useEffect} from 'react';
import {AppDispatch, actions} from '../redux';

interface Output extends CategoriesState {}

const useCategories = (): Output => {
  const dispatch = useDispatch<AppDispatch>();
  const {categories, loading} = useSelector(
    (state: GlobalState) => state.categories,
  );
  useEffect(() => {
    console.log('alo1');
    dispatch(actions.getCategories());
  }, []);

  return {categories, loading};
};

export default useCategories;
