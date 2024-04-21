import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import FilterForm from "./components/FilterForm/FilterForm";
import Jobs from "./components/Jobs/Jobs";
import JobView from "./components/Jobs/JobView/JobView";
import Auth from "./components/Auth/Auth";
import Company from "./components/Accounts/Company";
import User from "./components/Accounts/User";

interface filterData {
  title ?: string;
  location ?: string;
  fulltime ?: string
}

function App() {
  let darkModeValue = localStorage.getItem('darkMode') === 'true' ? true : false;

  const [darkMode, setDarkMode] = useState(darkModeValue);

  const [isViewJob, setIsViewJob] = useState(false);

  const [singleJobData, setSingleJobData] = useState('');

  const AddRemoveDarkModeHandler = () => {
    setDarkMode((prevData) => {

      localStorage.setItem('darkMode', `${!prevData}`);

      return !prevData;
    });
  };

  const setIsViewJobHandler = (job: any) => {
    setIsViewJob(true)
    setSingleJobData(job);
  }

  // FILTER JOB FUNCTION
  const [filterData, setFilterData] = useState<filterData>({})
  const onFilterJobHandler = (Data: filterData) => {
    setFilterData(Data);
  }

  // AUTHORIZATION PAGE
  const [authPage, setAuthPage] = useState(false);
  const setAuthPageHandler = () => {
    setAuthPage(true)
  }

  //NAVIGATE TO HOME PAGE 
  const setJobsPageHandler = () => {
    setAuthPage(false);
    setIsViewJob(false);
    setIsAccountProfile('')
  }

  // PROFILE DISPLAY
  const [isAccountProfile, setIsAccountProfile] = useState('');

  const setProfilePageHandler = () => {
    const token = localStorage.getItem('token');
    const accountType = localStorage.getItem('accountType');
    if (token && accountType === 'company') {
      setIsAccountProfile('company');
    }
    else if (token && accountType === 'user') {
      setIsAccountProfile('user');
    } else {
      setAuthPage(true);
    }
  }

  return (
    <div className={"App " + (darkMode && 'darkmode')}>
      <Header
        addRemoveDarkMode={AddRemoveDarkModeHandler}
        setJobsPage={setJobsPageHandler}
        setProfilePage={setProfilePageHandler}
      />

      {(isAccountProfile === '') && !authPage && (!isViewJob && <FilterForm filterJobsForm={onFilterJobHandler} />)}

      {!authPage && (!isViewJob && ((isAccountProfile === 'company') && <Company removeAccount={() => { setIsAccountProfile('') }} setIsViewJob={setIsViewJobHandler} />))}

      {!authPage && (!isViewJob && ((isAccountProfile === 'user') && <User removeAccount={() => { setIsAccountProfile('') }} setIsViewJob={setIsViewJobHandler} />))}

      {(isAccountProfile === '') && !authPage && (!isViewJob && <Jobs
        // jobsData={jobsData}
        filterData={filterData}
        setIsViewJob={setIsViewJobHandler}
      />)}

      {!authPage && (isViewJob && <JobView
        setAuthPage={setAuthPageHandler}
        jobData={singleJobData} />)}

      {authPage && <Auth removeAuth={() => {
        setAuthPage(false)
        setIsViewJob(false)
      }} />
      }
    </div>
  );

}

export default App;
