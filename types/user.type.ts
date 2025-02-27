// User model
interface User {
  PK: string; // USER#{userId}
  SK: string; // METADATA
  userId: string;
  username: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'manager' | 'cashier' | 'kitchen';
  firstName: string;
  lastName: string;
  phone?: string;
  active: boolean;
  createdAt: string; // ISO date
  lastLogin?: string; // ISO date
}

// Role permissions model
interface RolePermission {
  PK: string; // ROLE#{roleId}
  SK: string; // METADATA
  roleId: string;
  name: string;
  permissions: string[];
  description?: string;
}
