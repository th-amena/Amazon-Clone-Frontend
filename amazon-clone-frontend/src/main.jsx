import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initialState, reducer } from './Utility/reducer.js'
import {DataProvider} from './Components/DataProvider/DataProvider.jsx'

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <DataProvider reducer={reducer} intialState={initialState}>
         <App />
      </DataProvider>
   </StrictMode>
);
