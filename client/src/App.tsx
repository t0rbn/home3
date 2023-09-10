import React from 'react';
// import logo from './logo.svg';
import './App.css';
import RoomLights from "./lights/RoomLights";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Home from "./home/Home";
import ContextsProviderWrapper from "./globals/contexts-provider-wrapper/ContextsProviderWrapper";
import Administration from "./administration/Administration";

function App() {
    return (
        <ContextsProviderWrapper>
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route index element={<Navigate replace to="/home"/>}/>
                        <Route path="/home" element={<Home/>}></Route>
                        <Route path="/lights/groups/:id" element={<RoomLights/>}></Route>
                        <Route path="/administration" element={<Administration/>}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </ContextsProviderWrapper>
    );
}

export default App;
