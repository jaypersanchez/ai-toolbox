import { Button, Tabs, Tab, Container, Nav, Navbar, Form, Modal, ModalDialog } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import env from 'react-dotenv'
import logo from './logo.svg';
import './App.css';
import TopBar from './components/TopBar';
import PlayGround from './components/PlayGround'
import DataModelTraining from './components/DataModelTraining'
import { useState, useEffect } from 'react';

function App() {

  
  return (
    <div className="App">
      <header className="App-header">
        <TopBar />
      </header>
      <div>
       <Tabs
        defaultActiveKey="PlayGround"
        id="uncontrolled-tab-example"
        className="mb-3"
       >
          <Tab eventKey="PlayGround" title="Playground">
                <PlayGround />
          </Tab>
          <Tab eventKey="DataModelTraining" title="Data Model Training">
              <DataModelTraining />
          </Tab>
       </Tabs>
      </div>
    </div>
  );
}

export default App;
