import type { Route } from "./+types/nutrition";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nutrition - AdaptFitness" },
  ];
}

export default function Nutrition() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Nutrition</h1>
      <p className="text-gray-600 dark:text-gray-400">Nutrition tracking coming soon...</p>
    </div>
  );
}