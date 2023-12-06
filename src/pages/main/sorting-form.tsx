import {SortingParameters} from '../../const';
import {useEffect, useState} from 'react';
import {OfferPreviewType} from '../../types/offers-preview';
import {useAppSelector} from '../../store/hooks';
import {selectCityName} from '../../store/offers-data/selectors';

type Props = {
  sortedOffers: OfferPreviewType[];
  setSortedOffers: (sortedOffers: OfferPreviewType[]) => void;
  defaultOrderSortedOffers: OfferPreviewType[];
}

function SortingForm({sortedOffers, setSortedOffers, defaultOrderSortedOffers}: Props) {
  const selectedCity = useAppSelector(selectCityName);
  const [sortingParameter, setSortingParameter] = useState<SortingParameters>(SortingParameters.Default);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setSortingParameter(SortingParameters.Default);
    }
    return () => {
      isMounted = false;
    };
  }, [selectedCity]);

  const sortByParameter = (parameter: SortingParameters) => {
    setSortingParameter(parameter);
    switch (parameter) {
      case SortingParameters.PriceHighToLow:
        sortedOffers = sortedOffers.toSorted((a, b) => b.price - a.price);
        break;
      case SortingParameters.PriceLowToHigh:
        sortedOffers = sortedOffers.toSorted((a, b) => a.price - b.price);
        break;
      case SortingParameters.Top:
        sortedOffers = sortedOffers.toSorted((a, b) => b.rating - a.rating);
        break;
      default:
        sortedOffers = defaultOrderSortedOffers;
    }
    setSortedOffers(sortedOffers);
  };
  const [isOpened, setIsOpened] = useState(false);

  function handleFormClick() {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleFormClick}>
        {sortingParameter}
        <svg className="places__sorting-arrow" width={7} height={4}><use xlinkHref="#icon-arrow-select" /></svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened && 'places__options--opened'}`}>
        {Object.values(SortingParameters).map((item) => (
          <li
            className={`places__option ${sortingParameter === item && 'places__option--active'}`}
            tabIndex={0}
            key={item}
            onClick={
              () => {
                sortByParameter(item as SortingParameters);
                handleFormClick();
              }
            }
          >
            {item}
          </li>))}
      </ul>
    </form>
  );
}

export default SortingForm;
