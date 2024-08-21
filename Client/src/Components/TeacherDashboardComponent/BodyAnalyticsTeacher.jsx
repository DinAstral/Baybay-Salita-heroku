import React, { useState,useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {Box, ThemeProvider} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import '../ContentDasboard/Content.css';
import TeacherContentHeader from '../ContentDasboard/TeacherContentHeader';

const BodyAnalyticsTeacher = () => {

  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(null);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This function will add Information for your students in your section.
    </Tooltip>
  );

  useEffect(() => {
    const menuItem = [
      '/teacherDashboard',
      '/teacherDashboard',
    ];
    const index = menuItem.findIndex(item => item === location.pathname);
    setActiveIndex(index);
  }, [location.pathname]);

  const toggleActive = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className='content'>
      <TeacherContentHeader />
      <div className="content-body">
        <div>
        <div className="content-title-header">
          <div>
          Dashboard
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <FontAwesomeIcon icon={faCircleInfo} size='1x' className="help-icon" />
          </OverlayTrigger>
          </div>
        </div>
        </div>
        <div className="dash-content-container">
          <div className='profile-nav'>
              {[
                { text: 'Dashboard Details', link: '/teacherDashboard' },
                { text: 'Performance Assessment', link: '/teacherDashboard' },
              ].map((item, index) => (
                <Link key={index} to={item.link} className={`profile-nav-item ${index === activeIndex ? 'active' : ''}`}>
                  <div onClick={() => toggleActive(index)}>
                    {item.text}
                  </div>
                </Link>
              ))}
           </div>
          <div className='dash-details'>
          <Box
          height={180}
          width={200}
          borderRadius={5}
          my={4}      
          display="flex"      
          flexDirection={'column'} 
          textAlign={'center'}         
          p={2}     
          sx={{ border: '2px solid grey' }}   
          >
            <h1>0</h1>
            <h4>Number of Activity</h4>
          </Box>
          <Box
          height={180}
          width={200}
          borderRadius={5}
          my={4}      
          display="flex"      
          flexDirection={'column'} 
          textAlign={'center'}         
          p={2}     
          sx={{ border: '2px solid grey' }}   
          >
            <h1>0</h1>
            <h4>Number of Task</h4>
          </Box>
          <Box
          
          height={180}
          width={200}
          borderRadius={5}
          my={4}      
          display="flex"      
          flexDirection={'column'} 
          textAlign={'center'}         
          p={2}     
          sx={{ border: '2px solid grey' }}   
          >
            <h1>0</h1>
            <h4>Number of Sections</h4>
          </Box>
          <Box
          height={180}
          width={200}
          borderRadius={5}
          my={4}      
          display="flex"      
          flexDirection={'column'} 
          textAlign={'center'}         
          p={2}     
          sx={{ border: '2px solid grey' }}   
          >
            <h1>0</h1>
            <h4>Number of Students</h4>
          </Box>
          </div>
          <div className='dash-graph'>

          <BarChart
          xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'], label: 'Student Score' }]}     
          series={[
            { 
              data: [4, 3, 5] 
            }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}      
          width={500}
          height={300}
          />
          <LineChart       
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          width={500}
          height={300}
          />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BodyAnalyticsTeacher;
