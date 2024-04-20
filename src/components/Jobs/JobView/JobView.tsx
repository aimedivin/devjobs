import './JobView.css'

import Button2 from '../../UI/Button2';
import Button from '../../UI/Button';

import transformTime from '../../../utils/transformTime'

interface jobViewProp {
    jobData?: any;
    setAuthPage?: () => void
}

const API_BASE_URL = 'http://localhost:3000';

const JobView = (props: jobViewProp) => {
    
    const companyWebsiteHandler = () => {

        if (props.jobData.company.website.split('').splice(9).join() === 'https://' ||
            props.jobData.company.website.split('').splice(8).join() === 'https://' ){
            window.open(`${props.jobData.company.website}`, '_blank', 'noopener,noreferrer');
            }

        window.open(`https://${props.jobData.company.website}`, '_blank', 'noopener,noreferrer');
    }

    const applyNowHandler = () => {
        const token = localStorage.getItem('token');
        if (!token || !token.length) {
            props.setAuthPage!();
        }
    }

    return <div className='job-view'>
        <div className='job-view__header job--view-item'>
            <figure style={{ backgroundColor: props.jobData.company.logoBackground }} className='job-view__company_logo'>
                <img src={`${API_BASE_URL}/${props.jobData.company.logo}`} alt="" />
            </figure>
            <div className='company--website'>
                <div>
                    <p className="company--name">{props.jobData.company.name}</p>
                    <p className="company--web-link">{props.jobData.company.name.toLowerCase()}.com</p>
                </div>
                <div onClick={companyWebsiteHandler}>
                    <Button2 className='' text='Company Site' />
                </div>
            </div>
        </div>
        <div className='job-view__details job--view-item'>
            <div className='job-view__heading'>
                <div>
                    <div className="job__time">
                        <span className="job__postedat">{transformTime(props.jobData.postedAt)}</span>
                        <span className="job__time_separator"></span>
                        <span className="job__contract">{props.jobData.contract}</span>
                    </div>
                    <p className='job-view__position'>{props.jobData.position}</p>
                    <p className='job-view__location'>{props.jobData.location}</p>
                </div>
                <div onClick={applyNowHandler}>
                <Button className='job__time_btn' text='Apply Now'/>
                </div>
            </div>
            <div className='job_view__description'>
                <div className='job--view__main_description'>
                    <p>{props.jobData.description}</p>
                </div>
                <div className='job-view__requirement'>
                    <h3>Requirement</h3>
                    <p>{props.jobData.requirements.content}</p>
                    <ul>
                        {props.jobData.requirements.items.map((item: any, index: number) => {
                            return <li key={index}>{item}</li>;
                        })}
                    </ul>
                </div>
                <div className='job-view__to_do'>
                    <h3>What You Will Do</h3>
                    <p>{props.jobData.role.content}</p>
                    <ol>
                        {props.jobData.role.items.map((item: any, index: number) => {
                            return <li key={index}>{item}</li>;
                        })}
                    </ol>
                </div>
            </div>
        </div>
        <div className='job--view__footer'>
            <div className='job--view__footer_position'>
                <h3>{props.jobData.position}</h3>
                <p>So Digital Inc.</p>
            </div>
            <Button className='job--view__footer_btn' text='Apply Now' />
        </div>
    </div>
}

export default JobView;