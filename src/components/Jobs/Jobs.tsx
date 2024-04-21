import React, { useEffect, useState } from "react";

import transformTime from '../../utils/transformTime'

import "./Jobs.css";

import Button from "../UI/Button";
import { PropagateLoader } from "react-spinners";


interface props {
    filterData?: {
        title?: string;
        location?: string;
        fulltime?: string
    }
    setIsViewJob: (value: any, mode: string) => void
}
interface CompanyType {
    name?: string;
    logo?: string;
    logoBackground?: string;
    website?: string;
}

interface JobType {
    id?: string;
    position?: string;
    postedAt?: string;
    contract?: string;
    location?: string;
    apply?: string;
    description?: string;
    companyId?: string;
    company?: CompanyType;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const Jobs = (props: props) => {
    let [loading, setLoading] = useState(true);
    const [jobsData, setJobsData] = useState<JobType[]>([]);

    useEffect(() => {
        
        const fetchJobs = async () => {

            const response = await fetch(`${API_BASE_URL}/api/jobs`);

            if (response.ok) {
                const jobs: JobType[] = (await response.json()).jobs;
                
                if (props.filterData && (props.filterData.title || props.filterData.location || props.filterData.fulltime)) {
                    // console.log(props.filterData.title);
                    // console.log(props.filterData.location);
                    // console.log(props.filterData.fulltime);
                    
                    const result = [];
                    for(let i = 0; i < jobs.length; i++) {
                        if (jobs[i].location!.toLocaleLowerCase() === props.filterData.location!.toLocaleLowerCase()) {
                            result.push(jobs[i]);
                        }
                        if (jobs[i].position!.toLocaleLowerCase() === props.filterData.title!.toLocaleLowerCase()) {
                            result.push(jobs[i]);
                        }
                        if (jobs[i].contract!.toLocaleLowerCase() === (props.filterData.fulltime === 'on' ? 'full time': 'part time' )) {
                            result.push(jobs[i]);
                        }
                    }

                    setJobsData([...Array.from(new Set(result))]);
                    return
                }

                setJobsData([...jobs])
                setLoading(false)
            }
        }
        fetchJobs()

    })

    const jobViewHandler = (event: React.MouseEvent) => {
        const jobId = (event.currentTarget as HTMLElement).getAttribute('id')!;

        for (const job of jobsData) {
            if (job.id === jobId) {
                props.setIsViewJob(job, 'view');
            }
        }
    }

    return (
        <div className="jobs">
            {
                jobsData.length ? jobsData!.map((job) => {
                    return (
                        <div key={job.id} className="job">
                            <figure
                                style={{ backgroundColor: job.company!.logoBackground }}
                                className="company--photo">
                                <img
                                    src={`${API_BASE_URL}/${job.company!.logo}`}
                                    alt={job.company + "-photo"}
                                />
                            </figure>
                            <div className="job__time">
                                <span className="job__postedat">{transformTime(job.postedAt)}</span>
                                <span className="job__time_separator"></span>
                                <span className="job__contract">{job.contract}</span>
                            </div>
                            <div className="job__position">
                                <span
                                    onClick={jobViewHandler}
                                    id={String(job.id)}>
                                    {job.position}
                                </span>
                            </div>
                            <div className="job__company">
                                <p>{job.company?.name}</p>
                            </div>
                            <div className="job__location">
                                <p>{job.location}</p>
                            </div>
                        </div>
                    );
                })
                    :
                    loading ? <div> <PropagateLoader color="#5964e0" /> </div> : <p>no Jobs found</p>
            }
            {jobsData.length > 10 && <div className="jobs--lod-more">
                <Button className="jobs--btn" text="Load More" />
            </div>}
        </div>
    );
};

export default Jobs;