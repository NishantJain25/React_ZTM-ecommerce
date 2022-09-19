import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Home from './routes/home/home.component.jsx'
import SignIn from './routes/sign-in/sign-in.component.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
const Shop = () => {
  return <h1>I am the Shop Page</h1>
}
const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path = "/" element = {<App />}>
    <Route index element = {<Home />}/>
    <Route path = 'shop' element = {<Shop />}/>
    <Route path = 'sign-in' element = {<SignIn />}/>
  </Route>
  )
)
root.render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
