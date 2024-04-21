import { useState, useEffect } from "react";
import Button from "../UI/Button";
import "./FilterForm.css";

interface Props {
  filterJobsForm: (formData: {location?: string; title: string; fulltime?: string; }) => void
}

const FilterForm = (props: Props) => {

  const onFilterSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement);
    
    const filterInputs: { location?: string; title: string; fulltime?: string; } = {
      title: `${formData.get('title')}`,
      location: `${formData.get('location')}`,
      fulltime: `${formData.get('fulltime')}`
    }
    

    props.filterJobsForm(filterInputs);
    (event.target as HTMLFormElement).reset();
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
          name="title"
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
          name= 'location'
          type="text"
          className="filter__text"
          placeholder="Filter by location..."
        />
      </div>
      <div className="filter__separator"></div>
      <div className="filter__item filter--full-time">
        <p className="filter__checkbox">
          <input type="checkbox" name="fulltime" id="" />
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
