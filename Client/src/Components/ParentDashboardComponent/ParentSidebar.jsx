import React, { useState, useEffect } from 'react';
import './../ContentDasboard/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader, faComment, faEye, faBullhorn, faUser, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/BaybaySalita_Logo.png';

const ParentSidebar = () => {
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        const menuItem = [
            '/parentKidTab',
            '/parentFeedbackTeacher',
            '/parentRateApp'
        ];
        const index = menuItem.findIndex(item => item === location.pathname);
        setActiveIndex(index);
    }, [location.pathname]);

    return (
        <div className="menu-dash">
            <div className="logo-dash">
                <img src={logo} alt="" />
            </div>
            <div className="menu--list">
                {[
                    { icon: faBookOpenReader, text: 'Information of Kid', link: '/parentKidTab' },
                    { icon: faComment, text: 'Feedback of Teacher', link: '/parentFeedbackTeacher' },
                    { icon: faComment, text: 'Rate the Application', link: '/parentRateApp' },
                ].map((item, index) => (
                    <Link key={index} to={item.link} className={`item ${index === activeIndex ? 'active' : ''}`}>
                        <div>
                            <FontAwesomeIcon icon={item.icon} size='1x' className="dash-icon" />
                            {item.text}
                        </div>
                    </Link>
                ))}
            </div>

            <div className="menu-logout">
                <div className="menu-logout-btn">
                    <Link to='/'><button className='btn-side'>Logout</button></Link>
                </div>
            </div>
        </div>
    );
}

export default ParentSidebar;
