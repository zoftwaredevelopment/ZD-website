import { audiowide } from "@/app/fonts";
import { CyberGrid } from "@/components/cyber-grid";
import { NeonButton } from "@/components/neon-button";
import Link from "next/link";

export default function TermsPage() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#0a0a12] text-white">
            <CyberGrid />
            <main className="relative z-10 flex-grow container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1
                            className={`${audiowide.className} text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white`}
                        >
                            Terms of{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3ecef7] to-[#7deb7d]">
                                Service
                            </span>
                        </h1>
                        <p className="mt-4 text-gray-400 md:text-lg">
                            Last Updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>

                    <div className="space-y-8 text-gray-300">
                        <section>
                            <h2 className={`${audiowide.className} text-2xl font-bold text-cyan-400 mb-4`}>1. Overview</h2>
                            <p>
                                All services, pricing, and timelines provided by Zoftware Development are subject to be updated as necessary. Please consult with us directly for the most current information before commencing any project. These terms govern your use of our website and the services we offer.
                            </p>
                        </section>

                        <section>
                            <h2 className={`${audiowide.className} text-2xl font-bold text-cyan-400 mb-4`}>2. Use of Our Services</h2>
                            <p>
                                You agree to use our services for lawful purposes only and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
                            </p>
                        </section>

                        <section>
                            <h2 className={`${audiowide.className} text-2xl font-bold text-cyan-400 mb-4`}>3. Intellectual Property</h2>
                            <p>
                                All content included on this site, such as text, graphics, logos, and software, is the property of Zoftware Development or its content suppliers and protected by international copyright laws.
                            </p>
                        </section>

                        <section>
                            <h2 className={`${audiowide.className} text-2xl font-bold text-cyan-400 mb-4`}>4. Limitation of Liability</h2>
                            <p>
                                Zoftware Development will not be liable for any damages of any kind arising from the use of this site or from any information, content, or services included on or otherwise made available to you through this site.
                            </p>
                        </section>
                    </div>

                    <div className="mt-16 text-center">
                        <Link href="/#">
                            <NeonButton color="cyan" variant="outline">
                                Back to Home
                            </NeonButton>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
} 