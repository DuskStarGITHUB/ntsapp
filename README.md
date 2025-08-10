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
├── main.js # Punto de entrada de Electron
├── package.json # Configuración y dependencias del proyecto
├── vite.config.js # Configuración de Vite
├── README.md # Este archivo
├── node_modules/ # Dependencias instaladas
├── src/
│ ├── assets/ # Íconos, logos, fuentes...
│ ├── components/ # Componentes de UI reutilizables
│ ├── core/ # Lógica del sistema (lectura, cifrado, etc.)
│ ├── styles/ # CSS globales o específicos
│ ├── scripts/ # Scripts Python o de sistema
│ ├── index.html # Archivo de Elementos Graficos Principal
│ └── renderer.js # JS de la interfaz principal
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

```main.js

# Modo de user/developer

// STATE EXEC
const userApp = 'developer'

## Cambiar para Mostrar/Ocultar DEVTOOLs DevTools

```
