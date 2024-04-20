import { useEffect, useState } from 'react';

import Button from '../../UI/Button';
import Button2 from '../../UI/Button2';
import AccountJobs from './Jobs/AccountJobs';

import './Company.css';
import JobView from '../../Jobs/JobView/JobView';
import { API_BASE_URL } from '../../../utils/global';
import PostJob from './Jobs/PostJob';

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

const Company = (props: Props) => {
    const [accountData, setAccountData] = useState<AccountType>();

    const [newJobFrom, setNewJobForm] = useState(false);

    useEffect(() => {
        const fetchAccountInfo = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/account`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.ok) {
                const account = (await response.json()).account;

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
        props.removeAccount();
    }

    return <div className='company'>
        {!newJobFrom && <div className='company__header'>
            <div className="account--info">
                <p className='company__header_name'>{accountData?.name}</p>
                <p className='company__header_email'>l{accountData?.email}</p>
            </div>
            <div className='company--main-btn'>
                <div onClick={() => { setNewJobForm(true) }}><Button2 className='' text='Post New Job' /></div>
                <div onClick={logoutHandler}><Button className='' text='Log Out' /></div>
            </div>
        </div>}
        {newJobFrom && <PostJob />}
        {!newJobFrom && accountData && <AccountJobs
            setIsViewJob={setIsViewJobHandler}
            jobsData={accountData.Jobs}
        />}
    </div >
}

export default Company;