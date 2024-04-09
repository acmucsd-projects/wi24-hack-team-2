import React from 'react';

/*import '../components/home/Classes/Classes';
import '../components/home/ClassTimes/ClassTimes';
import '../components/home/Schedule/Schedule';
import '../components/home/Switch/Switch';
import '../components/home/Update/Update';*/

import '../components/home/home.css';
import ClassTimes from '../components/home/ClassTimes/ClassTimes';
import Classes from '../components/home/Classes/Classes';
import Update from '../components/home/Update/Update';
import Switch from '../components/home/Switch/Switch';
import Schedule from '../components/home/Schedule/Schedule';
// import Rating from '../components/home/Rating';

const Home = () => {

    //put java script code here
  return (
    //put html code here
    <main>
      <head>
        <style>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Karla"></link>
            <link rel="stylesheet" href='../components/home/home.css'></link>
        </style>
      </head>

      <body>
        <div className="home">
          <div><h1>preferences</h1></div>
          <div><Classes /></div>
          <div><ClassTimes /></div>
          <div><Update /></div> 
          <div><Switch /></div>
          <div><Schedule /></div>
        </div>
      </body>
    </main>
  );
};
export default Home;