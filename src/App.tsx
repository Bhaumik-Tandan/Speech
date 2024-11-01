import './App.css';
import { useEffect, useState } from 'react';
import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { useSpeech } from './lib/useSpeech';
import { fetchContent, parseContentIntoSentences } from './lib/content';

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const {currentSentenceIdx,currentWordRange,playbackState,play,pause}=useSpeech(sentences);
  const loadNewContent=async ()=>{
      const content=await fetchContent();
      const parsedSentences=parseContentIntoSentences(content);
      setSentences(parsedSentences);
  }
  useEffect(()=>{
    loadNewContent();
  },[])

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading currentWordRange={currentWordRange} currentSentenceIdx={currentSentenceIdx} sentences={sentences} />
      </div>
      <div>
        <Controls play={play} pause={pause} loadNewContent={loadNewContent} state={playbackState}/>
      </div>
    </div>
  );
}

export default App;
