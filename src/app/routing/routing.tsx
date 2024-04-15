import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import RouteLayout from "@/layout/RouteLayout.tsx";
import { RoutePaths, routerElements } from "./routing.constants.ts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {routerElements.map(({ Element, path, isPrivate, userAllowedType }) => (
        <Route
          key={path}
          path={path}
          element={
            <RouteLayout userAllowedType={userAllowedType} isPrivate={isPrivate}>
              <Element />
            </RouteLayout>}
        />
      ))}
      <Route path={"*"} element={<Navigate to={RoutePaths.Login} />} />
    </>,
  ),
);

const Routing = () => {
  return <RouterProvider router={router} />;
};

export default Routing;
