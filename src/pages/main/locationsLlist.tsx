type LocationsListProps = {
  locations: string[];
}
function LocationsList ({locations}: LocationsListProps) {
  const isActive = true;

  const listItems = locations.map((location) => (
    <li className="locations__item" key={location} >
      <a className={`locations__item-link tabs__item ${isActive && 'tabs__item--active'}`} href="#">
        <span>{location}</span>
      </a>
    </li>)
  );
  return (
    <ul className="locations__list tabs__list">
      {listItems}
    </ul>
  );
}

export default LocationsList;

