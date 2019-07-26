import React from 'react';
import logo from './logo.svg';
import './App.css';



function move() {
  var elem = document.getElementById("myBar");   
  var width = 0;
  var padding = 0;
  //elem.style.paddingLeft = "400px"
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 12) {
      clearInterval(id);
      elem.innerHTML = "Complete";
      elem.style.color = "#12cf0e";
      elem.style.backgroundColor = "#fff9f2";
      elem.style.textAlign = "center";
      elem.style.paddingRight = "150px";
      elem.style.paddingLeft = "150px";
    } else {
      padding++;
      elem.style.paddingRight = padding + '%';
      elem.style.paddingLeft = padding + '%';
      elem.style.textAlign = "center";
      width++; 
      elem.style.width = width + '%';    
      elem.innerHTML = width * 4  + '%';
      //document.getElementById("demo").innerHTML = width * 4  + '%';
    }
  }
}



function App() {
  return (
    <div>
    <body>
    <div className="header">
      <h1>QMF Catalog</h1>
      <p>Resize the browser window to see the effect.</p>
    </div>


    <div className="row">
      <div >
        <div className="card">
          <h2>Example 1</h2>
          <h5>Title description, Dec 7, 2017</h5>
          <button className="button" onClick={move}><span>Run </span></button>
          <a href="#" className="buttonDownload">Download</a>
          {/* <h2 id="demo">  0%  </h2> */}
          <div id="myBar"></div> 
        </div>
        <div className="card">
          <h2>Example 2</h2>
          <h5>Title description, Dec 7, 2017</h5>
          <button className="button"><span>Run </span></button>
          <a href="#" className="buttonDownload">Download</a>
          <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        </div>
      </div>
    </div>

    <div className="footer">
      <p>Rocket Software 2019</p>
    </div>

    </body>
  
    </div>
  );
}

export default App;
