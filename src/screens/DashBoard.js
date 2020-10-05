import React from 'react';
import SideBar from '../components/misc/SideBar';

const DashBoard = () => {
  return (
    <div class="wrapper d-flex align-items-stretch">
      <SideBar/>
      <div id="content" class="p-4 p-md-5 pt-5">
        <h2 class="mb-4">Content</h2>
      </div>
    </div>
  );
};

export default DashBoard;