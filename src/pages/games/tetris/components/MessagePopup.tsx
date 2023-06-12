import cn from '../style.module.scss'

const MessagePopup = ({hidden}: {hidden: boolean}) => {
  return (
    <div className={`${cn.messagePopup} ${!hidden && cn.hidden}`}>
      <h1>Message Title</h1>
      <p>Message info...</p>
    </div>
  )
}

export default MessagePopup
