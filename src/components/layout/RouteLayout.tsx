import type { ReactNode } from "react";
import ProtectedRoute from "@/routing/ProtectedRoute.tsx";
import type { EUserType } from "@/types/user.ts";

interface Props {
  isPrivate: boolean;
  children: ReactNode;
  userAllowedType?: EUserType;
}

const RouteLayout = ({ isPrivate, userAllowedType, children  }: Props) => {
  if (!isPrivate) {
    return children;
  }

  return (
    <ProtectedRoute userAllowedType={userAllowedType}>
      {children}
    </ProtectedRoute>
  );
};

export default RouteLayout;