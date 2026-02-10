import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  // Public routes (no layout - landing, login, signup)
  index("routes/LandingPage.tsx"),
  route("login", "routes/LoginPage.tsx"),
  route("signup", "routes/SignupPage.tsx"),
  
  // Protected routes (with dashboard layout)
  layout("components/AppLayout.tsx", [
    route("dashboard", "routes/home.tsx"),
    route("workouts", "routes/workouts.tsx"),
    route("nutrition", "routes/nutrition.tsx"),
    route("goals", "routes/goals.tsx"),
    route("progress", "routes/progress.tsx"),
    route("profile", "routes/profile.tsx"),
    route("settings", "routes/settings.tsx"),
  ]),
] satisfies RouteConfig;
