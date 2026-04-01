# Reactreasure 🎣

## Getting Started

### Installation

Install the package via npm or yarn:

```bash
npm install hooked-up-react
# or
yarn add hooked-up-react
```

### Usage

Import the hooks you need directly into your React components:

```javascript
import { useFetch, useToggle, useDialog } from 'hooked-up-react';
```

### reactreasure API Rules

#### Hook names should be prefixed with `use`

✅

`useCounter`

⛔️

`counter`

#### Hook arguments and return value MUST be either a single value or an object

✅

```javascript
function useMyState(initialState) {
  const [state, setState] = useState(initialState);
  return { state, setState };
}
```

⛔️

```javascript
function useMyState(initialState) {
  const [state, setState] = useState(initialState);
  return [state, setState];
}
```

> 🧙‍♂️ Being strict and opinionated about our hooks argument and return value creates a predictable API. This also makes typing and testing easier.

## Documentation

### useFetch

**Description** Fetches data from a specified URL and manages loading and error states.

**Example**

```javascript
const { data, loading, error, abort } = useFetch(
  'https://api.example.com/data'
);
```

**Parameters**

`url`: string: The URL to fetch data from.
`options`: object (optional): Configuration options for the fetch request (e.g., method, headers).

**Returns**:

```typescript
{
  data: T | null; // The fetched data or null if not yet available
  error: string | null; // Error message if the fetch fails, otherwise null
  loading: boolean; // A boolean indicating if the fetch is in progress
  abort: () => void; // A function to cancel the fetch request
}
```

### useToggle

**Description** Manages a boolean state, providing functions to toggle, set to true, or set to false.

**Example**

```javascript
const [value, toggle, setTrue, setFalse] = useToggle(false);
```

**Parameters**

`initialValue`: boolean (optional): The initial boolean value (defaults to `false`).

**Returns**:

```typescript
[
  boolean, // The current boolean value
  () => void, // Toggle the value
  () => void, // Set the value to true
  () => void  // Set the value to false
]
```
