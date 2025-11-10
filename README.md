# 🎓 Course Registration System# 🎓 Course Registration System# Getting Started with Create React App



Course registration system built with React, Zustand, Styled Components, and Mock Service Worker.



## 🚀 FeaturesSistema de registro de cursos con React, Zustand, Styled Components y Mock Service Worker.This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



- ✅ **Student ID Login** - Simple authentication with student ID

- ✅ **Course Visualization** - View available courses for next semester

- ✅ **Prerequisites** - Prerequisite verification system## 🚀 Características## Available Scripts

- ✅ **Course Registration** - Register for courses if prerequisites are met

- ✅ **Global State with Zustand** - Efficient state management

- ✅ **Styled Components** - Modern and responsive styles

- ✅ **Mock API with MSW** - Real HTTP requests visible in DevTools Network tab- ✅ **Login con Student ID** - Autenticación simple con ID de estudianteIn the project directory, you can run:



## 📦 Installation- ✅ **Visualización de Cursos** - Ver cursos disponibles para el próximo semestre



```bash- ✅ **Prerequisitos** - Sistema de verificación de prerequisitos### `npm start`

npm install

```- ✅ **Registro de Cursos** - Registrarse en cursos si se cumplen los prerequisitos



## 🏃 Run the Project- ✅ **Estado Global con Zustand** - Manejo de estado eficienteRuns the app in the development mode.\



```bash- ✅ **Styled Components** - Estilos modernos y responsiveOpen [http://localhost:3000](http://localhost:3000) to view it in your browser.

npm start

```- ✅ **Mock API con MSW** - Peticiones HTTP reales visibles en DevTools Network



The application will open at [http://localhost:3000](http://localhost:3000)The page will reload when you make changes.\



## 🔐 Demo Credentials## 📦 InstalaciónYou may also see any lint errors in the console.



### User 1 (Completed 2 courses)

- **ID**: `student001`

- **Password**: `pass123````bash### `npm test`

- Completed courses: Introduction to Programming, Data Structures

npm install

### User 2 (Completed 1 course)

- **ID**: `student002````Launches the test runner in the interactive watch mode.\

- **Password**: `pass123`

- Completed courses: Introduction to ProgrammingSee the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.



### User 3 (No completed courses)## 🏃 Ejecutar el Proyecto

- **ID**: `student003`

- **Password**: `pass123`### `npm run build`

- Completed courses: None

```bash

## 🌐 API Endpoints (Mocked)

npm startBuilds the app for production to the `build` folder.\

All requests are intercepted by MSW and appear in the **Network** tab of DevTools.

```It correctly bundles React in production mode and optimizes the build for the best performance.

### POST `/api/login`

**Request:**

```json

{La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)The build is minified and the filenames include the hashes.\

  "username": "student001",

  "password": "pass123"Your app is ready to be deployed!

}

```## 🔐 Credenciales de Demo



**Response (200):**See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

```json

{### Usuario 1 (Completó 2 cursos)

  "student": {

    "id": "001",- **ID**: `student001`### `npm run eject`

    "username": "student001"

  },- **Password**: `pass123`

  "token": "mock-token-001-1234567890"

}- Cursos completados: Introduction to Programming, Data Structures**Note: this is a one-way operation. Once you `eject`, you can't go back!**

```



### GET `/api/current_term`

**Headers:**### Usuario 2 (Completó 1 curso)If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

```

Authorization: Bearer {token}- **ID**: `student002`

```

- **Password**: `pass123`Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

**Response (200):**

```json- Cursos completados: Introduction to Programming

{

  "id": 1,You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

  "name": "Spring 2024",

  "start_date": "2024-01-15",### Usuario 3 (Sin cursos completados)

  "end_date": "2024-05-15"

}- **ID**: `student003`## Learn More

```

- **Password**: `pass123`

### GET `/api/terms/{id}/courses`

**Headers:**- Cursos completados: NingunoYou can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

```

Authorization: Bearer {token}

```

## 🌐 API Endpoints (Mocked)To learn React, check out the [React documentation](https://reactjs.org/).

**Response (200):**

```json

{

  "courses": [Todas las peticiones son interceptadas por MSW y aparecen en la pestaña **Network** del DevTools.### Code Splitting

    {

      "id": 1,

      "name": "Introduction to Programming",

      "prereqs": []### POST `/api/login`This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

    },

    {**Request:**

      "id": 2,

      "name": "Data Structures",```json### Analyzing the Bundle Size

      "prereqs": [1]

    }{

  ]

}  "username": "student001",This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

```

  "password": "pass123"

### GET `/api/students/{id}/registrations`

**Headers:**}### Making a Progressive Web App

```

Authorization: Bearer {token}```

```

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

**Response (200):**

```json**Response (200):**

{

  "registrations": [```json### Advanced Configuration

    {

      "id": 1234567890,{

      "course": {

        "id": 1,  "student": {This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

        "name": "Introduction to Programming",

        "prereqs": []    "id": "001",

      },

      "term": {    "username": "student001"### Deployment

        "id": 1,

        "name": "Spring 2024"  },

      },

      "status": "enrolled"  "token": "mock-token-001-1234567890"This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

    }

  ]}

}

``````### `npm run build` fails to minify



### POST `/api/students/{studentId}/courses/{courseId}/register`

**Headers:**

```### GET `/api/current_term`This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

Authorization: Bearer {token}

```**Headers:**

```

**Request:**Authorization: Bearer {token}

```json```

{

  "termId": 1**Response (200):**

}```json

```{

  "id": 1,

**Response (201):**  "name": "Spring 2024",

```json  "start_date": "2024-01-15",

{  "end_date": "2024-05-15"

  "registration": {}

    "id": 1234567890,```

    "course": {

      "id": 1,### GET `/api/terms/{id}/courses`

      "name": "Introduction to Programming",**Headers:**

      "prereqs": []```

    },Authorization: Bearer {token}

    "term": {```

      "id": 1,

      "name": "Spring 2024"**Response (200):**

    },```json

    "status": "enrolled"{

  }  "courses": [

}    {

```      "id": 1,

      "name": "Introduction to Programming",

**Error Response (400):**      "prereqs": []

```json    },

{    {

  "error": "Prerequisites not met"      "id": 2,

}      "name": "Data Structures",

```      "prereqs": [1]

    }

## 🏗️ Project Structure  ]

}

``````

src/

├── App.tsx                    # Routes configuration### GET `/api/students/{id}/registrations`

├── index.tsx                  # Entry point + MSW setup**Headers:**

├── styled.d.ts                # TypeScript declarations for styled-components```

├── types/Authorization: Bearer {token}

│   └── index.ts               # TypeScript types```

├── mocks/

│   ├── browser.ts             # MSW worker setup**Response (200):**

│   ├── handlers.ts            # API mock handlers```json

│   └── mockData.ts            # Test data{

├── pages/  "registrations": [

│   ├── Courses.tsx            # Courses page    {

│   └── Login.tsx              # Login page      "id": 1234567890,

├── services/      "course": {

│   └── api.ts                 # Axios API client        "id": 1,

├── store/        "name": "Introduction to Programming",

│   ├── authStore.ts           # Zustand auth store        "prereqs": []

│   └── coursesStore.ts        # Zustand courses store      },

└── styles/      "term": {

    ├── GlobalStyles.ts        # Global styles        "id": 1,

    └── theme.ts               # Color theme        "name": "Spring 2024"

```      },

      "status": "enrolled"

## 🎨 Technologies Used    }

  ]

- **React 19** - UI Framework}

- **TypeScript** - Type Safety```

- **React Router DOM** - Navigation

- **Zustand** - State Management### POST `/api/students/{studentId}/courses/{courseId}/register`

- **Styled Components** - CSS-in-JS**Headers:**

- **Axios** - HTTP Client```

- **MSW (Mock Service Worker)** - API MockingAuthorization: Bearer {token}

- **React Scripts** - Build tooling```



## 🔍 View HTTP Requests**Request:**

```json

1. Open **Chrome DevTools** (F12){

2. Go to the **Network** tab  "termId": 1

3. Filter by `api/` to see only API requests}

4. You'll see real requests with:```

   - Request Headers (Authorization)

   - Request Payload**Response (201):**

   - Response Data```json

   - Status Codes{

   - Timing  "registration": {

    "id": 1234567890,

## 📱 Responsive Design    "course": {

      "id": 1,

The application is fully responsive and works on:      "name": "Introduction to Programming",

- 📱 Mobile (320px+)      "prereqs": []

- 📱 Tablet (768px+)    },

- 💻 Desktop (1024px+)    "term": {

- 🖥️ Wide (1280px+)      "id": 1,

      "name": "Spring 2024"

## 🎯 System Features    },

    "status": "enrolled"

### Prerequisites Validation  }

- Courses display their prerequisites}

- Visual indicators (✓/✗) for completed/missing prerequisites```

- Register button disabled if prerequisites are missing

**Error Response (400):**

### Registration States```json

- **Available**: Can register (prerequisites met){

- **Registered**: Already registered in the course  "error": "Prerequisites not met"

- **Locked**: Incomplete prerequisites}

```

### Animations

- Fade in for components## 🏗️ Estructura del Proyecto

- Float effect for elements

- Hover effects on cards```

- Shimmer effect for loading statessrc/

- Smooth transitions├── App.tsx                    # Configuración de rutas

├── index.tsx                  # Entry point + MSW setup

## 🛠️ Available Scripts├── styled.d.ts                # TypeScript declarations para styled-components

├── types/

```bash│   └── index.ts               # TypeScript types

npm start       # Run in development├── mocks/

npm build       # Build for production│   ├── browser.ts             # MSW worker setup

npm test        # Run tests│   ├── handlers.ts            # API mock handlers

```│   └── mockData.ts            # Datos de prueba

├── pages/

## 📄 License│   ├── Courses.tsx            # Página de cursos

│   └── Login.tsx              # Página de login

This is an educational demonstration project.├── services/

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

## 🛠️ Scripts Disponibles

```bash
npm start       # Ejecutar en desarrollo
npm build       # Build para producción
npm test        # Ejecutar tests
```

## 📄 Licencia

Este es un proyecto de demostración educativa.
