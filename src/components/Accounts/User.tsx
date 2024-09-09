import { useEffect, useState } from 'react';

import Button from '../UI/Button';
import AccountJobs from './Jobs/AccountJobs';

import './Company.css';
import Notification from '../Notification/Notification';
import { checkExpiredToken } from '../../utils/resetToken';
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
    AppliedJobs: JobType[]
}


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const User = (props: Props) => {
    const [accountData, setAccountData] = useState<AccountType>();
    const [notification, setNotification] = useState('');
    let [loading, setLoading] = useState(true);

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
    }



    return <div className='company'>
        {notification.length ? <Notification text={notification} /> : ''}
        {<div className='company__header'>
            <div className="account--info">
                <p className='company__header_name'>{accountData?.name}</p>
                <p className='company__header_email'>{accountData?.email}</p>
            </div>
            <div className='company--main-btn'>
                <div onClick={logoutHandler}><Button className='' text='Log Out' /></div>
            </div>
        </div>}
        {loading && <div className='page--spinner'> <PropagateLoader color="#5964e0" /> </div> }
        {accountData && <AccountJobs
            accountType='user'
            setIsViewJob={setIsViewJobHandler}
            jobsData={accountData.AppliedJobs}
        />}
    </div >
}

export default User;