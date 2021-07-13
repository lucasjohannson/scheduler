import {useState} from 'react';

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  const [mode, setMode] = useState(initial);

  const transition = function (newMode, replace = false){
    if(!replace) {
      setHistory([...history,newMode ])
      
    } 
    setMode(newMode)
    
  };

  const back = function () {
    if(history.length === 1){
      return;
    }
    setHistory(prev => {
      const newHistory = [...prev.slice(0, prev.length -1)]; // pop
      return newHistory; //
    })
    setMode(history.slice(-2)[0]);
  };

  return { mode, transition, back };
}