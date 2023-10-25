type SortingFormProps = {
  sortLocations: string[];
}

function SortingForm({sortLocations}: SortingFormProps) {
  const isActive = false;
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} />
    Popular
      <svg className="places__sorting-arrow" width={7} height={4}>
        <use xlinkHref="#icon-arrow-select" />
      </svg>
      <ul className="places__options places__options--custom places__options--opened">
        {sortLocations.map((item) => (
          <li className={`places__option ${isActive && 'places__option--active'}`} tabIndex={0} key={item}>
            {item}
          </li>))}
      </ul>
    </form>
  );
}

export default SortingForm;
