import React, { useState } from 'react'

import Button from '../../../UI/Button'
import Notification from '../../../Notification/Notification'

import './Postjob.css'

import { API_BASE_URL } from '../../../../utils/global'
import { isTemplateSpan } from 'typescript'

interface propsType {
    // signInFormActive: () => void
}

const PostJob = (props: propsType) => {
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState('');

    // const signInFormLink = () => {
    //     props.signInFormActive()
    // }

    const jobFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        setLoading(true);

        const formData = new FormData(event.target as HTMLFormElement);

        const newFormData = {
            position: formData.get('position'),
            location: formData.get('location'),
            contract: formData.get('contract'),
            apply: formData.get('apply'),
            description: formData.get('description'),
            requirements: {
                content: formData.get('requirementsContent'),
                items: [...formData.getAll('requirementItems')]
            },
            role: {
                content: formData.get('roleContent'),
                items: [...formData.getAll('roleItems')]
            }
        }



        newFormData.role.items = newFormData.role.items.filter(item => {
            if (!(item as string).trim().length) {
                return false;
            }
            return true;
        });
        newFormData.requirements.items = newFormData.role.items.filter(item => {
            if (!(item as string).trim().length) {
                return false;
            }
            return true;
        });


        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${API_BASE_URL}/api/jobs`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    method: 'POST',
                    body: JSON.stringify(newFormData)
                });
            if (response.ok) {
                setNotification('Success! 🚀 Job was posted.');

                setTimeout(() => {
                    setNotification('')
                }, 3000);

                setLoading(false);
            } else {
                setNotification('Something went wrong.');

                setTimeout(() => {
                    setNotification('')
                }, 3000);

                setLoading(false)
            }
        } catch (error) {
            setNotification('Something went wrong.');

            setTimeout(() => {
                setNotification('')
            }, 3000);

            setLoading(false)
        }
    }

    return <form action=""
        onSubmit={jobFormHandler}
        className="edit--job-form"
        method='post'>
        {notification.length ? <Notification text={notification} /> : ''}
        <h2>New Job</h2>
        <div className='edit--job-content'>
            <div className='edit--job-left'>
                <label htmlFor="position">
                    <span>Position*</span>
                    <input type="text" name='position' placeholder="Job title" id="position" required />
                </label>
                <label htmlFor="location">
                    <span>Location*</span>
                    <input type='text' name='location' placeholder="Kigali, Nairobi" id="location" required />
                </label>
                <label htmlFor="contract">
                    <span>Contract*</span>
                    <select name="contract" id="">
                        <option value="">Full time</option>
                        <option value="">Part time</option>
                    </select>
                </label>
                <label htmlFor="apply">
                    <span>Apply Link*</span>
                    <input type='text' name='apply' placeholder="www.example.com/apply" id="apply" required />
                </label>
                <label htmlFor="description">
                    <span>Description:</span>
                    <textarea id="description" name="description" required></textarea>
                </label>
                <label htmlFor="requirementsContent">
                    <span>Requirements Content:</span>
                    <textarea id="requirementsContent" name="requirementsContent" required></textarea><br />
                </label>
                <label htmlFor="roleContent">
                    <span>Role Content:</span>
                    <textarea id="roleContent" name="roleContent" required></textarea>
                </label >
            </div>
            <div className='edit--job-right'>
                <label htmlFor="requirementsItems">
                    <span>Requirements Items:</span>
                    <div className='requirement-items'>
                        <span>Item 1:</span>
                        <textarea id="requirementItems" name="requirementItems" required></textarea>
                        <span>Item 2:</span>
                        <textarea id="requirementItems" name="requirementItems" ></textarea>
                        <span>Item 3:</span>
                        <textarea id="requirementItems" name="requirementItems" ></textarea>
                        <span>Item 4:</span>
                        <textarea id="requirementItems" name="requirementItems" ></textarea>
                    </div>
                </label>

                <label htmlFor="roleItems">
                    <span>Role Items:</span>
                    <div className='role-items'>
                        <span>Item 1:</span>
                        <textarea id="roleItems" name="roleItems" required></textarea>
                        <span>Item 2:</span>
                        <textarea id="roleItems" name="roleItems" ></textarea>
                        <span>Item 3:</span>
                        <textarea id="roleItems" name="roleItems" ></textarea>
                        <span>Item 4:</span>
                        <textarea id="roleItems" name="roleItems" ></textarea>
                    </div>
                </label >
            </div>
        </div>
        <div>
            <Button className='' text='Post Job' loading={loading} />
        </div>
    </form>
}
export default PostJob