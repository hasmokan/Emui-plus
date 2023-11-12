import createInstance from './instance'
// import { configType } from './type/message'
/**
 * 读取配置并渲染 Message
 * @param {Object} typeCfg 类型配置
 * @param {Object/String} cfg 自定义配置
 */
function renderMsg(typeCfg = {}, cfg: any = '') {
  // 允许直接传入消息内容，因此要判断传入的 cfg 类型
  const isContent = typeof cfg === 'string'

  // 整合自定义配置
  cfg = isContent
    ? {
        content: cfg
      }
    : cfg

  const config = Object.assign({}, typeCfg, cfg) // 合并配置

  const {
    type = 'text', // 消息类型
    content = '', // 消息内容
    icon = '', // 消息图标
    duration = 3000, // 自动关闭延迟时间
    close = false // 是否显示关闭按钮
  } = config

  // 创建实例
  return createInstance({
    type,
    content,
    duration,
    icon,
    close
  })
}

export default {
  // 纯文本消息
  text(cfg = '') {
    const textCfg = {
      type: 'text',
      icon: ''
    }

    return renderMsg(textCfg, cfg)
  },
  // 成功提示
  success(cfg = '') {
    const successCfg = {
      type: 'success',
      icon: 'success'
    }

    return renderMsg(successCfg, cfg)
  },
  // 错误提示
  error(cfg = '') {
    const errorCfg = {
      type: 'error',
      icon: 'Shapex'
    }

    return renderMsg(errorCfg, cfg)
  },
  // 消息提示
  info(cfg = '') {
    const infoCfg = {
      type: 'info',
      icon: 'lights'
    }
    return renderMsg(infoCfg, cfg)
  },
  // 警告
  warning(cfg = '') {
    const warning = {
      type: 'warning',
      icon: 'info'
    }
    return renderMsg(warning, cfg)
  }
}
