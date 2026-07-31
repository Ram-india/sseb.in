import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Vite watches its own config and restarts, but not tailwind.config.cjs — its
 * PostCSS plugin loads that once at boot. Editing theme tokens therefore left
 * the running server compiling against a stale config, and any new utility
 * ("bg-page", "tracking-eyebrow") failed with "class does not exist" until the
 * server was restarted by hand. This restarts it automatically instead.
 */
function restartOnTailwindConfigChange() {
  const configPath = path.resolve(process.cwd(), 'tailwind.config.cjs')

  return {
    name: 'restart-on-tailwind-config-change',
    configureServer(server) {
      server.watcher.add(configPath)
      server.watcher.on('change', (file) => {
        if (path.resolve(file) === configPath) {
          server.config.logger.info('tailwind.config.cjs changed — restarting server')
          server.restart()
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), restartOnTailwindConfigChange()],
})
