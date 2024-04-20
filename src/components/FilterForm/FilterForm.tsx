import { useState, useEffect } from "react";
import Button from "../UI/Button";
import "./FilterForm.css";

const FilterForm = (props: any) => {
  const [locationFilter, setLocationFilter] = useState('');

  const onFilterSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    //props.filterJobs(locationFilter)
    setLocationFilter('')
  }

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <form onSubmit={onFilterSubmit} action="" className="filter">
      <div className="filter__item category--filter">
        <figure>
          <img
            src={require("../assets/desktop/icon-search.svg").default}
            alt=""
          />
        </figure>
        <input
          type="text"
          className="filter__text"
          placeholder={(width > 992) ? 'Filter by title, companies, expertise...' : 'Filter by title...'}
        />
      </div>
      <div className="filter__separator"></div>
      <div className="filter__item location--filter">
        <figure>
          <img
            src={require("../assets/desktop/icon-location.svg").default}
            alt=""
          />
        </figure>
        <input
          value={locationFilter}
          onChange={
            (event) => { setLocationFilter((event.target as HTMLInputElement).value) }
          }
          type="text"
          className="filter__text"
          placeholder="Filter by location..."
        />
      </div>
      <div className="filter__separator"></div>
      <div className="filter__item filter--full-time">
        <p className="filter__checkbox">
          <input type="checkbox" name="" id="" />
          <span>{(width > 992) ? 'Full Time Only' : 'Full Time'}</span>
        </p>
      </div>
      <div className="filter__mobile">
        <img src={require('../assets/mobile/icon-filter.svg').default} alt="" />
        <img className="filter__search_btn" src={require('../assets/mobile/003-search 2.svg').default} alt="" />
      </div>
      <Button className="filter__submit_btn" text="Search" />
    </form>
  );
};

export default FilterForm;
