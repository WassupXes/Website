import { Beef, Milk, Users, Landmark, Banknote, Factory, Rabbit } from "lucide-react";
import type { UseCase } from "@/lib/content/usecases";

const map = { beef: Beef, milk: Milk, users: Users, goat: Rabbit, landmark: Landmark, banknote: Banknote, factory: Factory };

export function UseCaseIcon({ name, className }: { name: UseCase["icon"]; className?: string }) {
  const Icon = map[name];
  return <Icon className={className} />;
}
