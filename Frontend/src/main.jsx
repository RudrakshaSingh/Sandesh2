
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import store from './Redux/store.js'

createRoot(document.getElementById('root')).render(

   <Provider store={store}>

    <BrowserRouter
    ><App />
    <Toaster/>
    </BrowserRouter>
    </Provider>

)
