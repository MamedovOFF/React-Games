import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import router from './router'
import './styles/main.scss'
import {store} from './store'
import {Provider} from 'react-redux'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
