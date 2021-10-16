import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  const isProd = mode === 'production'

  const viteEnv = {}
  Object.keys(process.env).forEach(key => {
    if (key.startsWith(`VITE_`)) {
      viteEnv[`import.meta.env.${key}`] = process.env[key] // <-
    }
  })
  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [vue()],
    ...(isProd && { define: viteEnv }),
  })
}
