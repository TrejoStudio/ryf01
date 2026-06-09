"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Boxes, Truck } from "lucide-react"

const features = [
  {
    icon: Boxes,
    title: "Amplio Catálogo",
    description: "Extensa variedad de repuestos y componentes de las mejores marcas del mercado."
  },
  {
    icon: Truck,
    title: "Envíos Rápidos",
    description: "Despachos inmediatos a nivel nacional para minimizar la inactividad de tus equipos."
  }
]

export function WhyBoty() {
  const [isVideoVisible, setIsVideoVisible] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const videoSectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionOffsetTop = rect.top + window.scrollY
      const relativeScroll = window.scrollY - sectionOffsetTop
      setScrollY(relativeScroll * 0.15)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (videoSectionRef.current) {
      videoObserver.observe(videoSectionRef.current)
    }

    if (headerRef.current) {
      headerObserver.observe(headerRef.current)
    }

    return () => {
      if (videoSectionRef.current) {
        videoObserver.unobserve(videoSectionRef.current)
      }
      if (headerRef.current) {
        headerObserver.unobserve(headerRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden bg-background">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: "url('/images/Back-02.jpg')",
          transform: `translateY(${scrollY}px)`,
          willChange: "transform"
        }}
      />
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[#826017]/80" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div
          ref={videoSectionRef}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center my-0 py-16"
        >
          {/* Video */}
          <div
            className={`relative aspect-[4/5] rounded-3xl overflow-hidden boty-shadow transition-all duration-700 ease-out ${isVideoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/images/Video-04.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Content */}
          <div
            ref={headerRef}
            className={`transition-all duration-700 ease-out ${isVideoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '100ms' }}
          >
            <h2 className={`font-serif text-4xl leading-tight text-white mb-6 text-balance md:text-5xl ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}>
              Calidad y responsabilidad.
            </h2>
            <p className={`text-lg text-white/90 font-medium leading-relaxed mb-10 max-w-md ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.6s', animationFillMode: 'forwards' } : {}}>
              Desde el 2017, R&F Partes y Equipos opera formalmente, consolidando una trayectoria basada en conocimiento técnico, responsabilidad y cumplimiento.
            </p>

            {/* Feature Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group p-5 boty-transition hover:scale-[1.02] rounded-md glass-card glass-card-opaque-30"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-3 group-hover:bg-primary/20 boty-transition bg-primary/10">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-foreground/80">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Catálogo Completo Button */}
            <div className="flex justify-center mt-8">
              <Link
                href="/shop"
                className="px-12 py-4 text-center rounded-full glass-btn-orange text-white font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] flex items-center justify-center inline-flex"
              >
                CATÁLOGO COMPLETO
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
