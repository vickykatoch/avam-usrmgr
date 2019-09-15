import React from 'react';
import './Header.css';

const Header: React.FC = () => {
    
    return (
      <div className="d-flex no-shrink usr-header">
          <div className="no-shrink">
              Logo
          </div>
          <div className="d-flex flex-fill justify-content-end">
              <i className="fa fa-bars fa-2x"></i>
          </div>
      </div>
    );
  }
  
  export default Header;