# 📝 NTS App (Note Taker System)

**NTS App** es una aplicación de escritorio multiplataforma enfocada en la gestión de notas simples y cifradas, con una estética minimalista, transparente y oscura, diseñada para ofrecer rendimiento, privacidad y una experiencia fluida.

NOW UI 2.0
<div align="center">
  <img width="1882" height="1075" alt="imagen" src="https://github.com/user-attachments/assets/52120679-aaad-45ef-903a-e8a1f67141d5" />
</div>

---

## 🚀 Características

- 🧠 Interfaz intuitiva con soporte para `.txt` y `.nts` (formato cifrado).
- 🌐 Tecnología base: [Electron](https://electronjs.org), [Vite](https://vitejs.dev).
- 🔐 Soporte para cifrado personalizado.
- ⚙️ Compatible con Linux, Windows y macOS.
- 💻 Soporte Automatico de Transparencia + desenfoque (blur) en KDE Plasma con KWin (Linux).
<div align="center">
  <img width="1054" height="771" alt="imagen" src="https://github.com/user-attachments/assets/07d1370a-7af2-4018-9d73-92aca8e78176" />
</div>



---

## 🗂️ Estructura del proyecto

```bash
ntsapp/
├── main.js # Punto de entrada de Electron, gestiona la ventana principal y la comunicación con el renderer.
├── package.json # Define los scripts, dependencias y metadatos del proyecto.
├── vite.config.js # Configuración de Vite para el empaquetado y desarrollo del frontend.
├── tailwind.config.js # Configuración de Tailwind CSS para los estilos de la aplicación.
├── postcss.config.js # Configuración de PostCSS para el procesamiento de CSS.
├── prettier.config.js # Reglas de formato de código para mantener un estilo consistente.
├── jsconfig.json # Configuración del proyecto JavaScript para el editor.
├── components.json # Configuración para la CLI de shadcn/ui.
├── LICENSE # Licencia del proyecto.
├── README.md # Este archivo.
├── .gitignore # Archivos y carpetas ignorados por Git.
├── src/
│   ├── components/ # Componentes de la interfaz de usuario (UI) basados en shadcn/ui.
│   ├── core/ # Lógica central de la aplicación (manejo de archivos, IPC, etc.).
│   ├── hooks/ # Hooks de React para la gestión de estado y lógica de componentes.
│   ├── lib/ # Utilidades y librerías auxiliares.
│   ├── modules/ # Módulos principales de la aplicación (Editor, Sidebar, etc.).
│   ├── scripts/ # Scripts externos (Python) para funcionalidades específicas del sistema operativo.
│   ├── styles/ # Archivos de estilos globales y específicos de componentes.
│   ├── App.jsx # Componente principal de React que renderiza la aplicación.
│   ├── index.html # Punto de entrada HTML para el renderer de Electron.
│   └── renderer.jsx # Script que renderiza la aplicación de React en la ventana de Electron.
├── .vscode/
├── settings.json # GIT Config for VSCode
```

---

## 🧪 Requisitos

- **Node.js**
- **Python 3** (solo Linux para blur opcional)
- **xdotool** y **xprop** (Linux, requeridos para aplicar blur en KWin)

---

## 🛠️ Instalación

```bash
git clone https://github.com/DuskStarGITHUB/ntsapp.git
cd ntsapp
npm install

# Ejecucion automatica
npm run start

#Separado
# Inicia Vite en modo desarrollo para elementos graficos
npm run dev
# En otra terminal, lanza la app Electron para ventana
npm run electron

```

## 🛠️ Lanzamiento


Modo de user/developer

```main.js

// STATE EXEC
const userApp = 'developer'

```

Cambiar para Mostrar/Ocultar DEVTOOLs DevTools en archivo main.js


