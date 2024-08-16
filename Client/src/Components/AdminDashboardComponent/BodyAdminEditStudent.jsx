import React, {useState, useEffect} from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import '../ContentDasboard/Content.css'
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminContentHeader from '../ContentDasboard/AdminContentHeader';


const BodyAdminEditStudent = () => {
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
      <AdminContentHeader />
      <div className="content-body">
      <div className="content-title-header">
        <div>
        Update Student's Information 
        <OverlayTrigger
         placement="bottom"
         delay={{ show: 250, hide: 400 }}
         overlay={renderTooltip}
        >
        <FontAwesomeIcon icon={faCircleInfo} size='1x' className="help-icon" />
        </OverlayTrigger>
        </div>
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
            value={data.Level}      
            onChange={(e) => setData({...data, Level: e.target.value})}
            >
            <option value="" disabled>Select Grade Level</option>
            <option value="Grade 1">Grade 1</option>
            </select>
         </div>
          <div className="add-input">
                <div className="label-add">Section</div>
                <select
                  className='select-gender'
                  value={data.Section}
                  onChange={(e) => setData({ ...data, Section: e.target.value })}
                >
                  <option value="" disabled>Select Section</option>
                  <option value="Camia">Camia</option>
                  <option value="Daffodil">Daffodil</option>
                  <option value="Daisy">Daisy</option>
                  <option value="Gumamela">Gumamela</option>
                  <option value="Lily">Lily</option>
                  <option value="Rosal">Rosal</option>
                  <option value="Rose">Rose</option>
                  <option value="Santan">Santan</option>
                  <option value="Speacial">Speacial</option>
                </select>
              </div>
          <div className="add-input">
            <div className="label-add">Birthday</div>
          <input 
          type="date" 
          value={data.Birthday}
          onChange={(e) => setData({...data, Birthday: e.target.value})}
          />
          </div>
          <div className="add-input">
            <div className="label-add">Address</div>
          <input 
          type="address" 
          placeholder='Enter the Address' 
          value={data.Address}
          onChange={(e) => setData({...data, Address: e.target.value})}
          />
          </div>
          <div className="add-input">
            <div className="label-add">Mother Tongue</div>
          <input 
          type="text" 
          placeholder='Enter the Mother Tongue' 
          value={data.MotherTongue}
          onChange={(e) => setData({...data, MotherTongue: e.target.value})}
          />
          </div>
          <div className="add-input">
            <div className="label-add">Nationality</div>
          <input 
          type="text" 
          placeholder='Enter the Nationality' 
          value={data.Nationality}
          onChange={(e) => setData({...data, Nationality: e.target.value})}
          />
          </div>
          <div className="add-input">
        <div className="label-add">Gender</div>
        <select
          className='select-gender'
          value={data.Gender}
          onChange={(e) => setData({...data, Gender: e.target.value})}
        >
          <option value="" disabled>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
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

export default BodyAdminEditStudent
