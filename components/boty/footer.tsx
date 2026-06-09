"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Twitter } from "lucide-react"

const footerLinks = {
  shop: [
    { name: "All Products", href: "/shop" },
    { name: "Serums", href: "/shop?category=serums" },
    { name: "Moisturizers", href: "/shop?category=moisturizers" },
    { name: "Cleansers", href: "/shop?category=cleansers" },
    { name: "Gift Sets", href: "/shop" }
  ],
  about: [
    { name: "Our Story", href: "/" },
    { name: "Ingredients", href: "/" },
    { name: "Sustainability", href: "/" },
    { name: "Press", href: "/" }
  ],
  support: [
    { name: "Contact Us", href: "/" },
    { name: "FAQ", href: "/" },
    { name: "Shipping", href: "/" },
    { name: "Returns", href: "/" }
  ]
}

export function Footer() {
  return (
    <footer className="relative pt-20 pb-10 overflow-hidden bg-black text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-excavator.jpg"
          alt="Heavy machinery background"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Blue overlay */}
      <div className="absolute inset-0 bg-[#0C142B]/90 z-0" />

      {/* Giant Background Text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0">
        <span className="font-serif text-[200px] sm:text-[200px] md:text-[400px] lg:text-[400px] xl:text-[400px] font-bold text-white/20 whitespace-nowrap leading-none">

        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center text-center">
            <div className="flex flex-col items-center gap-2 mb-4">
              <div className="relative w-36 h-24">
                <Image
                  src="/images/Logo RyF White.png"
                  alt="RyF Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="font-serif text-[14px] text-white tracking-wider leading-none">Partes y equipos</h2>
            </div>
            <div className="flex gap-4">
              <a
                href="https://x.com/Kerroudjm"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-btn-outline flex items-center justify-center text-white/60 hover:text-white boty-transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/Kerroudjm"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-btn-outline flex items-center justify-center text-white/60 hover:text-white boty-transition"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/Kerroudjm"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-btn-outline flex items-center justify-center text-white/60 hover:text-white boty-transition"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-medium text-white mb-4">CATÁLOGO</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white boty-transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-medium text-white mb-4">NOSOTROS</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white boty-transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-medium text-white mb-4">INFORMACIÓN</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white boty-transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/50">
              © {new Date().getFullYear()} Boty. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/" className="text-sm text-white/50 hover:text-white boty-transition">
                Privacy Policy
              </Link>
              <Link href="/" className="text-sm text-white/50 hover:text-white boty-transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
