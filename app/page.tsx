"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { ShoppingBag, Rocket, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { ParticlesContainer } from "@/components/particles-container";
import { TypingEffect } from "@/components/typing-effect";
import { NeonButton } from "@/components/neon-button";
import { CyberCard } from "@/components/cyber-card";
import { HolographicHero } from "@/components/holographic-hero";
import { CyberGrid } from "@/components/cyber-grid";
import { useInView } from "react-intersection-observer";

import { CyberCalendar } from "@/components/ui/cyber-calendar";
import { audiowide } from "@/app/fonts";
import { ContactForm } from "@/components/contact-form";

export default function Home() {

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [projectsRef, projectsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [pricingRef, pricingInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculateMouseAngle = () => {
    if (!heroRef.current) return { x: 0, y: 0 };

    const rect = heroRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate the angle between mouse and center
    const dx = mousePosition.x - centerX;
    const dy = mousePosition.y - centerY;

    // Normalize the movement (reduce the effect)
    return {
      x: dx / 100,
      y: dy / 100,
    };
  };

  const mouseAngle = calculateMouseAngle();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a12]">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden bg-[#0a0a12] py-20 md:pt-20 md:pb-0"
      >
        <ParticlesContainer />

        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-transparent to-[#0a0a12] z-10"></div>

        <div className="container relative z-20 flex h-full items-center px-4 md:px-6">
          <div className="flex w-full flex-col items-center space-y-10 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              style={{
                transform: `perspective(1000px) rotateX(${mouseAngle.y
                  }deg) rotateY(${-mouseAngle.x}deg)`,
                transformStyle: "preserve-3d",
              }}
              className="relative w-48 md:w-64"
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#3ecef7] to-[#7deb7d] opacity-70 blur-lg"></div>
              <Image
                src="/images/logo.png"
                alt="Zoftware Development Logo"
                width={300}
                height={300}
                className="relative w-full drop-shadow-[0_0_15px_rgba(62,206,247,0.5)]"
                priority
              />
            </motion.div>

            <div className="space-y-4">
              <h1
                className={`${audiowide.className} text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl`}
              >
                <TypingEffect
                  text="Anything is possible with zoftware"
                  speed={80}
                />
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="mx-auto max-w-[720px] text-gray-300 md:text-xl"
              >
                Custom websites and online stores for Ottawa service businesses
                and founders — launched in 2–4 weeks, from{" "}
                <span className="text-[#7deb7d] font-semibold">$1,800 CAD</span>.
              </motion.p>
            </div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0"
            >
              <Link href="#contact">
                <NeonButton color="cyan">Book a free 20-min call</NeonButton>
              </Link>
              <Link href="#pricing">
                <NeonButton color="green" variant="outline">
                  See pricing
                </NeonButton>
              </Link>
            </motion.div>
          </div>
        </div>

        <HolographicHero />
      </section>

      {/* Services Section */}
      <section
        ref={servicesRef}
        id="services"
        className="relative overflow-hidden py-16 md:py-24"
      >
        <div className="absolute inset-0 bg-[#0a0a12]"></div>
        <CyberGrid />

        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <h2
                className={`${audiowide.className} text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white`}
              >
                What we{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3ecef7] to-[#7deb7d]">
                  build
                </span>
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-lg pt-2">
                Modern, fast websites that work as hard as you do. Built on Next.js + React.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3"
          >
            <motion.div variants={itemVariants}>
              <CyberCard
                icon={<Rocket className="h-8 w-8" />}
                title="Service Business Sites"
                description="Booking, contact forms, Google Maps, testimonials. The site your customers actually use to hire you."
                color="cyan"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <CyberCard
                icon={<ShoppingBag className="h-8 w-8" />}
                title="Online Stores"
                description="Shopify or headless commerce with Stripe. Sell products or digital goods without the monthly bloat."
                color="green"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <CyberCard
                icon={<Wrench className="h-8 w-8" />}
                title="Care & Updates"
                description="Hosting, security patches, and small content changes on demand — $150/mo so you never touch the code."
                color="cyan"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-[#0a0a12]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#3ecef7]/5 via-transparent to-[#7deb7d]/5"></div>

        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <h2
                className={`${audiowide.className} text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white`}
              >
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3ecef7] to-[#7deb7d]">
                  Zoftware
                </span>
              </h2>
            </div>
          </motion.div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 py-12 md:grid-cols-2 items-center">
            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">
                  Transforming Ideas Into Digital Reality
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  At Zoftware Development, we're passionate software engineers who believe that
                  <span className="text-[#3ecef7] font-semibold"> anything is possible with the rightCode</span>.
                  Specializing in modern web development, we craft custom software solutions that drive business growth.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  From responsive websites to complex web applications, we use cutting-edge technologies like
                  <span className="text-[#7deb7d] font-medium"> React, Next.js, and TypeScript</span> to build
                  scalable, performant solutions that exceed expectations.
                </p>
              </div>


            </motion.div>

            {/* Visual Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-lg overflow-hidden">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#3ecef7] to-[#7deb7d] opacity-50 blur-sm"></div>
                <div className="relative bg-[#0f0f1a] p-8 rounded-lg border border-[#1a1a2e]">
                  {/* Code snippet visual */}
                  <div className="font-mono text-sm space-y-2">
                    <div className="text-[#7deb7d]">// Our Philosophy</div>
                    <div className="text-gray-300">
                      <span className="text-[#3ecef7]">const</span> zoftware = {'{'}
                    </div>
                    <div className="pl-4 text-gray-300">
                      <span className="text-[#7deb7d]">mission</span>: <span className="text-orange-400">"Transform businesses through code"</span>,
                    </div>
                    <div className="pl-4 text-gray-300">
                      <span className="text-[#7deb7d]">approach</span>: <span className="text-orange-400">"Client-first development"</span>,
                    </div>
                    <div className="pl-4 text-gray-300">
                      <span className="text-[#7deb7d]">promise</span>: <span className="text-orange-400">"Anything is possible"</span>
                    </div>
                    <div className="text-gray-300">{'}'}</div>
                    <div className="pt-2 text-[#7deb7d]">// Let's build something amazing together!</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link href="#projects" className="inline-block group">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <p className="text-lg text-gray-300 group-hover:text-white transition-colors duration-300">
                  look at what we've done so far 😁👇
                </p>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        ref={projectsRef}
        id="projects"
        className="relative overflow-hidden py-16 md:py-24"
      >
        <div className="absolute inset-0 bg-[#0a0a12]"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-transparent to-[#0a0a12]"></div>

        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={projectsInView ? "visible" : "hidden"}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <h2
                className={`${audiowide.className} text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white`}
              >
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3ecef7] to-[#7deb7d]">
                  Projects
                </span>
              </h2>
              {/* <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                Explore our portfolio of successful projects and innovative
                solutions
              </p> */}
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={projectsInView ? "visible" : "hidden"}
            className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3"
          >
            <motion.div variants={itemVariants}>
              <ProjectCard
                title="With Love Cleaning"
                description="Professional cleaning services website for a mompreneur in Ottawa. Residential, move-in/move-out, and post-construction cleaning, with an integrated quote form."
                outcome="Launched a polished, mobile-first presence so the owner could compete with established Ottawa cleaners."
                tags={[
                  "Next.js 15 (App Router)",
                  "React 18",
                  "TypeScript",
                  "Node.js v18+",
                  "Formspree",
                  "Vercel",
                ]}
                imageUrl="/images/hero-logo.jpg"
                ctaUrl="https://www.withlovecleaning.ca/"
              />
            </motion.div>
            {/* MASA Reset System - First fully paid & retained project */}
            <motion.div variants={itemVariants}>
              <ProjectCard
                title="MASA Reset System"
                description="Web app for a specialized fitness platform for Arabs integrating tailored workout plans, customized diets, and community accountability via private WhatsApp groups and 1-on-1 support."
                outcome="Our first fully-paid retained client — platform now powers a paying subscriber base."
                tags={[
                  "HTML5/CSS3",

                  "Vanilla JS",
                  "Stripe",
                  "@vercel/analytics",
                  "Node.js",
                  "Vercel",

                  "Typeform",
                  "Vimeo Player API",
                  "Font Awesome",
                  "Flubber",
                  "Google Fonts",

                  "Facebook Pixel",
                  "Hotjar",
                ]}
                imageUrl="/images/masa-logo.png"
                ctaUrl="https://www.masa.fitness/"
              />
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        ref={pricingRef}
        className="relative overflow-hidden py-16 md:py-24"
      >
        <div className="absolute inset-0 bg-[#0a0a12]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#3ecef7]/5 via-transparent to-[#7deb7d]/5"></div>

        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <h2
              className={`${audiowide.className} text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white`}
            >
              Simple,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3ecef7] to-[#7deb7d]">
                flat pricing
              </span>
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-lg">
              No hourly billing. No surprise invoices. Pick a package, pay half up front,
              half at launch.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            {/* Starter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-lg border border-[#1a1a2e] bg-[#0f0f1a] p-8 flex flex-col"
            >
              <h3 className="text-xl font-bold text-white">Starter Site</h3>
              <p className="text-gray-400 text-sm mt-1">For solo operators getting online fast.</p>
              <div className="mt-6">
                <span className={`${audiowide.className} text-4xl font-bold text-white`}>$1,800</span>
                <span className="text-gray-400 ml-2">CAD</span>
              </div>
              <p className="text-sm text-[#3ecef7] mt-1">Live in 2 weeks</p>
              <ul className="mt-6 space-y-3 text-gray-300 text-sm flex-1">
                <li>• Up to 5 pages</li>
                <li>• Mobile-first responsive design</li>
                <li>• Contact / quote form</li>
                <li>• Google Maps + reviews embed</li>
                <li>• Basic on-page SEO</li>
                <li>• Vercel deployment</li>
              </ul>
              <Link href="#contact" className="mt-8">
                <NeonButton color="cyan" className="w-full">Book a call</NeonButton>
              </Link>
            </motion.div>

            {/* Growth — highlighted */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative rounded-lg border border-[#7deb7d]/50 bg-[#0f0f1a] p-8 flex flex-col shadow-[0_0_25px_rgba(125,235,125,0.15)]"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#3ecef7] to-[#7deb7d] text-black text-xs font-semibold uppercase px-3 py-1 rounded-full">
                Most popular
              </span>
              <h3 className="text-xl font-bold text-white">Growth Site</h3>
              <p className="text-gray-400 text-sm mt-1">For businesses ready to grow online.</p>
              <div className="mt-6">
                <span className={`${audiowide.className} text-4xl font-bold text-white`}>$3,500</span>
                <span className="text-gray-400 ml-2">CAD</span>
              </div>
              <p className="text-sm text-[#7deb7d] mt-1">Live in 3 weeks</p>
              <ul className="mt-6 space-y-3 text-gray-300 text-sm flex-1">
                <li>• Up to 10 pages</li>
                <li>• Everything in Starter</li>
                <li>• Blog / CMS for easy updates</li>
                <li>• Booking / Calendly integration</li>
                <li>• Advanced SEO + analytics</li>
                <li>• Newsletter capture</li>
              </ul>
              <Link href="#contact" className="mt-8">
                <NeonButton color="green" className="w-full">Book a call</NeonButton>
              </Link>
            </motion.div>

            {/* Commerce */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative rounded-lg border border-[#1a1a2e] bg-[#0f0f1a] p-8 flex flex-col"
            >
              <h3 className="text-xl font-bold text-white">Commerce</h3>
              <p className="text-gray-400 text-sm mt-1">For selling products or digital goods.</p>
              <div className="mt-6">
                <span className={`${audiowide.className} text-4xl font-bold text-white`}>$6,500</span>
                <span className="text-gray-400 ml-2">CAD</span>
              </div>
              <p className="text-sm text-[#3ecef7] mt-1">Live in 4 weeks</p>
              <ul className="mt-6 space-y-3 text-gray-300 text-sm flex-1">
                <li>• Shopify or headless commerce</li>
                <li>• Up to 50 products</li>
                <li>• Stripe / payment integration</li>
                <li>• Inventory + order flows</li>
                <li>• Email receipts + abandoned cart</li>
                <li>• Everything in Growth</li>
              </ul>
              <Link href="#contact" className="mt-8">
                <NeonButton color="cyan" className="w-full">Book a call</NeonButton>
              </Link>
            </motion.div>
          </div>

          {/* Care plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl mt-8 rounded-lg border border-[#1a1a2e] bg-[#0f0f1a] p-6 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div>
              <h4 className="text-lg font-bold text-white">Care Plan — $150 CAD/mo</h4>
              <p className="text-gray-400 text-sm mt-1">
                Hosting, security patches, and up to 1 hour of small content changes each month.
                Cancel anytime.
              </p>
            </div>
            <Link href="#contact">
              <NeonButton color="green" variant="outline">Add to any plan</NeonButton>
            </Link>
          </motion.div>

          <p className="text-center text-sm text-gray-500 mt-6 max-w-2xl mx-auto">
            Need something custom — internal tool, dashboard, or integration? Book a call and we'll
            scope it together.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-[#0a0a12]"></div>
        <div className="absolute inset-0 bg-grid-white/5 bg-grid-8"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-transparent to-[#0a0a12]"></div>

        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <h2
                className={`${audiowide.className} text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white`}
              >
                Let's{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3ecef7] to-[#7deb7d]">
                  talk
                </span>
              </h2>
              <p className="mx-auto max-w-[640px] text-gray-400 md:text-lg pt-2">
                Free 20-minute scoping call. No pitch — we'll walk through what you need
                and tell you honestly if we're a fit.
              </p>
            </div>
          </motion.div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-10 py-12">
            {/* Left: Contact info + primary booking CTA */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col justify-start space-y-8"
            >
              {process.env.NEXT_PUBLIC_CALENDLY_URL ? (
                <Link
                  href={process.env.NEXT_PUBLIC_CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <NeonButton color="cyan" className="w-full py-6 text-base">
                    📅 Book a free 20-min call
                  </NeonButton>
                </Link>
              ) : null}

              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-[#7deb7d]/10 p-3 border border-[#7deb7d]/30 shadow-[0_0_10px_rgba(125,235,125,0.3)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6 text-[#7deb7d]"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.902-.539-5.586-1.54l-6.235 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.888-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">WhatsApp</h3>
                  <p className="text-gray-300">+234 706 890 3471</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-[#7deb7d]/10 p-3 border border-[#7deb7d]/30 shadow-[0_0_10px_rgba(125,235,125,0.3)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-[#7deb7d]"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">Email</h3>
                  <p className="text-gray-300">zoftwaredevelopment@yahoo.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-[#3ecef7]/10 p-3 border border-[#3ecef7]/30 shadow-[0_0_10px_rgba(62,206,247,0.3)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-[#3ecef7]"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">Address</h3>
                  <p className="text-gray-300">
                    Remote work accepted {':)'}
                  </p>
                </div>
              </div>

            </motion.div>

            {/* Right: Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="rounded-lg bg-[#0f0f1a] p-6 md:p-8 border border-[#1a1a2e] shadow-[0_0_15px_rgba(62,206,247,0.15)]"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden bg-[#080810] py-8 md:py-12">
        <div className="absolute inset-0 bg-grid-white/5 bg-grid-8 opacity-20"></div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Image
                src="/images/just-logo.png"
                alt="Zoftware Development Logo"
                width={40}
                height={40}
              />
              <span className="text-lg font-bold text-white">
                Zoftware Development
              </span>
            </div>

            <p className="text-center text-sm text-gray-400 md:text-left">
              © {new Date().getFullYear()} Zoftware Development. All rights
              reserved.
            </p>

            <div className="flex gap-4">
              {/* X */}
              <Link
                href="https://x.com/mishaelwilcox"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#3ecef7] to-[#7deb7d] opacity-0 blur transition duration-300 group-hover:opacity-70"></div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#0f0f1a] text-gray-400 transition-colors duration-300 group-hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    {/* Font Awesome Free 6.7.2 by @fontawesome */}
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                  </svg>
                </div>
              </Link>
              {/* LinkedIn */}
              <Link
                href="https://www.linkedin.com/in/mishaelwilcox"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#3ecef7] to-[#7deb7d] opacity-0 blur transition duration-300 group-hover:opacity-70"></div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#0f0f1a] text-gray-400 transition-colors duration-300 group-hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
              </Link>
              {/* Instagram */}
              <Link
                href="https://www.instagram.com/zoftwaredevelopment"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#3ecef7] to-[#7deb7d] opacity-0 blur transition duration-300 group-hover:opacity-70"></div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#0f0f1a] text-gray-400 transition-colors duration-300 group-hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
