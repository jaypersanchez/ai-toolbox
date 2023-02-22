import React, { useEffect, useState, useMemo } from 'react';
import { Button, Tabs, Tab, Container, Nav, Navbar, Form, Modal } from 'react-bootstrap'
import Web3 from 'web3';
import axios from 'axios'
import '../App.css'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import ReactTypingEffect from 'react-typing-effect';

const PlayGround = () => {

    const [userPrompt, setUserPrompt] = useState('');
    const [response, setResponse] = useState('Response');
    const [maxTokens, setMaxTokens] = useState(500)
    const [chatgptkey, setChatGptKey] = useState(process.env.REACT_APP_CHATGPT_KEY)
    const [gptmodel, setGptModel] = useState('text-davinci-003')
    const [chatgpturl, setChatGptUrl] = useState(`https://api.openai.com/v1/engines/${gptmodel}/completions`)
    const [temperature, setTemperature] = useState(1)
    
    useEffect(() => {
        console.log(`PG ChatGpt Key ENV${process.env.REACT_APP_CHATGPT_KEY}`)
    })

    const handlePrompt = async() => {
        console.log(`${userPrompt}::${maxTokens}::${temperature}`)
        let response = await fetch(chatgpturl, {
            method: `POST`,
            headers: {
                'Content-type':'application/json',
                'Authorization': `Bearer ${chatgptkey}`
            },
            body: JSON.stringify({
                prompt: userPrompt,
                temperature: temperature,
                max_tokens: maxTokens
            })
        })
        const data = await response.json();
        if (data && data.choices && data.choices[0] && data.choices[0].text) {
            //console.log(data.choices[0].text)
            setResponse(data.choices[0].text)
        }
    }

    return(
        <>
            <div className='App.header'>ChatGpt Playground</div>
            <div>
                <Form.Group className='mb-3' id="prompt">
                    <Form.Control placeholder='Ask Your Question' onChange={(e) => {setUserPrompt(e.target.value)}}/>
                </Form.Group>
            </div>
            <div>
                <Button variant="primary" onClick={(e) => handlePrompt(e)}>Submit</Button>
            </div>
            <span className="square border border-2">
                <ReactTypingEffect 
                    text={response} 
                    
                />
            </span>
            
        </>
    );
}

export default PlayGround;