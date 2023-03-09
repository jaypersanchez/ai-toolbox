import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Button, Tabs, Tab, Container, Nav, Navbar, Form, Modal } from 'react-bootstrap'
import Web3 from 'web3';
import axios from 'axios'
import '../App.css'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import ReactTypingEffect from 'react-typing-effect';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const PlayGround = () => {

    const [userPrompt, setUserPrompt] = useState();
    const [response, setResponse] = useState();
    const [contentdata, setContentData] = useState()
    const [maxTokens, setMaxTokens] = useState(500)
    const [chatgptkey, setChatGptKey] = useState(process.env.REACT_APP_CHATGPT_KEY)
    const [gptmodel, setGptModel] = useState('text-davinci-003')
    const [chatgpturl, setChatGptUrl] = useState(`https://api.openai.com/v1/engines/${gptmodel}/completions`)
    const [temperature, setTemperature] = useState(1)
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    
    useEffect(() => {
        if(!browserSupportsSpeechRecognition) {
            console.log(`Browser does not support speech recognition`)
        }
        setUserPrompt(transcript)
    },[transcript, browserSupportsSpeechRecognition])

    

    const handlePrompt = async() => {
        console.log(`${userPrompt}\n\n${contentdata}`)
        let response = await fetch(chatgpturl, {
            method: `POST`,
            headers: {
                'Content-type':'application/json',
                'Authorization': `Bearer ${chatgptkey}`
            },
            body: JSON.stringify({
                prompt: `${userPrompt}\n\n${contentdata}`,
                temperature: temperature,
                max_tokens: maxTokens
            })
        })
        const data = await response.json();
        if (data && data.choices && data.choices[0] && data.choices[0].text) {
            setResponse(data.choices[0].text)
        }
    }

    return(
        <>
            <div className='App.header'>ChatGpt Playground</div>
            <div>
                <Form.Group className='mb-3' id="prompt">
                    <Form.Control placeholder='Ask Your Question' onChange={(e) => {setUserPrompt(e.target.value)}} value={userPrompt}/>
                </Form.Group>
            </div>
            <div>
                <Button variant="primary" onClick={(e) => handlePrompt(e)}>Send Instructions</Button>
            </div>
            <div style={{ 'display': 'flex', 'flex-direction': 'row','justify-content': 'flex-start' }}>
                <TextareaAutosize
                    aria-label="minimum height"
                    value={contentdata}
                    minRows={20}
                    maxRows={50}
                    style={{ width: 1000 }}
                    placeholder='Provide Content'
                    onChange={(e) => setContentData(e.target.value)}
                />
            
            
                <TextareaAutosize
                    aria-label="minimum height"
                    value={response}
                    minRows={20}
                    maxRows={50}
                    style={{ width: 1000 }}
                    placeholder='Result'
                />
            </div>
        </>
    );
}

export default PlayGround;