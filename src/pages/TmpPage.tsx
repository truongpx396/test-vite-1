import React, { useState, useEffect, useReducer } from 'react';
import styles from './TSPage.module.css';

// Enum for user roles
enum UserRole {
  Admin = 'Admin',
  User = 'User',
  Guest = 'Guest',
}

// Interface for base user data
interface User {
  id: number;
  name: string;
  email?: string; // Optional property example
  role: UserRole;
}

// AdminUser type using intersection to add permissions to User
type AdminUser = User & { permissions: string[] };
// Above code equivalent to following
// interface AdminUser extends User {
//     permissions: string[]; // Specific to AdminUser
// }

// Union type for users with different possible structures
type UserType = User | AdminUser;

// Type Guard to check if a user is an AdminUser
const isAdminUser = (user: UserType): user is AdminUser => {
  return (user as AdminUser).permissions !== undefined;
};

// Type alias for a list of users
type UserList = User[];

// Utility types examples
type UserWithoutEmail = Omit<User, 'email'>; // Omits the email property
type UserContactInfo = Pick<User, 'id' | 'name'>; // Picks only the id and name properties
type PartialUser = Partial<User>; // Makes all properties of User optional

// Generic function to fetch data, using generics for flexible return types with overloads and default parameter
async function fetchData<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

// Action type for useReducer with different payloads
type UserAction =
  | { type: 'add'; payload: User }
  | { type: 'remove'; id: number }
  | { type: 'update'; payload: { id: number; updates: PartialUser } };

// Reducer function for managing a list of users, demonstrating typed reducer usage
const userReducer = (state: User[], action: UserAction): User[] => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'remove':
      return state.filter(user => user.id !== action.id);
    case 'update':
      return state.map(user =>
        user.id === action.payload.id ? { ...user, ...action.payload.updates } : user
      );
    default:
      return state;
  }
};

const TmpPage: React.FC = () => {
  const [users, dispatch] = useReducer(userReducer, []); // Using useReducer for state management
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState<{ name: string; email: string; role: UserRole }>({
    name: '',
    email: '',
    role: UserRole.Guest,
  });
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    fetchData<UserList>('https://jsonplaceholder.typicode.com/users')
      .then(data => {
        // Simulate user roles and create AdminUser type users
        const usersWithRoles: UserType[] = data.map((user, index) =>
          index % 2 === 0
            ? { ...user, role: UserRole.User }
            : { ...user, role: UserRole.Admin, permissions: ['read', 'write'] }
        );
        usersWithRoles.forEach(user => dispatch({ type: 'add', payload: user })); // Adding users to the reducer
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  // Example of Partial: updating only a subset of user properties
  const updateUser = (id: number, updates: PartialUser) => {
    dispatch({
      type: 'update',
      payload: { id, updates },
    });
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      setValidationError('Name and email are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      setValidationError('Please enter a valid email.');
      return;
    }

    const newUserId = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
    const userToAdd: User = {
      id: newUserId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    dispatch({ type: 'add', payload: userToAdd });
    setNewUser({ name: '', email: '', role: UserRole.Guest });
    setValidationError(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TypeScript Features Page</h1>
      {/* Demonstrate Omit utility */}
      <div>
        <h2 className={styles.subtitle}>Omit User Example</h2>
        {/* Example: Email omitted from user */}
        <code>{JSON.stringify({ id: 1, name: "User without email", role: UserRole.User } as UserWithoutEmail)}</code>
      </div>
      <div className={styles.addUserForm}>
        <h2 className={styles.subtitle}>Add New User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className={styles.input}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserRole })}
          className={styles.select}
        >
          <option value={UserRole.Guest}>Guest</option>
          <option value={UserRole.User}>User</option>
          <option value={UserRole.Admin}>Admin</option>
        </select>
        <button onClick={handleAddUser} className={styles.button}>
          Add User
        </button>
        {validationError && <div className={styles.error}>{validationError}</div>}
      </div>
      <ul className={styles.userList}>
        {users.map(user => (
          <li key={user.id} className={styles.userItem}>
            {user.name} ({user.email ?? 'N/A'}) - Role: {user.role}
            {isAdminUser(user) && (
              <div className={styles.permissions}>Permissions: {user.permissions.join(', ')}</div>
            )}
            {/* Example using Pick to show only selected properties */}
            <div>
              <strong>User Preview:</strong>{' '}
              {JSON.stringify({ id: user.id, name: user.name } as UserContactInfo)}
            </div>
            {/* Update user role using Partial example */}
            <button onClick={() => updateUser(user.id, { role: UserRole.Guest })}  className={`${styles.button} ${styles.changeRoleButton}`}>
              Change Role to Guest
            </button>
            <button onClick={() => dispatch({ type: 'remove', id: user.id })} className={`${styles.button} ${styles.removeUserButton}`}>
              Remove User
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TmpPage;
