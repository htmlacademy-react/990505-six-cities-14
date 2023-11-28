import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../store/hooks';
import {} from '../../store/action';
import {setSelectedCityName} from '../../store/offers-data/offers-data';

type LocationsListProps = {
  locations: string[];
  selectedCityName: string;
}

function LocationsList({locations, selectedCityName}: LocationsListProps) {
  const dispatch = useAppDispatch();
  const listItems = locations.map((location) => (
    <li className="locations__item" key={location}>
      <Link className={`locations__item-link tabs__item ${location === selectedCityName && 'tabs__item--active'}`} to="#" onClick={() => dispatch(setSelectedCityName(location))}>
        <span>{location}</span>
      </Link>
    </li>)
  );
  return (
    <ul className="locations__list tabs__list">
      {listItems}
    </ul>
  );
}

export default LocationsList;

