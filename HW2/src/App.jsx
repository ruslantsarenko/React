import React from "react";
import List from "./Components/List";

export default function App() {
  const animals = [
    { type: 'turtle', icon: '🐢' },
    { type: 'octopus', icon: '🐙' },
    { type: 'fish', icon: '🐠' },
    { type: 'flamingo', icon: '🦩' },
    { type: 'penguin', icon: '🐧' }
  ];
  return (
    <>
     <List animals={animals} />
    </>
   
  )
}