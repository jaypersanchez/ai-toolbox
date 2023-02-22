import React, { useEffect, useState, useMemo } from 'react';
import { Button, Tabs, Tab, Container, Nav, Navbar, Form, Modal } from 'react-bootstrap'
import Web3 from 'web3';
import '../App.css'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


const TopBar = () => {

    const [currentAccount, setCurrentAccount] = useState("")
    const [accountBalance, setAccountBalance] = useState("")
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    
    return(
        <>
            <div className='App.header'>
                <Navbar bg='light' expand='lg'>
                    <Container>
                        <Navbar.Brand>Wallet Address: {currentAccount}</Navbar.Brand>
                        <Navbar.Brand>Wallet ETH Balance: {accountBalance}</Navbar.Brand>
                    </Container>
                </Navbar>
            </div>
            <div>
                    <p>Microphone: {listening ? 'on' : 'off'}</p>
                    <Button variant="secondary" class="btn btn-outline-primary mr-1" onClick={SpeechRecognition.startListening}>Start</Button>
                    <Button variant="secondary" class="btn btn-outline-primary mr-1" onClick={SpeechRecognition.stopListening}>Stop</Button>
                    <Button variant="secondary" class="btn btn-outline-primary mr-1" onClick={resetTranscript}>Reset</Button>
            </div>
        </>
    )

}

export default TopBar;