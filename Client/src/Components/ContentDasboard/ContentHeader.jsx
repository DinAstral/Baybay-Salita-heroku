import React , {useContext}from 'react'
import './Content.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBell } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../../context/userContext'
import usericon from '../../assets/profile.png'
import { Link } from 'react-router-dom'

const ContentHeader = () => {
  const {user} = useContext(UserContext)

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      View your profile.
    </Tooltip>
  );

  return (
    <div className='content-header'>
        <div className="header-activity">
            <div className="search-box">
            <FontAwesomeIcon icon={faMagnifyingGlass} size='1x' inverse className="con-icon"/>
                <input type="text" placeholder='Search anything here...'/>
            </div>

            <div className="notify">
            <FontAwesomeIcon icon={faBell} size='1x' className="con-icon"/>
            </div>

            <div className="user1-profile">
               <OverlayTrigger
                 placement="bottom"
                 delay={{ show: 200, hide: 300 }}
                  overlay={renderTooltip}
               ><Link to={'/parentProfile'}><img src={usericon} alt="" className='profile-icon'/></Link>
               </OverlayTrigger>
              <div className="user-details">
              {!!user && (<h5>Hi {user.FirstName}!</h5>)}
                 <h4>Parent</h4>
              </div>
            </div>
        </div>
      
    </div>
  )
}

export default ContentHeader
