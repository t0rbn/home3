import React from 'react';
import GroupLights from "./lights/GroupLights";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Home from "./home/Home";
import ContextsProviderWrapper from "./globals/contexts-provider-wrapper/ContextsProviderWrapper";
import Administration from "./administration/Administration";

function App() {
    return (
        <ContextsProviderWrapper>
            <BrowserRouter>
                    <Routes>
                        <Route index element={<Navigate replace to="/home"/>}/>
                        <Route path="/home" element={<Home/>}></Route>
                        <Route path="/lights/groups/:id" element={<GroupLights/>}></Route>
                        <Route path="/administration" element={<Administration/>}></Route>
                    </Routes>
            </BrowserRouter>
        </ContextsProviderWrapper>
    );
}

export default App;
