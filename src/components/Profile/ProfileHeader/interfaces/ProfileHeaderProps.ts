import { User } from "../../../../api/types/auth";

export interface ProfileHeaderProps {
  user: User;
  onLogout: () => void;
}