# 📝 ToDo List App

Una aplicación moderna de lista de tareas construida con React y Vite, que incluye una interfaz de usuario atractiva y animaciones de fondo.

## 🚀 Características

- ✨ Interfaz de usuario moderna y responsive
- 🎨 Fondo animado interactivo
- ✅ Gestión completa de tareas (Crear, Leer, Actualizar, Eliminar)
- 💾 Persistencia de datos local
- 🌈 Diseño atractivo y minimalista

## 🛠️ Tecnologías Utilizadas

- React 19
- Vite 6
- FontAwesome para iconos
- CSS personalizado para estilos y animaciones

## 📋 Prerrequisitos

- Node.js (versión recomendada: 18 o superior)
- npm o yarn

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone [url-del-repositorio]
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## 📁 Estructura del Proyecto

```
todolist/
├── src/
│   ├── components/
│   │   ├── AnimatedBackground.jsx   # Componente de fondo animado
│   │   ├── AnimatedBackground.css
│   │   ├── ToDoList.jsx            # Componente principal de la lista
│   │   └── ToDoList.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── reset.css
├── public/
├── index.html
└── package.json
```

## 🚀 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Vista previa de la versión de producción
- `npm run lint`: Ejecuta el linter para verificar el código

## 🔍 Características Detalladas

### Componente ToDoList
- Gestión completa de tareas
- Interfaz intuitiva para añadir, editar y eliminar tareas
- Animaciones suaves en las interacciones
- Persistencia de datos en localStorage

### Componente AnimatedBackground
- Fondo interactivo y dinámico
- Animaciones fluidas
- Diseño responsivo
