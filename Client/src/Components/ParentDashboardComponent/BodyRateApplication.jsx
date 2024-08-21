import React, { useState, useEffect } from 'react';
import ContentHeader from '../ContentDasboard/ContentHeader';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {Modal, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faStar } from '@fortawesome/free-solid-svg-icons';
import './rate.css'

const BodyRateApplication = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleStarClick = (index) => {
    setRating(index);
  };

  const handleStarHover = (index) => {
    setHoverRating(index);
  };

  const handleStarHoverOut = () => {
    setHoverRating(0);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Rating:', rating);
    console.log('Comment:', comment);
    // Add your submission logic here

    // Show the success modal
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Optionally reset the form here
    setRating(0);
    setComment('');
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This function allows you to give ratings to the application.
    </Tooltip>
  );

  return (
    <div className='content'>
      <ContentHeader />
      <div className="content-body">
        <div className="content-title-header">
          <div>
          Rate the Application
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
          <form onSubmit={handleSubmit} className="rate-form">
            <div className="rating-section">
              <h1>Give your insights and moments when using the application!</h1>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    className={`star-icon ${index <= (hoverRating || rating) ? 'active' : ''}`}
                    onClick={() => handleStarClick(index)}
                    onMouseEnter={() => handleStarHover(index)}
                    onMouseLeave={handleStarHoverOut}
                  />
                ))}
              </div>
            </div>
            <div className="comment-section">
              <h3>Leave a Comment</h3>
              <textarea
                value={comment}
                onChange={handleCommentChange}
                rows="4"
                placeholder="Write your comments here..."
                className="comment-box"
              />
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your rating and comment have been submitted successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BodyRateApplication;
