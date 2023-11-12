import { createApp } from 'vue'
import Message from './message.vue'
import { configType } from './type/message'
const createInstance = (cfg: configType) => {
  const config = cfg || {}

  const messageNode = document.createElement('div')
  const attr = document.createAttribute('class')
  attr.value = 'messages'
  messageNode.setAttributeNode(attr)
  const height = 54 // 单个消息框高度

  const messageList = document.getElementsByClassName(
    'messages'
  ) as HTMLCollectionOf<HTMLDivElement>
  messageNode.style.top = `${messageList.length * height + 20}px`

  const app = createApp(Message, {
    config,
    remove() {
      handleRemove() // 移除元素，消息关闭后从 Dom 上取消挂载并移除
    }
  }) as any

  // 挂载实例并追加到 body 结尾
  app.vm = app.mount(messageNode)
  document.body.appendChild(messageNode)

  app.close = () => {
    handleRemove()
  }

  const handleRemove = () => {
    app.unmount(messageNode)
    document.body.removeChild(messageNode)
    resetMsgTop()
  }

  const resetMsgTop = () => {
    for (let i = 0; i < messageList.length; i++) {
      messageList[i].style.top = `${i * height}px`
    }
  }
  return app
}

export default createInstance
