import fs from 'fs-extra'
import path from 'path'
import config from '../vite.config'
import {
  build,
  InlineConfig,
  defineConfig,
  UserConfig,
  BuildOptions
} from 'vite'
;(config as InlineConfig).configFile = false //不会根据vite.config.js配置进行打包
const buildAll = async () => {
  // 全量打包
  await build(defineConfig(config as UserConfig) as InlineConfig) // await build(defineConfig({}))
  const srcDir = path.resolve(__dirname, '../src/')
  fs.readdirSync(srcDir)
    .filter((name) => {
      // 只要目录不要文件，且里面包含index.ts
      const componentDir = path.resolve(srcDir, name)
      const isDir = fs.lstatSync(componentDir).isDirectory()
      return isDir && fs.readdirSync(componentDir).includes('index.ts')
    })
    .forEach(async (name) => {
      const outDir = path.resolve(config.build.outDir, name)

      const custom = {
        lib: {
          entry: path.resolve(srcDir, name),
          name, // 导出模块名
          fileName: `index`,
          formats: [`es`, `umd`]
        },
        outDir
      }
      const tempConfig = { ...config } as UserConfig
      tempConfig.build = { ...tempConfig.build, ...custom } as BuildOptions
      await build(defineConfig(tempConfig as UserConfig) as InlineConfig)

      fs.outputFile(
        path.resolve(outDir, `package.json`),
        `{
            "name": "em-ui-vite/${name}",
            "main": "index.umd.js",
            "module": "index.umd.js"
          }`,
        `utf-8`
      )
    })
}

buildAll()
