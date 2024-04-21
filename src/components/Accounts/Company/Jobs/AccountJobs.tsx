import React, { useEffect, useState } from "react";

import transformTime from '../../../../utils/transformTime';

import './AccountJobs.css';

import Notification from "../../../Notification/Notification";


interface props {
    setIsViewJob: (value: any) => void
    companyId?: string;
    jobsData: JobType[];
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

const AccountJobs = (props: props) => {
    const [notification, setNotification] = useState('');
    const [jobsData, setJobs] = useState<JobType[]>(props.jobsData);

    const jobViewHandler = (event: React.MouseEvent) => {
        const jobId = (event.currentTarget as HTMLElement).getAttribute('id')!;

        for (const job of jobsData) {
            if (job.id === jobId) {
                props.setIsViewJob(job);
            }
        }
    }

    const token = localStorage.getItem('token')

    const deleteJobHandler = async (event: React.FormEvent) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/jobs/${(event.target as HTMLElement).getAttribute('id')}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

            if (response.ok) {
                setNotification('Job was Deleted.');

                setTimeout(() => {
                    setNotification('');
                }, 3000);
            }
            else {
                setNotification('Something went wrong');

                setTimeout(() => {
                    setNotification('')
                }, 3000);
            }
        } catch (error) {
            setNotification('Something went wrong');

            setTimeout(() => {
                setNotification('')
            }, 3000);
        }
    }

    return (
        <div className="jobs account--jobs">
            {notification.length ? <Notification text={notification} /> : ''}
            <h2 className="account--jobs-title">Your Jobs</h2>
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
                                <div className="account--job-action">
                                    <p className="account--job-edit">Edit</p>
                                    <p onClick={deleteJobHandler} id={job.id} className="account--job-delete">Delete</p>
                                </div>
                            </div>
                        </div>
                    );
                })
                    :
                    <p>no Jobs found</p>
            }
        </div>
    );
};

export default AccountJobs;