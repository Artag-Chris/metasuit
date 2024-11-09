'use client'
import { useEffect } from "react";
import { useUIStore } from "../store";

export default function Home() {
  const { 
   theme,turnBlue
  } = useUIStore()

  const handleClick = () => {
   turnBlue('red')
  };

  useEffect(() => {
    useUIStore .persist.rehydrate()
  }, [])

  return (

    <div style={{backgroundColor:theme.backgroundColor}}>
      <h1>hello</h1>

      <button
        style={{
          backgroundColor: 'blue',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        Clickeame!
      </button>
    </div>

  );
}
