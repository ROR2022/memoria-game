import React, { useEffect, useState } from 'react';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';

export default function Main(props) {
    const [images2, setImages2]=useState(inciarRoll());
    const [parejas, setParejas]=useState(images2.filter(item=>item.hold));
    const [cont, setCont]=useState(0);

    console.log(props.baraja);
    useEffect(()=>{
      setCont(0);
    },[props.baraja])

    
    function inciarRoll(){
      let array=[];
      let completo=false;
      let a=0;
      let b=0;
      let c=0;
      do{
          b=Math.floor(Math.random()*props.baraja.length);
          let name=props.baraja[b].name;
          if(array===[]){
            array[0]={
              ...props.baraja[b],
              id: nanoid()
            }
            c=c+1;
          }else{
            a=0;
            for(let i=0;i<array.length;i++){
              if (name===array[i].name){
                a=a+1;
              }
            }
            if(a<2){
              array[c]={
                ...props.baraja[b],
                id: nanoid()
              }
              c=c+1;
            } 
          }
          if(c===props.baraja.length*2){
            completo=true;
          }
      } while(!completo)
      
      return array;
    }
    
    const toggleHold = (id)=> {
        setImages2(prev=> prev.map(item=>{
          return item.id === id ?
          {...item, hold: !item.hold} :
          item
        }))
    }
    

    const imagenes= images2.map((item)=>{
        return (<div  key={nanoid()}>
           
            <img className='imagen' 
            onClick={()=>toggleHold(item.id)}
            src={item.hold ? item.url : "./signo1.png" } alt=''/>
            
            
        </div>)
    })

    

    
    useEffect(()=>{
      setParejas(images2.filter(item=>item.hold));
    },[images2]);

    useEffect(()=>{
      
      if (parejas.length === 2 ){
          if (parejas[0].name === parejas[1].name){
            let array = images2.filter(item=> item.name!== parejas[0].name);
            setTimeout(() => {setImages2(array)}, 1000);
            setCont(prev=>prev+1);
          } else{
            setTimeout(() => {
              setImages2(prev=> prev.map((item)=>{
                return {...item, hold: false}
              }))
            }, 1000);
            
          }
      }
    }, [parejas])

      
  console.log(images2);
  return (
    <div className='img_container'>
        {imagenes}
        {cont===props.baraja.length && <div>
          <Confetti width={window.innerWidth} height={window.innerHeight}/> 
          <div className='feli'>Felicidades!!!</div>
          <div className='level'>Nivel: {props.nivel} completo</div>
          {props.baraja.length<15 && <button className="nivel" onClick={props.aumentaNivel}>Aumentar Nivel</button> }  
          
          </div>
        }
        
    </div>
  )
}
