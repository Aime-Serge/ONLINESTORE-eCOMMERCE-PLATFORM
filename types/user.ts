export interface User {
  id: string;              // Unique user identifier
  name: string;            // Full name
  email: string;           // Email address
  role: 'customer' | 'admin'; // Role in the platform
  createdAt: string;       // ISO timestamp when account was created
  updatedAt?: string;      // Optional ISO timestamp of last profile update
  avatarUrl?: string;      // Optional profile picture URL
  phoneNumber?: string;    // Optional contact number
  address?: string;        // Optional default shipping address
}

// This type is useful for signup forms where password is needed
export interface UserCredentials {
  email: string;
  password: string;
}

// For API auth responses
export interface AuthResponse {
  user: User;
  token: string; // JWT or access token
}
