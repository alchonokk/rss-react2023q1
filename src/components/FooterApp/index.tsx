import React from 'react';
import MemberTag from './MemberTag';
import './style.css';

function FooterApp() {
  return (
    <>
      <footer>
        <div className="git-user">
          <MemberTag gitHubProfile="https://github.com/alchonokk" name="Halina" />
        </div>
        <p className="created-data"> © 2023 </p>
        <a href="https://rs.school/react/" target="_blank" rel="noreferrer" className="rs-logo">
          RSSchool
        </a>
      </footer>
    </>
  );
}

export default FooterApp;
