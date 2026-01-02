'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function Navbar() {
    return (
        <nav className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-700">
                    <div className="bg-indigo-700 p-1 rounded-lg">
                        <Sparkles className="text-white h-5 w-5 fill-current" />
                    </div>
                    Creata
                </Link>

                <SignedOut>
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                        <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
                        <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <Button className="bg-indigo-700 hover:bg-indigo-600">Get Started</Button>
                        </Link>
                    </div>
                </SignedOut>
                <SignedIn>
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                        <Link href="/dashboard" className="hover:text-primary transition-colors">Projects</Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-4">
                        <Link href="/upgrade">
                            <Button className="bg-indigo-700 hover:bg-indigo-600">Upgrade</Button>
                        </Link>

                        <UserButton />
                    </div>

                </SignedIn>
            </div>
        </nav>
    );
}
