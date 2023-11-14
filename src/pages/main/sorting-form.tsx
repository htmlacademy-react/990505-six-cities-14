import {
  selectCity,
  selectOffers,
  selectSortedOffers,
  selectSortingParameter,
  useAppDispatch,
  useAppSelector
} from '../../store/hooks';
import {SortingParameters} from '../../const';
import {fetchSortedOffers, setSortingParameter} from '../../store/action';

function SortingForm() {
  let sortedOffers = useAppSelector(selectSortedOffers);
  const offers = useAppSelector(selectOffers);
  const selectedCity = useAppSelector(selectCity);
  const sortingParameter = useAppSelector(selectSortingParameter);
  const dispatch = useAppDispatch();

  const sortByParameter = (parameter: SortingParameters) => {
    dispatch(setSortingParameter(parameter));
    switch (parameter) {
      case SortingParameters.PriceHighToLow:
        sortedOffers = [...sortedOffers].sort((a, b) => b.price - a.price);
        break;
      case SortingParameters.PriceLowToHigh:
        sortedOffers = [...sortedOffers].sort((a, b) => a.price - b.price);
        break;
      case SortingParameters.Top:
        sortedOffers = [...sortedOffers].sort((a, b) => a.rating - b.rating);
        break;
      default:
        sortedOffers = offers.filter((item) => item.city.name === selectedCity);
    }
    dispatch(fetchSortedOffers(sortedOffers));
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}>
        {sortingParameter}
        <svg className="places__sorting-arrow" width={7} height={4}><use xlinkHref="#icon-arrow-select" /></svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {Object.values(SortingParameters).map((item) => (
          <li
            className={`places__option ${sortingParameter === item && 'places__option--active'}`}
            tabIndex={0}
            key={item}
            onClick={() => sortByParameter(item as SortingParameters)}
          >
            {item}
          </li>))}
      </ul>
    </form>
  );
}

export default SortingForm;
