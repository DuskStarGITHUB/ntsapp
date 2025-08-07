# 📝 NTS App (Note Taker System)

**NTS App** es una aplicación de escritorio multiplataforma enfocada en la gestión de notas simples y cifradas, con una estética minimalista, transparente y oscura, diseñada para ofrecer rendimiento, privacidad y una experiencia fluida.

NOW UI 1.0
<div align="center">
  <img width="874" height="670" alt="imagen" src="https://github.com/user-attachments/assets/c10e5b1a-a288-42e4-b18e-5b5e3efba7de" />
</div>

---

## 🚀 Características

- 🧠 Interfaz intuitiva con soporte para `.txt` y `.nts` (formato cifrado).
- 🌐 Tecnología base: [Electron](https://electronjs.org), [Vite](https://vitejs.dev).
- 🔐 Soporte para cifrado personalizado.
- ⚙️ Compatible con Linux, Windows y macOS.
- 💻 Soporte Automatico de Transparencia + desenfoque (blur) en KDE Plasma con KWin (Linux).
<div align="center">
  <img width="300" height="500" alt="imagen" src="https://github.com/user-attachments/assets/c8b41de4-173f-468f-879e-d4a47c1af937" />
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

# Inicia Vite en modo desarrollo para elementos garficos
npm run dev

# En otra terminal, lanza la app Electron para ventana
npm run electron

```

