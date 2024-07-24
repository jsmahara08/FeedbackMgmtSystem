import React from 'react'
import RouterAll from './router/RouterAll'
import { BrowserRouter } from "react-router-dom";


const App = () => {
  return (
      <>
          <BrowserRouter>
              <RouterAll/>
          </BrowserRouter>
    </>
  )
}

export default App
