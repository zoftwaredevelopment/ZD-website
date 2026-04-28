"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  ctaUrl?: string;
}

export function ProjectCard({
  title,
  description,
  imageUrl,
  ctaUrl,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className="h-full"
    >
      <Card className="group relative h-full overflow-hidden border-[#1a1a2e] bg-[#0f0f1a] transition-all duration-300">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3ecef7] to-[#7deb7d] opacity-0 blur transition duration-300 group-hover:opacity-70"></div>

        <div className="relative h-full rounded-sm bg-[#0f0f1a] p-1">
          <Link href={ctaUrl || "#"} className="block relative" target="_blank" rel="noopener noreferrer">
            <div className="aspect-video w-full overflow-hidden">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={title}
                width={600}
                height={400}
                className="h-full w-full object-cover transition-transform duration-500 "
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-transparent to-transparent"></div>
            </div>
          </Link>

          <div className="relative z-10 space-y-3 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <div className="h-2 w-2 rounded-full bg-[#3ecef7] shadow-[0_0_8px_rgba(62,206,247,0.8)]"></div>
            </div>

            <p className="text-gray-400">{description}</p>

            <div className="pt-2">
              <Link
                href={ctaUrl || "#"}
                className="group inline-flex items-center text-sm font-medium text-[#7deb7d] transition-colors hover:text-[#5bc95b]"
                target="_blank" rel="noopener noreferrer"
              >
                <span>See for yourself</span>
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
                  className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
