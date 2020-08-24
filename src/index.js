import React, {  useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import DynamicRoute from './Routes'
import { Provider } from 'react-redux'
import store from './store'
import * as serviceWorker from './serviceWorker';
import context from "./context/themeContext"
import AppTheme from "./context/apptheme"



const RootComponent = () => {
  const [theme,setTheme] = useState("light")

  const {backgroundColor,textColor}=AppTheme[theme]
useEffect(()=>{
// alert(theme)
document.body.style.backgroundColor=backgroundColor
document.body.style.color=textColor
},[theme])

  return (
    <Provider store={store}>
      <context.Provider value={[theme,setTheme]}>
        <DynamicRoute />
      </context.Provider>
    </Provider>
    //   <context.Provider value={{theme:"grey"}}>
    // <Parent />
    // </context.Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
