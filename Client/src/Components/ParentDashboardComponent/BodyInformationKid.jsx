import React, { useState, useEffect } from 'react';
import ContentHeader from '../ContentDasboard/ContentHeader';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import profile from './../../assets/profile.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faCircleInfo, faEnvelope, faSearch } from '@fortawesome/free-solid-svg-icons';

const BodyInformationKid = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const [showProfile, setShowProfile] = useState(false); // New state for showing profile

  useEffect(() => {
    const menuItem = [
      '/parentKidTab',
      '/parentStudentProgress',
    ];
    const index = menuItem.findIndex(item => item === location.pathname);
    setActiveIndex(index);
  }, [location.pathname]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This function will view your profile.
    </Tooltip>
  );

  const toggleActive = (index) => {
    setActiveIndex(index);
  };

  const handleSearchClick = () => {
    setShowProfile(true); // Show the profile on search button click
  };

  return (
    <div className='content'>
      <ContentHeader />
      <div className="content-body">
        <div className="content-title-header">
          <div>
          Information of the Student
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <FontAwesomeIcon icon={faCircleInfo} size='1x' className="help-icon" />
          </OverlayTrigger>
          </div>
        </div>
        <div className="content-container">
          {!showProfile ? (
            <div className='kid-search-bar'>
              <div className="search-box-table">
                <FontAwesomeIcon icon={faSearch} size="1x" inverse className="con-icon" />
                <input type="text" placeholder="Enter Student's LRN" />
              </div>
              <div className='search-button-profile'>
                <button className='btn-back' onClick={handleSearchClick}>Search</button>
              </div>
            </div>
          ) : (
            <>
              <div className='back-button-profile'>
                <button className='btn-back' onClick={() => navigate(-1)}>Back</button>
              </div>
              <div className='Profile-body'>
                <img src={profile} alt="Profile" />
                <div className='profile-detail'>
                  <h2>Name of the Student</h2>
                  <h4>Section</h4>
                  <div className='profile-detail-info'>
                    <div className='profile-number'>
                      <FontAwesomeIcon icon={faAddressCard} size='1x' className="profile-icon" />
                      Learner Reference Number:
                    </div>
                  </div>
                </div>
              </div>
              <div className='profile-information'>
                <div className='profile-nav'>
                  {[
                    { text: 'Basic Information', link: '/parentKidTab' },
                    { text: 'Student Progress', link: '/parentStudentProgress' },
                  ].map((item, index) => (
                    <Link key={index} to={item.link} className={`profile-nav-item ${index === activeIndex ? 'active' : ''}`}>
                      <div onClick={() => toggleActive(index)}>
                        {item.text}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className='profile-info-details'>
                <div className='profile-deets'>
                <div className='input-profile'>
                  <div className='input-profile-text'>First Name:</div> 
                  <input
                  type='text'
                  placeholder='Name'
                  />
                </div>
                <div className='input-profile'>
                  <div className='input-profile-text'>Nationality:</div> 
                  <input
                  type='text'
                  placeholder='Name'
                  />
                  </div>
                <div className='input-profile'>
                  <div className='input-profile-text'>Middle Name:</div> 
                  <input
                  type='text'
                  placeholder='Name'
                  />
                </div>
                <div className='input-profile'>
                  <div className='input-profile-text'>Civil Status:</div> 
                  <input
                  type='text'
                  placeholder='Name'
                  />
                </div>
                <div className='input-profile'>
                  <div className='input-profile-text'>Last Name:</div> 
                  <input
                  type='text'
                  placeholder='Name'
                  />
                </div>
                <div className='input-profile'>
                  <div className='input-profile-text'>Gender:</div> 
                  <input
                  type='text'
                  placeholder='Name'
                  />
                </div>
                <div className='input-profile'>
                  <div className='input-profile-text'>Birthday:</div> 
                  <input
                  type='text'
                  placeholder='Name'
                  />
                </div>
                <div className='input-profile'>
                  <div className='input-profile-text'>Address:</div> 
                  <input
                  type='text'
                  placeholder='Name'
                  />
                </div>
                <div className='input-profile'>
                  <div className='input-profile-text'>Contact Number:</div> 
                  <input
                  type='text'
                  placeholder='Name'
                  />
                </div>
                <div className='input-profile'>
                  <div className='input-profile-text'>Number of Section:</div> 
                  <input
                  type='text'
                  placeholder='Name'
                  />
                </div>
                </div>
              </div>
            </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BodyInformationKid;
