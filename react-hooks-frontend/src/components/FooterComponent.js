import React from 'react';

const FooterComponent = () => {
  return (
      <div>
        <footer className="footer">
          <span className="text-muted">All Rights Reserved {new Date().getFullYear()} @EgiKarakashi</span>
        </footer>
      </div>
  )
}

export default FooterComponent;
