import React, {useState, useEffect} from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import '../ContentDasboard/Content.css'
import axios from 'axios';
import toast from 'react-hot-toast';
import TeacherContentHeader from '../ContentDasboard/TeacherContentHeader';


const BodyStudentEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Corrected to get 'id' from useParams
  const [data, setData] = useState({
    LRN: '',
    FirstName: '',
    MiddleName: '',
    LastName: '',
    Age: '',
    Level: '',
    Section: '',
    Birthday: '',
    Address: '',
    MotherTongue: '',
    Nationality: '',
    Gender: '',
    ContactNumber: '',
  });

  useEffect(() => {
    axios.get(`getStudent/${id}`) // route to include student ID
      .then(response => {
        console.log("Response:", response.data); // Log response data
        setData(response.data); // Assuming response.data contains student data
      })
      .catch(err => {
        console.error("Error fetching student data:", err);
        toast.error("Failed to fetch student data. Please try again later.");
      });
  }, [id]); // Added 'id' to dependency array

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This function will edit the information of your students.
    </Tooltip>
  );

  const editStudent = async (e) => {
    e.preventDefault();
    const { LRN, FirstName, MiddleName, LastName, Age, Level, Section, Birthday, Address, MotherTongue, Nationality, Gender, ContactNumber } = data
      try {
        const {data} = await axios.patch(`getStudent/${id}`, {
          LRN, FirstName, MiddleName, LastName, Age, Level, Section, Birthday, Address, MotherTongue, Nationality, Gender, ContactNumber
        })
        if(data.error){
          toast.error(data.error);
        } else{
          setData({})
          toast.success('Updated Student info Successful.')
          navigate('/manageStudent')
        }
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div className='content'>
      <TeacherContentHeader />
      <div className="content-body">
      <div className="content-title-header">
        Edit Student's Information 
        <OverlayTrigger
         placement="bottom"
         delay={{ show: 250, hide: 400 }}
         overlay={renderTooltip}
        >
        <FontAwesomeIcon icon={faCircleInfo} size='1x' className="help-icon" />
        </OverlayTrigger>
      </div>
      <form onSubmit={editStudent}>
      <div className="content-container">
         <div className='back-button-profile'>
            <div className='btn-back' onClick={() => navigate(-1)}>Back</div>
         </div>
        <div className="add-inputs">
        <div className="add-input">
            <div className="label-add">LRN</div>
          <input 
          type="text" 
          name="addLRN" 
          id="addLRN"
          placeholder="Enter student's LRN" 
          value={data.LRN}
          onChange={(e) => setData({...data, LRN: e.target.value})}
          disabled
          />
          </div>
          <div className="add-input">
            <div className="label-add">First Name</div>
          <input 
          type="text" 
          name="addFirstName" 
          id="addFirstName"
          placeholder='Enter the First Name' 
          value={data.FirstName}
          onChange={(e) => setData({...data, FirstName: e.target.value})}
          />
          </div>
          <div className="add-input">
            <div className="label-add">Middle Name</div>
          <input 
          type="text" 
          name="addMiddleName" 
          id="addMiddleName"
          placeholder='Enter the Middle Name' 
          value={data.MiddleName}
          onChange={(e) => setData({...data, MiddleName: e.target.value})}
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
          onChange={(e) => setData({...data, LastName: e.target.value})}
          />
          </div>
          <div className="add-input">
            <div className="label-add">Age</div>
          <input 
          type="text" 
          name="addAge" 
          id="addAge" 
          placeholder="Enter student's age"
          value={data.Age}
          onChange={(e) => setData({...data, Age: e.target.value})}
          />
          </div>
          <div className="add-input">
        <div className="label-add">Grade Level</div>
        <select
          className='select-gender'
          name="addGender"
          id="addGender"
          value={data.Level}
          onChange={(e) => setData({...data, Level: e.target.value})}
        >
          <option value="" disabled>Select Grade Level</option>
          <option value="male">Grade 1</option>
          <option value="female">Grade 2</option>
        </select>
      </div>
          <div className="add-input">
            <div className="label-add">Section</div>
          <input 
          type="text" 
          name="addSection" 
          id="addSection"
          placeholder='Enter the Section' 
          value={data.Section}
          onChange={(e) => setData({...data, Section: e.target.value})}
          />
          </div>
          <div className="add-input">
            <div className="label-add">Birthday</div>
          <input 
          type="date" 
          name="addBirthday" 
          id="addBirthday" 
          value={data.Birthday}
          onChange={(e) => setData({...data, Birthday: e.target.value})}
          />
          </div>
          <div className="add-input">
            <div className="label-add">Address</div>
          <input 
          type="address" 
          name="addAddress" 
          id="addAddress"
          placeholder='Enter the Address' 
          value={data.Address}
          onChange={(e) => setData({...data, Address: e.target.value})}
          />
          </div>
          <div className="add-input">
            <div className="label-add">Mother Tongue</div>
          <input 
          type="text" 
          name="addTongue" 
          id="addTongue"
          placeholder='Enter the Mother Tongue' 
          value={data.MotherTongue}
          onChange={(e) => setData({...data, MotherTongue: e.target.value})}
          />
          </div>
          <div className="add-input">
            <div className="label-add">Nationality</div>
          <input 
          type="text" 
          name="addNationality" 
          id="addNationality"
          placeholder='Enter the Nationality' 
          value={data.Nationality}
          onChange={(e) => setData({...data, Nationality: e.target.value})}
          />
          </div>
          <div className="add-input">
        <div className="label-add">Gender</div>
        <select
          className='select-gender'
          name="addGender"
          id="addGender"
          value={data.Gender}
          onChange={(e) => setData({...data, Gender: e.target.value})}
        >
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
        </div>
        <div className='add-student'>
        <button className='btn-add' type='submit'>Save Changes</button>
        </div>
       </div>
       </form>
      </div>
      </div>
  )
}

export default BodyStudentEdit
