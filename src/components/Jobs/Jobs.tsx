import React, { MouseEventHandler, useEffect, useState } from "react";

import transformTime from '../../utils/transformTime'

import "./Jobs.css";
import Data from "../Data/data.json";

import Button from "../UI/Button";


interface props {
    filterText: string
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

const API_BASE_URL = 'http://localhost:3000';

const Jobs = (props: props) => {
    const [jobsData, setJobs] = useState<JobType[]>([]);

    useEffect(() => {
        const fetchJobs = async () => {

            const response = await fetch(`${API_BASE_URL}/api/jobs`);

            if (response.ok) {
                const jobs: JobType[] = (await response.json()).jobs;
                setJobs([...jobs])
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
    // const [jobData, setJobData] = useState([...Data])

    // if (props.filterText.length) {

    //     setJobData(prevData => {
    //         return Data.filter(job => {
    //             if (job.location.toLocaleLowerCase() === props.filterText) {
    //                 return true;
    //             }
    //             return false;
    //         })
    //     })
    // }

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
                    <p>no Jobs found</p>
            }
            {jobsData.length > 10 && <div className="jobs--lod-more">
                <Button className="jobs--btn" text="Load More" />
            </div>}
        </div>
    );
};

export default Jobs;