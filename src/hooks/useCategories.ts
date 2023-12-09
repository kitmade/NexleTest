import {useDispatch, useSelector} from 'react-redux';
import {Category, GlobalState} from '../types';
import {useEffect} from 'react';
import {AppDispatch, actions} from '../redux';

interface Params {
  numColumns?: number;
}
interface Output {
  loading: boolean;
  amount: number;
  missing: number;
  categories: (Category | undefined)[];
}

const useCategories = ({numColumns = 0}: Params): Output => {
  const dispatch = useDispatch<AppDispatch>();
  const {categories, loading} = useSelector(
    (state: GlobalState) => state.categories,
  );
  useEffect(() => {
    dispatch(actions.getCategories());
  }, [dispatch]);
  const amount = categories.length;
  const expectedAmount = Math.round(amount / numColumns) * numColumns;
  const missing =
    numColumns === 0
      ? 0
      : expectedAmount > amount
      ? expectedAmount - amount
      : amount - expectedAmount;

  return {
    categories: categories.concat(Array.from({length: missing})),
    amount,
    missing,
    loading,
  };
};

export default useCategories;
