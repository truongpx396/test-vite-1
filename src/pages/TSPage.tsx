import React, { useState, useEffect } from 'react';

// Enum for user roles
enum UserRole {
  Admin = 'Admin',
  User = 'User',
  Guest = 'Guest',
}

// Interface for user data
interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

// Generic function to fetch data
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

const TSPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData<User[]>('https://jsonplaceholder.typicode.com/users')
      .then(data => {
        // Simulate user roles
        const usersWithRoles = data.map(user => ({
          ...user,
          role: UserRole.User,
        }));
        setUsers(usersWithRoles);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>TypeScript Features Page</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email}) - Role: {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TSPage;