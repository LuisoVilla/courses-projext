# Testing Documentation

This project includes comprehensive unit tests and integration tests for the Course Registration System.

## Test Structure

```
src/
├── __tests__/
│   └── integration.test.tsx       # End-to-end integration tests
├── pages/
│   └── __tests__/
│       ├── Login.test.tsx          # Login component tests
│       └── Courses.test.tsx        # Courses component tests
└── store/
    └── __tests__/
        ├── authStore.test.ts       # Auth store unit tests
        └── coursesStore.test.ts    # Courses store unit tests
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm test -- --watch
```

### Run tests with coverage
```bash
npm test -- --coverage
```

### Run specific test file
```bash
npm test -- Login.test
```

## Test Coverage

### Unit Tests

#### AuthStore Tests (`authStore.test.ts`)
- ✅ Initial state validation
- ✅ Login functionality
- ✅ Token persistence in localStorage
- ✅ Authentication status
- ✅ Logout functionality
- ✅ Invalid credentials handling

#### CoursesStore Tests (`coursesStore.test.ts`)
- ✅ Initial state validation
- ✅ Loading courses and registrations
- ✅ Registration status checking
- ✅ Prerequisite validation
- ✅ Course name lookup
- ✅ Course registration
- ✅ Store reset functionality

### Component Tests

#### Login Component Tests (`Login.test.tsx`)
- ✅ Renders login form correctly
- ✅ Displays demo credentials
- ✅ Validates empty username
- ✅ Validates empty password
- ✅ Successful login flow
- ✅ Invalid credentials error handling
- ✅ Loading state during login

#### Courses Component Tests (`Courses.test.tsx`)
- ✅ Renders header with user info
- ✅ Displays loading skeletons
- ✅ Loads and displays courses
- ✅ Shows prerequisites for courses
- ✅ Displays register buttons
- ✅ Shows registered status
- ✅ Disables button for incomplete prerequisites
- ✅ Handles course registration
- ✅ Logout functionality
- ✅ Empty state handling
- ✅ Displays current term

### Integration Tests

#### Full User Flow (`integration.test.tsx`)
- ✅ Complete registration flow (login → view courses → register → logout)
- ✅ Protected route access prevention
- ✅ Authentication persistence across reloads
- ✅ Different course availability based on prerequisites
- ✅ Login error handling

## Test Utilities

### Render Helpers
Tests use custom render helpers that wrap components with necessary providers:
- `BrowserRouter` for routing
- `ThemeProvider` for styled-components

### Mocking
- **MSW (Mock Service Worker)**: Intercepts API calls for realistic testing
- **React Router**: Mocked `useNavigate` for navigation testing
- **LocalStorage**: Cleared between tests for isolation

## Best Practices

1. **Test Isolation**: Each test resets store state and clears localStorage
2. **Async Handling**: Uses `waitFor` for async operations
3. **User Simulation**: Uses `@testing-library/user-event` for realistic interactions
4. **Accessibility**: Uses semantic queries (`getByRole`, `getByLabelText`)
5. **MSW Integration**: Real HTTP requests are mocked with MSW for integration tests

## Example Test Output

```bash
PASS  src/store/__tests__/authStore.test.ts
PASS  src/store/__tests__/coursesStore.test.ts
PASS  src/pages/__tests__/Login.test.tsx
PASS  src/pages/__tests__/Courses.test.tsx
PASS  src/__tests__/integration.test.tsx

Test Suites: 5 passed, 5 total
Tests:       35 passed, 35 total
Snapshots:   0 total
Time:        5.234 s
```

## Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

## Writing New Tests

### Unit Test Example
```typescript
import { useAuthStore } from '../authStore';

describe('New Feature', () => {
  beforeEach(() => {
    // Setup
  });

  it('should do something', () => {
    // Arrange
    const { someFunction } = useAuthStore.getState();
    
    // Act
    const result = someFunction();
    
    // Assert
    expect(result).toBe(expected);
  });
});
```

### Component Test Example
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('should handle user interaction', async () => {
  const user = userEvent.setup();
  render(<Component />);
  
  const button = screen.getByRole('button');
  await user.click(button);
  
  expect(screen.getByText(/success/i)).toBeInTheDocument();
});
```

## Debugging Tests

### Run specific test with detailed output
```bash
npm test -- --verbose Login.test
```

### Debug in VS Code
Add to `.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand"],
  "console": "integratedTerminal"
}
```

## Continuous Integration

Tests run automatically on:
- Pre-commit hooks (optional)
- Pull requests
- Main branch pushes

Configure in CI/CD pipeline:
```yaml
- name: Run tests
  run: npm test -- --coverage --watchAll=false
```
