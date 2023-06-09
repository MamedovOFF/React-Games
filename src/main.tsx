import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import router from './router'
import './styles/main.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
)
