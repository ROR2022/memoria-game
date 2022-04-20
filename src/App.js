import { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';

function App() {
  const [images, setImages]=useState([]);
  const [nivel, setNivel]=useState(1);
  

  

 useEffect(function () {
  fetch("https://api.imgflip.com/get_memes")
  .then(res=> res.json())
  .then(data=> {
      setImages(data.data.memes);
  })
}, [])

const baraja = ()=> {
  let array = [];
  let arrayTemp = images;
  if (images.length>95){
    for (let i=0; i<(3*nivel);i++){
      let number = Math.floor(Math.random()*arrayTemp.length);
        array[i]= {
          url: arrayTemp[number].url,
          name: arrayTemp[number].name,
          hold: false
        }
        arrayTemp = arrayTemp.filter(item=>item.name!==array[i].name);
        
    }
  }
  
  return array;
}

  function aumentaNivel() {
    setNivel(prev=> prev+1);
    console.log("nuevo nivel:",nivel);
  }


 
  

  return (
    <div className="App">
        <Header/>
        
        {images.length>0 && <Main baraja={baraja()} aumentaNivel={()=>aumentaNivel()}/>}
        {nivel===2 && <Main baraja={baraja()} aumentaNivel={()=>aumentaNivel()}/> }
        {nivel===3 && <Main baraja={baraja()} aumentaNivel={()=>aumentaNivel()}/> }
        {nivel===4 && <Main baraja={baraja()} aumentaNivel={()=>aumentaNivel()}/> }
        {nivel===5 && <Main baraja={baraja()} />} 
    </div>
  );
}

export default App;
