import type { Route } from "./+types/workouts";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Workouts - AdaptFitness" },
  ];
}

export default function Workouts() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Workouts</h1>
      <p className="text-gray-600 dark:text-gray-400">Workout tracking coming soon...</p>
    </div>
  );
}