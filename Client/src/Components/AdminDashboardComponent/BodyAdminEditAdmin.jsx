import React, { useState,useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import '../ContentDasboard/Content.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminContentHeader from '../ContentDasboard/AdminContentHeader';

const BodyAdminEditAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This function will add Information for your students in your section.
    </Tooltip>
  );

  const [data, setData] = useState({
    FirstName: '',
    LastName: '',
    Age: '',
    Birthday: '',
    Gender: '',
    Address: '',
    Status: '',
    ContactNumber: '',
    email: '',
  });

  useEffect(() => {
    axios.get(`getUser/${id}`) // route to include student ID
      .then(response => {
        console.log("Response:", response.data); // Log response data
        setData(response.data); // Assuming response.data contains student data
      })
      .catch(err => {
        console.error("Error fetching student data:", err);
        toast.error("Failed to fetch student data. Please try again later.");
      });
  }, [id]); // Added 'id' to dependency array

  const editAdmin = async (e) => {
    e.preventDefault();
    const { FirstName, LastName, Age, Birthday, Address, Status, Gender, ContactNumber, email,} = data
      try {
        const {data} = await axios.patch(`updateParent/${id}`, {
            FirstName, LastName, Age, Birthday, Address, Status, Gender, ContactNumber, email,
        })
        if(data.error){
          toast.error(data.error);
        } else{
          setData({})
          toast.success('Updated Parent information.')
          navigate('/adminUsers')
        }
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div className='content'>
      <AdminContentHeader />
      <div className="content-body">
        <div className="content-title-header">
          <div>
          Edit Your Information 
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <FontAwesomeIcon icon={faCircleInfo} size='1x' className="help-icon" />
          </OverlayTrigger>
          </div>
        </div>
        <form onSubmit={editAdmin}>
          <div className="content-container">
            <div className='back-button-profile'>
              <div className='btn-back' onClick={() => navigate(-1)}>Back</div>
            </div>
            <div className="add-inputs">
              <div className="add-input">
                <div className="label-add">First Name</div>
                <input 
                  type="text" 
                  name="addFirstName" 
                  id="addFirstName"
                  placeholder='Enter the First Name' 
                  value={data.FirstName}
                  onChange={(e) => setData({ ...data, FirstName: e.target.value })}
                />
              </div>
              <div className="add-input">
                <div className="label-add">Last Name</div>
                <input 
                  type="text" 
                  name="addLastName" 
                  id="addLastName"
                  placeholder='Enter the Last Name' 
                  value={data.LastName}
                  onChange={(e) => setData({ ...data, LastName: e.target.value })}
                />
              </div>
              <div className="add-input">
                <div className="label-add">Age</div>
                <input 
                  type="text" 
                  name="addAge" 
                  id="addAge" 
                  placeholder="Enter Teacher's age"
                  value={data.Age}
                  onChange={(e) => setData({ ...data, Age: e.target.value })}
                />
              </div>
              <div className="add-input">
                <div className="label-add">Birthday</div>
                <input 
                  type="date" 
                  name="addBirthday" 
                  id="addBirthday" 
                  placeholder="Enter Parent's Birthday"
                  value={data.Birthday}
                  onChange={(e) => setData({ ...data, Birthday: e.target.value })}
                />
              </div>
              <div className="add-input">
                <div className="label-add">Gender</div>
                <select
                  className='select-gender'
                  name="addGender"
                  id="addGender"
                  value={data.Gender}
                  onChange={(e) => setData({ ...data, Gender: e.target.value })}
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="add-input">
                <div className="label-add">Address</div>
                <input 
                  type="text" 
                  name="addAddress" 
                  id="addAddress"
                  placeholder='Enter the Address' 
                  value={data.Address}
                  onChange={(e) => setData({ ...data, Address: e.target.value })}
                />
              </div>
              <div className="add-input">
                <div className="label-add">Status</div>
                <select
                  className='select-gender'
                  value={data.Status}
                  onChange={(e) => setData({ ...data, Status: e.target.value })}
                >
                  <option value="" disabled>Select Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Separated">Separated</option>
                </select>
              </div>
              <div className="add-input">
                <div className="label-add">Contact Number</div>
                <input 
                  type="text" 
                  name="addContactNumber" 
                  id="addContactNumber"
                  placeholder='Enter the Contact Number' 
                  value={data.ContactNumber}
                  onChange={(e) => setData({ ...data, ContactNumber: e.target.value })}
                />
              </div>
              <div className="add-input">
                <div className="label-add">Email</div>
                <input 
                  type="email" 
                  name="addEmail" 
                  id="addEmail"
                  placeholder="Enter the Teacher's Email" 
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
            </div>
            <div className='add-student'>
              <button className='btn-add' type='submit'>Save Changes</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BodyAdminEditAdmin;
