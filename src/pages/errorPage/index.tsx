import {useRouteError} from 'react-router-dom'
import cn from './style.module.scss'

const Index = () => {
  const error: unknown = useRouteError()
  return (
    <div className={cn.errorPage}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {(error as Error)?.message ||
            (error as {statusText?: string})?.statusText}
        </i>
      </p>
    </div>
  )
}

export default Index
