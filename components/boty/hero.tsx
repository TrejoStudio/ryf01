"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const FRAME_COUNT = 144;
const START_FRAME = 1014;

// Helper to pad numbers: 1014 -> "01014"
const currentFrame = (index: number) => `/Secuencia2/Sequence ${String(START_FRAME + index).padStart(5, '0')}.png`;

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Prevent strict mode double load
    if (imagesRef.current.length > 0) return;

    let loadedCount = 0;
    const newImages: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          imagesRef.current = newImages;
          setImagesLoaded(true);
        }
      };
      newImages.push(img);
    }
  }, []);

  const drawCover = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement) => {
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
    );
  };

  useEffect(() => {
    if (!imagesLoaded) return;

    const handleScrollOrResize = () => {
      if (!sectionRef.current || !canvasRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollFraction = -rect.top / (rect.height - window.innerHeight);

      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(scrollFraction * FRAME_COUNT))
      );

      requestAnimationFrame(() => {
        if (canvasRef.current && imagesRef.current[frameIndex]) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            drawCover(ctx, imagesRef.current[frameIndex], canvasRef.current);
          }
        }
      });
    };

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        handleScrollOrResize();
      }
    };

    window.addEventListener('scroll', handleScrollOrResize);
    window.addEventListener('resize', handleResize);

    // Initial setup
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleResize);
    };
  }, [imagesLoaded]);

  return (
    <section ref={sectionRef} className="relative h-[300vh]" style={{ backgroundColor: '#e3e1e2' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        {/* Canvas for Scroll Animation */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

        {/* Bottom fade gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 w-full pt-20 mr-14 lg:mr-0 pointer-events-none" style={{ transform: 'translateY(-250px)' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="w-full lg:max-w-xl mx-auto lg:mx-0 text-center lg:text-left pointer-events-auto">
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 text-balance text-black">
                <span className="block animate-blur-in opacity-0 font-thin text-[20px]" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>SOMOS PROFESIONALES.</span>
                <span className="block animate-blur-in opacity-0 font-thin text-[30px]" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>CON LAS MEJORES MARCAS.</span>
              </h2>
              <p className="text-lg leading-relaxed mb-10 max-w-md mx-auto lg:mx-0 text-black animate-blur-in opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                Descubre nuestro ámplio catálogo de partes y respuestos originales para tu maquinaria.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-blur-in opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
                <Link
                  href="/shop"
                  className="group inline-flex items-center justify-center gap-3 glass-btn-primary px-8 py-4 rounded-full text-sm tracking-wide boty-transition"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 boty-transition" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-black pointer-events-none">
          <span className="text-xs tracking-widest uppercase font-bold">Scroll to animate</span>
          <div className="w-px h-12 bg-black/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-black/60 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
