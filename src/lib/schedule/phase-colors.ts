import type { ConstructionPhase } from "./types"

export const phaseColors: Record<ConstructionPhase, {
  bg: string
  text: string
  badge: string
}> = {
  preconstruction: {
    bg: "bg-slate-100 dark:bg-slate-900",
    text: "text-slate-700 dark:text-slate-300",
    badge: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  },
  sitework: {
    bg: "bg-amber-50 dark:bg-amber-950",
    text: "text-amber-700 dark:text-amber-300",
    badge: "bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  },
  foundation: {
    bg: "bg-blue-50 dark:bg-blue-950",
    text: "text-blue-700 dark:text-blue-300",
    badge: "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  framing: {
    bg: "bg-orange-50 dark:bg-orange-950",
    text: "text-orange-700 dark:text-orange-300",
    badge: "bg-orange-200 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  },
  roofing: {
    bg: "bg-stone-50 dark:bg-stone-950",
    text: "text-stone-700 dark:text-stone-300",
    badge: "bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300",
  },
  electrical: {
    bg: "bg-yellow-50 dark:bg-yellow-950",
    text: "text-yellow-700 dark:text-yellow-300",
    badge: "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
  plumbing: {
    bg: "bg-green-50 dark:bg-green-950",
    text: "text-green-700 dark:text-green-300",
    badge: "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  hvac: {
    bg: "bg-purple-50 dark:bg-purple-950",
    text: "text-purple-700 dark:text-purple-300",
    badge: "bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  },
  insulation: {
    bg: "bg-rose-50 dark:bg-rose-950",
    text: "text-rose-700 dark:text-rose-300",
    badge: "bg-rose-200 text-rose-700 dark:bg-rose-800 dark:text-rose-300",
  },
  drywall: {
    bg: "bg-zinc-50 dark:bg-zinc-950",
    text: "text-zinc-700 dark:text-zinc-300",
    badge: "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  },
  finish: {
    bg: "bg-pink-50 dark:bg-pink-950",
    text: "text-pink-700 dark:text-pink-300",
    badge: "bg-pink-200 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  },
  landscaping: {
    bg: "bg-emerald-50 dark:bg-emerald-950",
    text: "text-emerald-700 dark:text-emerald-300",
    badge: "bg-emerald-200 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  },
  closeout: {
    bg: "bg-indigo-50 dark:bg-indigo-950",
    text: "text-indigo-700 dark:text-indigo-300",
    badge: "bg-indigo-200 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  },
}

export function getPhaseColor(phase: string) {
  return phaseColors[phase as ConstructionPhase] ?? phaseColors.preconstruction
}
