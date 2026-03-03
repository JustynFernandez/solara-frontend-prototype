import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';

import { mockUser as defaultMockUser } from '../data/mockData';

const DEFAULT_ROLE = 'Helper';
const DEFAULT_ROLES = [DEFAULT_ROLE];
const AUTH_ERROR_MESSAGE = 'Please sign in to update your profile.';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role?: string;
  roles?: string[];
  location?: string;
  bio?: string;
  skills?: string[];
  photo?: string;
}

interface AuthCredentials {
  email?: string;
}

interface AuthProfile extends Partial<AuthUser> {
  [key: string]: unknown;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  error: string | null;
  login: (credentials?: AuthCredentials) => void;
  register: (profile?: AuthProfile) => void;
  logout: () => void;
  updateProfile: (updates?: AuthProfile) => void;
  clearError: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const DEFAULT_USER: AuthUser = {
  ...defaultMockUser,
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Normalize user-provided text to reduce stored markup.
 */
const sanitizeText = (value: string): string =>
  value.replace(/[<>]/g, '').trim();

/**
 * Sanitize user inputs while preserving non-string data.
 */
// Optimized for readability: extracted to a pure sanitizer for reuse.
const sanitizeProfile = <T extends AuthProfile>(input: T): T => {
  const entries = Object.entries(input).map(([key, value]) => {
    if (typeof value === 'string') {
      return [key, sanitizeText(value)];
    }

    if (Array.isArray(value)) {
      const sanitizedList = value.map((entry) =>
        typeof entry === 'string' ? sanitizeText(entry) : entry,
      );

      return [key, sanitizedList];
    }

    return [key, value];
  });

  return Object.fromEntries(entries) as T;
};

/**
 * Ensure roles are normalized to a non-empty list.
 */
const normalizeRoles = (
  roles: string[] | undefined,
  role: string | undefined,
): string[] => {
  const cleanedRoles = Array.isArray(roles)
    ? roles.map((entry) => sanitizeText(entry)).filter(Boolean)
    : [];

  if (cleanedRoles.length > 0) {
    return cleanedRoles;
  }

  if (role) {
    return [sanitizeText(role)].filter(Boolean);
  }

  return [...DEFAULT_ROLES];
};

/**
 * Build a user payload from provided credentials.
 */
const buildUserFromCredentials = (
  credentials: AuthCredentials | undefined,
): AuthUser => {
  const email = credentials?.email
    ? sanitizeText(credentials.email) || DEFAULT_USER.email
    : DEFAULT_USER.email;

  return {
    ...DEFAULT_USER,
    email,
  };
};

/**
 * Build a user payload from registration profile data.
 */
const buildUserFromProfile = (profile: AuthProfile): AuthUser => {
  const sanitizedProfile = sanitizeProfile(profile);
  const roles = normalizeRoles(
    sanitizedProfile.roles,
    sanitizedProfile.role,
  );

  return {
    ...DEFAULT_USER,
    ...sanitizedProfile,
    roles,
  };
};

/**
 * Provides authentication state and actions across the app.
 * @param {AuthProviderProps} props - React children to wrap.
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const login = useCallback(
    (credentials?: AuthCredentials) => {
      const hydratedUser = buildUserFromCredentials(credentials);
      setUser(hydratedUser);
      clearError();
    },
    [clearError],
  );

  const register = useCallback(
    (profile: AuthProfile = {}) => {
      const hydratedUser = buildUserFromProfile(profile);
      setUser(hydratedUser);
      clearError();
    },
    [clearError],
  );

  const updateProfile = useCallback(
    (updates: AuthProfile = {}) => {
      if (!user) {
        setError(AUTH_ERROR_MESSAGE);
        return;
      }

      clearError();
      const sanitizedUpdates = sanitizeProfile(updates);

      setUser((current) =>
        current
          ? {
              ...current,
              ...sanitizedUpdates,
            }
          : current,
      );
    },
    [clearError, user],
  );

  const logout = useCallback(() => {
    setUser(null);
    clearError();
  }, [clearError]);

  // Optimized for stability: memoize the context value to limit re-renders.
  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      error,
      login,
      register,
      logout,
      updateProfile,
      clearError,
    }),
    [user, error, login, register, logout, updateProfile, clearError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Access the auth context with runtime safety.
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
};
