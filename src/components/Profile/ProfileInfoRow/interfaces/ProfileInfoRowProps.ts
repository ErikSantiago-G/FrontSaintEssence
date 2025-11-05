import { ReactNode } from "react";

export interface ProfileInfoRowProps {
    icon: ReactNode;
    label: string;
    value: ReactNode;
    last?: boolean;
}