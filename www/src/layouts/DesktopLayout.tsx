import React from 'react';
import Header from '../common/Header';
import './DesktopLayout.css';

const DesktopLayout: React.FC = () => {
    return (
      <div className="d-flex flex-fill flex-column desk-layout">
          <Header />
          <div className="d-flex flex-fill body">

            <div className="menu-bar">
                
            </div>
          </div>
      </div>
    );
  }
  
  export default DesktopLayout;