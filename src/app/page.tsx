import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center p-8">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl">Dashboard App Template</CardTitle>
					<CardDescription>
						A Next.js starter with shadcn/ui components and Cloudflare deployment
					</CardDescription>
				</CardHeader>
				<CardContent className="flex justify-center">
					<Button asChild>
						<Link href="/dashboard">Go to Dashboard</Link>
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
