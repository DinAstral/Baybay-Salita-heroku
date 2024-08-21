import React, { useState, useEffect } from 'react';
import './../ContentDasboard/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEye, faSquarePlus, faUser, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/BaybaySalita_Logo.png';

const Sidebar = () => {
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        const menuItem = [
            '/teacherDashboard',
            '/manageStudent',
            '/addStudent',
            '/viewAssessment',
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
                    { icon: faHome, text: 'Dashboard', link: '/teacherDashboard' },
                    { icon: faUser, text: 'Manage Student', link: '/manageStudent' },
                    { icon: faSquarePlus, text: 'Add Student', link: '/addStudent' },
                    { icon: faEye, text: 'Manage Assessment', link: '/viewAssessment' },
                ].map((item, index) => (
                    <Link key={index} to={item.link} className={`item ${index === activeIndex ? 'active' : ''}`}>
                        <div onClick={() => setActiveIndex(index)}>
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

export default Sidebar;
