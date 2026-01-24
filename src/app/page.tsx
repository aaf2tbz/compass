import Link from "next/link";
import { IconArrowRight, IconBrandGithub } from "@tabler/icons-react";

export default function Home() {
	return (
		<div className="relative flex min-h-screen flex-col overflow-hidden bg-[#050505] text-[#EAE7DC]">
			<nav className="relative z-10 flex items-center justify-between px-[4vw] py-6">
				<div className="flex items-center gap-2">
					<span
						className="size-6 shrink-0 bg-[#009869]"
						style={{
							maskImage: "url(/logo-black.png)",
							maskSize: "contain",
							maskRepeat: "no-repeat",
							WebkitMaskImage: "url(/logo-black.png)",
							WebkitMaskSize: "contain",
							WebkitMaskRepeat: "no-repeat",
						}}
					/>
					<span className="text-sm font-semibold uppercase tracking-[0.2em]">
						Compass
					</span>
				</div>
				<Link
					href="/dashboard"
					className="text-xs uppercase tracking-[0.2em] opacity-60 transition-opacity hover:opacity-100"
				>
					Sign In
				</Link>
			</nav>

			<main className="relative z-10 flex flex-1 flex-col justify-center px-[4vw]">
				<div className="max-w-4xl">
					<p className="mb-6 text-xs uppercase tracking-[0.2em] text-[#009869]">
						Construction Project Management
					</p>
					<h1 className="text-[12vw] font-bold uppercase leading-[0.85] tracking-tighter md:text-[8vw]">
						Build With
						<br />
						<span className="font-serif italic text-[#009869]">
							Clarity
						</span>
					</h1>
					<p className="mt-8 max-w-md text-base leading-relaxed opacity-60 md:text-lg">
						Project scheduling, file management, and team coordination
						&mdash; purpose-built for construction professionals.
					</p>
					<div className="mt-10 flex flex-wrap items-center gap-6">
						<Link
							href="/dashboard"
							className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] transition-colors hover:text-[#009869]"
						>
							<span>Enter Dashboard</span>
							<IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
						</Link>
						<a
							href="https://github.com/High-Performance-Structures/compass"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 text-sm opacity-60 transition-opacity hover:opacity-100"
						>
							<IconBrandGithub className="size-4" />
							<span>View on GitHub</span>
						</a>
					</div>
				</div>
			</main>

			<footer className="relative z-10 flex items-center justify-between border-t border-white/10 px-[4vw] py-6">
				<span className="text-xs uppercase tracking-widest opacity-40">
					&copy; 2025 High Performance Structures
				</span>
				<span className="text-xs uppercase tracking-widest opacity-40">
					Open Source (MIT)
				</span>
			</footer>

			<div className="pointer-events-none absolute top-0 right-0 h-full w-[60vw] opacity-[0.07]">
				<div className="h-full w-full bg-gradient-to-l from-[#009869] to-transparent" />
			</div>
		</div>
	);
}
