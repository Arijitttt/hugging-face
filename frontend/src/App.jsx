import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
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
    </>
  )
}

export default App
