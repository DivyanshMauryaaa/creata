import Link from "next/link";
import { Sparkles, Twitter, Github, Linkedin, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-muted/30 border-t">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 font-bold text-xl text-indigo-700">
                            <div className="bg-indigo-700 p-1 rounded-lg">
                                <Sparkles className="text-white h-5 w-5 fill-current" />
                            </div>
                            Creata
                        </div>
                        <p className="text-muted-foreground text-sm max-w-xs">
                            The perfect tool for founders to automate their content creation and build their personal brand on autopilot.
                        </p>
                    </div>

                    {/* Product Column */}
                    <div>
                        <h3 className="font-semibold mb-4 text-foreground">Product</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-indigo-700 transition-colors">Features</Link></li>
                            <li><Link href="#" className="hover:text-indigo-700 transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-indigo-700 transition-colors">Integration</Link></li>
                            <li><Link href="#" className="hover:text-indigo-700 transition-colors">Roadmap</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="font-semibold mb-4 text-foreground">Company</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-indigo-700 transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-indigo-700 transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-indigo-700 transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-indigo-700 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-indigo-700 transition-colors">Community</Link></li>
                            <li><Link href="#" className="hover:text-indigo-700 transition-colors">Helpy Center</Link></li>
                            <li><Link href="#" className="hover:text-indigo-700 transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-indigo-700 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} Creata AI Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <Link href="#" className="hover:text-indigo-700 transition-colors"><Twitter size={20} /></Link>
                        <Link href="#" className="hover:text-indigo-700 transition-colors"><Github size={20} /></Link>
                        <Link href="#" className="hover:text-indigo-700 transition-colors"><Linkedin size={20} /></Link>
                        <Link href="#" className="hover:text-indigo-700 transition-colors"><Instagram size={20} /></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
