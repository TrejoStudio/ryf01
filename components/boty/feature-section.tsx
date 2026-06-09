"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Globe, Timer, Settings } from "lucide-react"

const Whatsapp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)



export function FeatureSection() {
  const [isVisible, setIsVisible] = useState(false)
  const bentoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (bentoRef.current) {
      observer.observe(bentoRef.current)
    }

    return () => {
      if (bentoRef.current) {
        observer.unobserve(bentoRef.current)
      }
    }
  }, [])

  return (
    <section className="pt-24 pb-8 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Bento Grid */}
        <div
          ref={bentoRef}
          className="grid md:grid-cols-4 mb-20 md:grid-rows-[300px_300px] gap-6"
        >
          {/* Left Large Block - Video with Overlay Card */}
          <div
            className={`relative rounded-3xl overflow-hidden h-[500px] md:h-auto md:col-span-2 md:row-span-2 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            style={{ transitionDelay: '0ms' }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/marcas/Caja%20RF.mp4" type="video/mp4" />
            </video>
            {/* Overlay Card */}
            <div className="absolute top-8 left-8 right-8 glass-card glass-card-opaque-30 p-6 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">

                </div>
                <div>
                  <h3 className="text-xl text-foreground mb-2 font-medium">
                    100% <span className="">PIEZAS ORIGINALES</span>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Nuestros clientes tienen la seguridad de rebicir repuestos originales de las marcas lideres en el mercado mundial.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Right - 100% Natural */}
          <div
            className={`rounded-3xl p-6 md:p-8 flex flex-col justify-center md:col-span-2 relative overflow-hidden transition-all duration-700 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            style={{ transitionDelay: '100ms' }}
          >
            {/* Background Image */}
            <Image
              src="/images/Feature-02.jpg"
              alt="Natural ingredients"
              fill
              className="object-cover"
            />


            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl text-white mb-2">
                DONDE SEA
              </h3>
              <h3 className="text-2xl md:text-3xl text-white/70 mb-4">
                AHÍ ESTAREMOS
              </h3>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Globe className="w-4 h-4 flex-shrink-0" />
                  <span>Entregamos a todo el Perú</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Timer className="w-4 h-4 flex-shrink-0" />
                  <span>Disponibilidad en tiempo record</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Settings className="w-4 h-4 flex-shrink-0" />
                  <span>Piezas garantizadas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Right - Eco-Friendly Packaging */}
          <div
            className={`rounded-3xl p-6 md:p-8 flex flex-col justify-center relative overflow-hidden md:col-span-2 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            style={{ transitionDelay: '200ms' }}
          >
            {/* Background Video */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
            >
              <source src="/images/Feature-03.mp4" type="video/mp4" />
            </video>
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-transparent" />

            <div className="relative z-10 flex flex-col justify-center h-full text-left items-start">
              <div className="inline-flex items-center justify-center w-10 h-10 mb-3">
                <Whatsapp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl mb-1 text-white">
                Estamos para ayudarte
              </h3>
              <h3 className="font-sans text-base mb-2 text-white">
                Nuestros asesores expertos<br />
                están listos para guiarte<br />en todo el proceso de compra.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
