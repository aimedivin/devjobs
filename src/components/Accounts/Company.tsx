import { useEffect, useState } from 'react';

import Button from '../UI/Button';
import Button2 from '../UI/Button2';
import AccountJobs from './Jobs/AccountJobs';

import './Company.css';
import PostJob from './Jobs/PostJob';
import { checkExpiredToken } from '../../utils/resetToken';
import Notification from '../Notification/Notification';
import { PropagateLoader } from 'react-spinners';

interface Props {
    setIsViewJob: (value: any) => void;
    removeAccount: () => void;
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
}

interface AccountType {
    id?: string;
    name?: string;
    email?: string;
    website?: string;
    logo?: string;
    logoBackground?: string;
    Jobs: JobType[];
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Company = (props: Props) => {
    const [updateFormData, setUpdateFormData] = useState({})
    const [accountData, setAccountData] = useState<AccountType>();
    const [notification, setNotification] = useState('');
    let [loading, setLoading] = useState(true);

    const [newJobFrom, setNewJobForm] = useState(false);

    useEffect(() => {
        const fetchAccountInfo = async () => {
            const token = localStorage.getItem('token');
            checkExpiredToken();
            const response = await fetch(`${API_BASE_URL}/api/account`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.ok) {
                const account = (await response.json()).account;
                setLoading(false);

                setAccountData({ ...account })
            }
        }
        fetchAccountInfo();

    })

    const setIsViewJobHandler = (job: any) => {
        props.setIsViewJob(job)
    }

    const logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accountType');
        localStorage.removeItem('expirationTime');

        setNotification("You're Logged Out")
        setTimeout(() => {
            setNotification('');
            props.removeAccount();
        }, 2000);
        props.removeAccount();
    }

    // FORM EDIT HANDLER
    const setJobEditHandler = (id: string) => {

        setUpdateFormData({
            mode: 'edit',
            data: accountData?.Jobs.filter(job => job.id === id ? true : false)
        })
        setNewJobForm(true);
        return;
    }

    return <div className='company'>
        {notification.length ? <Notification text={notification} /> : ''}
        {!newJobFrom && <div className='company__header'>
            <div className="account--info">
                <p className='company__header_name'>{accountData?.name}</p>
                <p className='company__header_email'>{accountData?.email}</p>
            </div>
            <div className='company--main-btn'>
                <div onClick={() => { setNewJobForm(true) }}><Button2 className='' text='Post New Job' /></div>
                <div onClick={logoutHandler}><Button className='' text='Log Out' /></div>
            </div>
        </div>}

        {newJobFrom && <PostJob
            formCancelHandler={() => {
                setNewJobForm(false)
                setUpdateFormData({})
            }}
            formData={updateFormData}
        />}

        {!newJobFrom && accountData && <AccountJobs
            accountType='company'
            setIsViewJob={setIsViewJobHandler}
            jobsData={accountData.Jobs}

            setJobEdit={setJobEditHandler}
        />}

        {loading && <div className='page--spinner'>
            <PropagateLoader color="#5964e0" />
        </div>}
    </div >
}

export default Company;