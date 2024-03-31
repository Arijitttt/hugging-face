import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import ChatBot from 'react-simple-chatbot'
import {Segment} from 'semantic-ui-react'
function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [result, setResult] = useState('');

  const handleImageSubmit = async () => {
    try {
      const response = await axios.post('/api/inference', { imageUrl });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error performing inference:', error);
    }
  };
const steps = [
  {
    id: 'Greet',
    message: 'Hello! I can help. Please enter your name.',
    trigger: 'AskName',
  },
  {
    id: 'AskName',
    user: true,
    trigger: 'SelectIssue',
  },
  {
    id: 'SelectIssue',
    message: 'Hi {previousValue}, please select your issue.',
    trigger: 'IssueOptions',
  },
  {
    id: 'IssueOptions',
    options: [
      { value: 'React', label: 'React', trigger: 'ReactIssue' },
      { value: 'Angular', label: 'Angular', trigger: 'AngularIssue' },
    ],
  },
  {
    id: 'ReactIssue',
    message: 'Thanks for sharing your React issue.',
    end: true,
  },
  {
    id: 'AngularIssue',
    message: 'Thanks for sharing your Angular issue.',
    end: true,
  },
];
  return (
    <>
      <div>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Enter Image URL"
      />
      <button onClick={handleImageSubmit}>Submit</button>
      {result && <div>{result}</div>}
    </div>
    <Segment floated="right">
      <ChatBot
        steps={steps}/>
    </Segment>
    </>
  )
}

export default App
