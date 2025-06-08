import { useEffect, useCallback } from "react";
import { useAccessUpdate, useUserUpdate } from "../../features/Auth/api/Auth";
import { useAuthStore } from "../Store/authStore";

const Authorization = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, logout } = useAuthStore();
    const { mutateAsync: refresh } = useAccessUpdate();
    const { mutateAsync: me } = useUserUpdate();

    const checkAndUpdateUser = useCallback(async () => {
        const acc = localStorage.getItem('access');
        const ref = localStorage.getItem('refresh');
        if (!acc || !ref) return;
        try {
            await me();
        } catch (error) {
            console.error("User fetch failed:", error);
            try {
                await refresh();
                await me();
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                logout();
            }
        }
    }, [me, refresh, logout]);

    useEffect(() => {
        checkAndUpdateUser();
    }, [checkAndUpdateUser]);

    useEffect(() => {
        if (!isAuthenticated) return;

        const intervalId = setInterval(() => {
            refresh().catch(error => {
                console.error("Periodic refresh failed:", error);
                logout();
            });
        }, 15 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, [isAuthenticated, refresh, logout]);

    return <>{children}</>;
};
export default Authorization;