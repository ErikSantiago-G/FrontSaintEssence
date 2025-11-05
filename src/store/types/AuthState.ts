import { User } from "../../api/types/auth";

export interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: () => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}