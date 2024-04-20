import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import FilterForm from "./components/FilterForm/FilterForm";
import Jobs from "./components/Jobs/Jobs";
import JobView from "./components/Jobs/JobView/JobView";
import Auth from "./components/Auth/Auth";
import Company from "./components/Accounts/Company/Company";


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
  const [filterText, setFilterText] = useState('')
  const onFilterJobHandler = (job: any) => {
    setFilterText(job);
  }

  // AUTHORIZATION PAGE
  const [authPage, setAuthPage] = useState(false);
  const setAuthPageHandler = () => {
    setAuthPage(true)
  }

  //NAVIGATE TO HOME PAGE 
  const setJobsPageHandler = () => {
    setAuthPage(false);
    setIsViewJob(false)
  }

  // PROFILE DISPLAY
  const [isCompanyProfile, setIsCompanyProfile] = useState(false);
  const [isUserProfile, setIsUserProfile] = useState(false);

  const setProfilePageHandler = () => {
    const token = localStorage.getItem('token');
    const isCompany = localStorage.getItem('isCompany');
    if (token && isCompany === 'true') {
      setIsCompanyProfile(true);
    }
    else if (token && isCompany === 'false') {
      setIsUserProfile(false);
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

      {!isCompanyProfile && !authPage && (!isViewJob && <FilterForm filterJobs={onFilterJobHandler} />)}
      {!authPage && (!isViewJob && (isCompanyProfile && <Company removeAccount={() => {setIsCompanyProfile(false)}} setIsViewJob={setIsViewJobHandler} />))}
      {/* {!authPage && (!isViewJob && (isUserProfile && <Company />))} */}
      {!isCompanyProfile && !authPage && (!isViewJob && <Jobs
        // jobsData={jobsData}
        filterText={filterText}
        setIsViewJob={setIsViewJobHandler}
      />)}
      {!authPage && (isViewJob && <JobView
        setAuthPage={setAuthPageHandler}
        jobData={singleJobData} />)}
      {authPage && <Auth removeAuth={() => {
        setAuthPage(false)
        setIsViewJob(false)
        }}/>}
    </div>
  );

}

export default App;
