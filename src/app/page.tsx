import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center p-8">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl">Compass</CardTitle>
					<CardDescription>
						Work-in-progress development preview
					</CardDescription>
				</CardHeader>
				<CardContent className="flex justify-center">
					<Button asChild>
						<Link href="/dashboard">Explore Dashboard</Link>
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
