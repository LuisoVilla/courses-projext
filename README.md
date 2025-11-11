# 🎓 Course Registration System# Getting Started with Create React App



Sistema de registro de cursos con React, Zustand, Styled Components y Mock Service Worker.This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



## 🚀 Características## Available Scripts



- ✅ **Login con Student ID** - Autenticación simple con ID de estudianteIn the project directory, you can run:

- ✅ **Visualización de Cursos** - Ver cursos disponibles para el próximo semestre

- ✅ **Prerequisitos** - Sistema de verificación de prerequisitos### `npm start`

- ✅ **Registro de Cursos** - Registrarse en cursos si se cumplen los prerequisitos

- ✅ **Estado Global con Zustand** - Manejo de estado eficienteRuns the app in the development mode.\

- ✅ **Styled Components** - Estilos modernos y responsiveOpen [http://localhost:3000](http://localhost:3000) to view it in your browser.

- ✅ **Mock API con MSW** - Peticiones HTTP reales visibles en DevTools Network

The page will reload when you make changes.\

## 📦 InstalaciónYou may also see any lint errors in the console.



```bash### `npm test`

npm install

```Launches the test runner in the interactive watch mode.\

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## 🏃 Ejecutar el Proyecto

### `npm run build`

```bash

npm startBuilds the app for production to the `build` folder.\

```It correctly bundles React in production mode and optimizes the build for the best performance.



La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)The build is minified and the filenames include the hashes.\

Your app is ready to be deployed!

## 🔐 Credenciales de Demo

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Usuario 1 (Completó 2 cursos)

- **ID**: `student001`### `npm run eject`

- **Password**: `pass123`

- Cursos completados: Introduction to Programming, Data Structures**Note: this is a one-way operation. Once you `eject`, you can't go back!**



### Usuario 2 (Completó 1 curso)If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

- **ID**: `student002`

- **Password**: `pass123`Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

- Cursos completados: Introduction to Programming

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Usuario 3 (Sin cursos completados)

- **ID**: `student003`## Learn More

- **Password**: `pass123`

- Cursos completados: NingunoYou can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).



## 🌐 API Endpoints (Mocked)To learn React, check out the [React documentation](https://reactjs.org/).



Todas las peticiones son interceptadas por MSW y aparecen en la pestaña **Network** del DevTools.### Code Splitting



### POST `/api/login`This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

**Request:**

```json### Analyzing the Bundle Size

{

  "username": "student001",This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

  "password": "pass123"

}### Making a Progressive Web App

```

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

**Response (200):**

```json### Advanced Configuration

{

  "student": {This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

    "id": "001",

    "username": "student001"### Deployment

  },

  "token": "mock-token-001-1234567890"This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

}

```### `npm run build` fails to minify



### GET `/api/current_term`This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "id": 1,
  "name": "Spring 2024",
  "start_date": "2024-01-15",
  "end_date": "2024-05-15"
}
```

### GET `/api/terms/{id}/courses`
**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "courses": [
    {
      "id": 1,
      "name": "Introduction to Programming",
      "prereqs": []
    },
    {
      "id": 2,
      "name": "Data Structures",
      "prereqs": [1]
    }
  ]
}
```

### GET `/api/students/{id}/registrations`
**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "registrations": [
    {
      "id": 1234567890,
      "course": {
        "id": 1,
        "name": "Introduction to Programming",
        "prereqs": []
      },
      "term": {
        "id": 1,
        "name": "Spring 2024"
      },
      "status": "enrolled"
    }
  ]
}
```

### POST `/api/students/{studentId}/courses/{courseId}/register`
**Headers:**
```
Authorization: Bearer {token}
```

**Request:**
```json
{
  "termId": 1
}
```

**Response (201):**
```json
{
  "registration": {
    "id": 1234567890,
    "course": {
      "id": 1,
      "name": "Introduction to Programming",
      "prereqs": []
    },
    "term": {
      "id": 1,
      "name": "Spring 2024"
    },
    "status": "enrolled"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Prerequisites not met"
}
```

## 🏗️ Estructura del Proyecto

```
src/
├── App.tsx                    # Configuración de rutas
├── index.tsx                  # Entry point + MSW setup
├── styled.d.ts                # TypeScript declarations para styled-components
├── types/
│   └── index.ts               # TypeScript types
├── mocks/
│   ├── browser.ts             # MSW worker setup
│   ├── handlers.ts            # API mock handlers
│   └── mockData.ts            # Datos de prueba
├── pages/
│   ├── Courses.tsx            # Página de cursos
│   └── Login.tsx              # Página de login
├── services/
│   └── api.ts                 # Axios API client
├── store/
│   ├── authStore.ts           # Zustand auth store
│   └── coursesStore.ts        # Zustand courses store
└── styles/
    ├── GlobalStyles.ts        # Estilos globales
    └── theme.ts               # Tema de colores
```

## 🎨 Tecnologías Utilizadas

- **React 19** - Framework UI
- **TypeScript** - Type Safety
- **React Router DOM** - Navegación
- **Zustand** - State Management
- **Styled Components** - CSS-in-JS
- **Axios** - HTTP Client
- **MSW (Mock Service Worker)** - API Mocking
- **React Scripts** - Build tooling

## 🔍 Ver las Peticiones HTTP

1. Abre las **Chrome DevTools** (F12)
2. Ve a la pestaña **Network**
3. Filtra por `api/` para ver solo las peticiones de la API
4. Verás peticiones reales con:
   - Request Headers (Authorization)
   - Request Payload
   - Response Data
   - Status Codes
   - Timing

## 📱 Responsive Design

La aplicación es completamente responsive y funciona en:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Wide (1280px+)

## 🎯 Características del Sistema

### Validación de Prerequisitos
- Los cursos muestran sus prerequisitos
- Indicadores visuales (✓/✗) para prerequisitos completados/faltantes
- Botón de registro deshabilitado si faltan prerequisitos

### Estados de Registro
- **Available**: Puede registrarse (prerequisitos cumplidos)
- **Registered**: Ya registrado en el curso
- **Locked**: Prerequisitos incompletos

### Animaciones
- Fade in para componentes
- Float effect para elementos
- Hover effects en cards
- Shimmer effect para loading states
- Smooth transitions

## 🛠️ Available Scripts

```bash
npm start       # Run in development
npm build       # Build for production
npm test        # Run tests
npm test -- --coverage  # Run tests with coverage
```

## 🧪 Testing

This project includes comprehensive unit and integration tests:

- **Unit Tests**: Zustand stores (auth, courses)
- **Component Tests**: Login, Courses pages
- **Integration Tests**: Full user flow (login → courses → register → logout)

For detailed testing documentation, see [TESTING.md](./TESTING.md)

### Test Coverage
- AuthStore: Login, logout, persistence
- CoursesStore: Data loading, registration, prerequisites
- Login Component: Form validation, authentication
- Courses Component: Course display, registration, logout
- Integration: End-to-end user flows

Run tests:
```bash
npm test                    # Run all tests
npm test -- --watch        # Watch mode
npm test -- --coverage     # With coverage report
```

## 📄 License

Este es un proyecto de demostración educativa.
