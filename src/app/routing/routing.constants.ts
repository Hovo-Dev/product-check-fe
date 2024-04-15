import LoginPage from "@/pages/LoginPage.tsx";
import EmployeePage from "@/pages/EmployeePage.tsx";
import AdminPage from "@/pages/AdminPage.tsx";
import { EUserType } from "@/types/user.ts";

export enum RoutePaths {
    Login = "/login",
    Admin = '/admin',
    Employee = '/employee'
}

export const routerElements = [
    {
        path: RoutePaths.Login,
        Element: LoginPage,
        isPrivate: false
    },
    {
        path: RoutePaths.Employee,
        Element: EmployeePage,
        isPrivate: true,
        userAllowedType: EUserType.Employee
    },
    {
        path: RoutePaths.Admin,
        Element: AdminPage,
        isPrivate: true,
        userAllowedType: EUserType.Admin
    },
];
