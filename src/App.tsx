
import React from 'react';
import './App.css';
import Form, { Forms } from './component/form/form';
import Maincard from './component/main/maincard';
import Navbarr from './component/navbar/nav';


const App:React.FC = () =>{
 
    return (
      <><Navbarr />
      <Maincard name={'sumit'} email={'ps9746850@gmail.com'} />
      <Forms/>
      </>

    
  )

 
}

export default App;
