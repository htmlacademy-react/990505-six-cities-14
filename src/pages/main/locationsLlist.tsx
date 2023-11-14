import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../store/hooks';
import {setSelectedCity} from '../../store/action';

type LocationsListProps = {
  locations: string[];
  selectedCityName: string;
}
function LocationsList ({locations, selectedCityName}: LocationsListProps) {
  const dispatch = useAppDispatch();
  const listItems = locations.map((location) => (
    <li className="locations__item" key={location} >
      <Link className={`locations__item-link tabs__item ${location === selectedCityName && 'tabs__item--active'}`}
        to="#"
        onClick={() => dispatch(setSelectedCity(location))}
      >
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

