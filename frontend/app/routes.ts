import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/LandingPage.tsx"),
    route("login", "routes/LoginPage.tsx"),
    route("signup", "routes/SignupPage.tsx"),
] satisfies RouteConfig;
