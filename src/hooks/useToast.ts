import { useState, useCallback } from "react";

export const useToast = () => {
    const [toast, setToast] = useState<{ text: string; type: "success" | "error" | "" }>({
        text: "",
        type: "",
    });

    const showToast = useCallback((text: string, type: "success" | "error") => {
        setToast({ text, type });
    }, []);

    const hideToast = useCallback(() => {
        setToast({ text: "", type: "" });
    }, []);

    return { toast, showToast, hideToast };
};
