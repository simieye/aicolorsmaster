// @ts-ignore;
import React from 'react';

// @ts-ignore;
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// @ts-ignore;
import '@testing-library/jest-dom';
// @ts-ignore;
import { AuthProvider, useAuth } from '@/components/AuthProvider';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Test component to use auth context
const TestComponent = () => {
  const {
    user,
    login,
    logout,
    isAuthenticated
  } = useAuth();
  return <div>
      <div data-testid="auth-status">
        {isAuthenticated ? 'authenticated' : 'not authenticated'}
      </div>
      {user && <div data-testid="user-name">{user.name}</div>}
      <button onClick={() => login({
      name: 'Test User',
      userId: '123'
    })}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>;
};
describe('AuthProvider', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });
  it('provides default auth context', () => {
    render(<AuthProvider>
        <TestComponent />
      </AuthProvider>);
    expect(screen.getByTestId('auth-status')).toHaveTextContent('not authenticated');
  });
  it('logs in user successfully', async () => {
    render(<AuthProvider>
        <TestComponent />
      </AuthProvider>);
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
      expect(screen.getByTestId('user-name')).toHaveTextContent('Test User');
    });
    expect(localStorageMock.setItem).toHaveBeenCalledWith('authUser', JSON.stringify({
      name: 'Test User',
      userId: '123'
    }));
  });
  it('logs out user successfully', async () => {
    render(<AuthProvider>
        <TestComponent />
      </AuthProvider>);

    // First login
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
    });

    // Then logout
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('not authenticated');
    });
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('authUser');
  });
  it('restores user from localStorage on mount', () => {
    const mockUser = {
      name: 'Stored User',
      userId: '456'
    };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));
    render(<AuthProvider>
        <TestComponent />
      </AuthProvider>);
    expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
    expect(screen.getByTestId('user-name')).toHaveTextContent('Stored User');
  });
  it('handles invalid localStorage data gracefully', () => {
    localStorageMock.getItem.mockReturnValue('invalid json');
    render(<AuthProvider>
        <TestComponent />
      </AuthProvider>);
    expect(screen.getByTestId('auth-status')).toHaveTextContent('not authenticated');
  });
  it('throws error when useAuth is used outside provider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation();
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAuth must be used within an AuthProvider');
    consoleError.mockRestore();
  });
  it('updates user data correctly', async () => {
    render(<AuthProvider>
        <TestComponent />
      </AuthProvider>);

    // Login with initial user
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    await waitFor(() => {
      expect(screen.getByTestId('user-name')).toHaveTextContent('Test User');
    });

    // Update user data
    const {
      login
    } = screen.getByTestId('auth-status').getContext();
    login({
      name: 'Updated User',
      userId: '789'
    });
    await waitFor(() => {
      expect(screen.getByTestId('user-name')).toHaveTextContent('Updated User');
    });
  });
  it('handles login with empty user data', async () => {
    render(<AuthProvider>
        <TestComponent />
      </AuthProvider>);
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);

    // Should not authenticate with empty user data
    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('not authenticated');
    });
  });
});