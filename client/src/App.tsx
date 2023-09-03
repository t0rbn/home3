import React from 'react';
// import logo from './logo.svg';
import './App.css';
import LightsOverview from "./lights/LightsOverview";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Home from "./home/Home";
import ContextsProviderWrapper from "./globals/contexts-provider-wrapper/ContextsProviderWrapper";

function App() {
    return (
        <ContextsProviderWrapper>
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route index element={<Navigate replace to="/home"/>}/>
                        <Route path="/home" element={<Home/>}></Route>
                        <Route path="/lights/groups/:id" element={<LightsOverview/>}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </ContextsProviderWrapper>
    );
}

export default App;
