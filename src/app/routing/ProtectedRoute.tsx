import type { ReactNode } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import useFetchUser from "@/api/fetchUser.ts";
import type { EUserType } from "@/types/user.ts";
import { RoutePaths } from "@/routing/routing.constants.ts";
import showNotifications, { ToastVersions } from "@/services/toast/showNotifications.tsx";

interface Props {
  children: ReactNode;
  userAllowedType?: EUserType;
}

const ProtectedRoute = ({ children, userAllowedType }: Props) => {
  const { data, isLoading, error, executeFn } = useFetchUser();

  useEffect(() => {
    executeFn();
  }, []);

  if (data && data?.result.type !== userAllowedType) {
    showNotifications({
      type: ToastVersions.error,
      title: "Permissions: ",
      description: `only ${userAllowedType} role allowed`,
    });

    return <Navigate to={RoutePaths.Login} replace />;
  }

  if (!isLoading && error) {
    return <Navigate to={RoutePaths.Login} replace />;
  }

  return children;
};

export default ProtectedRoute;