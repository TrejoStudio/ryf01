"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const brands = [
  { name: "CASE", logo: "/marcas/CASE.png" },
  { name: "CAT", logo: "/marcas/CAT.png" },
  { name: "DEERE", logo: "/marcas/DEERE.png" },
  { name: "JCB", logo: "/marcas/JCB.png" },
  { name: "KOMATSU", logo: "/marcas/KOMATSU.png" },
  { name: "VOLVO", logo: "/marcas/VOLVO.png" }
]

export function TrustBadges() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div 
          ref={sectionRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-center items-center"
        >
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className={`mx-auto flex flex-col justify-center items-center text-center transition-all duration-700 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative w-40 h-24 flex items-center justify-center">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={160}
                  height={96}
                  className="object-contain max-w-full max-h-full transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
