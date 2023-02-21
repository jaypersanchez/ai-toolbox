import React, { useEffect, useState, useMemo } from 'react';
import { Button, Tabs, Tab, Container, Nav, Navbar, Form, Modal } from 'react-bootstrap'
import Web3 from 'web3';
import '../App.css'

const TopBar = () => {

    const [currentAccount, setCurrentAccount] = useState("")
    const [accountBalance, setAccountBalance] = useState("")
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
        </>
    )

}

export default TopBar;