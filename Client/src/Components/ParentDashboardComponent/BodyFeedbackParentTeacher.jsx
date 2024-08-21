import React, { useState, useEffect } from 'react';
import ContentHeader from '../ContentDasboard/ContentHeader';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import profile from './../../assets/profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faCircleInfo, faEnvelope, faSearch } from '@fortawesome/free-solid-svg-icons';

const BodyFeedbackParentTeacher = () => {

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This function will give feedback to the teacher.
    </Tooltip>
  );

  return (
    <div className='content'>
      <ContentHeader />
      <div className="content-body">
        <div className="content-title-header">
          <div>
          Feedback of the teacher
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
            <div className='kid-search-bar'>
              <div className="search-box-table">
                <FontAwesomeIcon icon={faSearch} size="1x" inverse className="con-icon" />
                <input type="text" placeholder="Find the Teacher Name" />
              </div>
              <div className='search-button-profile'>
                <button className='btn-back' >Search</button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BodyFeedbackParentTeacher;
