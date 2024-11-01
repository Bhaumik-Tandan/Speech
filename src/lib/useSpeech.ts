import { useEffect, useState,useRef } from 'react';

import { createSpeechEngine, PlayingState } from './speech';

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/

const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState([0, 0]);

  const [playbackState, setPlaybackState] = useState<PlayingState>("initialized");

  const engineRef=useRef(
    createSpeechEngine({
      onBoundary: (e:SpeechSynthesisEvent)=>{
        if(e.name==='word')
        {
          setCurrentWordRange([e.charIndex,e.charIndex+e.charLength])
        }},
        onEnd:(e:SpeechSynthesisEvent)=>{
          setCurrentSentenceIdx(prev=>{
            const nextIdx=prev+1;
            if(nextIdx<sentences.length)
            {
              engineRef.current.load(sentences[nextIdx]);
              return nextIdx;
            }
            return prev;
          });
        },
        onStateUpdate:(state:PlayingState)=>{
          setPlaybackState(state);
        }
    })
  );

  useEffect(()=>{
    if(sentences.length>0)
      engineRef.current.load(sentences[0]);

    return ()=>{
      engineRef.current.cancel();
    };
  },[sentences]);

  useEffect(()=>{
    if(sentences.length>0)
      engineRef.current.load(sentences[currentSentenceIdx]);
  },[currentSentenceIdx,sentences]);

  const play = () => {
    if(currentSentenceIdx<sentences.length)
      if(playbackState==="ended")
      {
        setCurrentSentenceIdx(0);
        engineRef.current.load(sentences[0]);
      }
      engineRef.current.play();
  };
  const pause = () => {
    engineRef.current.pause();
  };

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };
