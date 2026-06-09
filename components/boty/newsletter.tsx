"use client"

import React from "react"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"

export function Newsletter() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && email && message) {
      setIsSubscribed(true)
      setName("")
      setEmail("")
      setMessage("")
    }
  }

  return (
    <section className="py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "url('/images/Back-04.jpg')" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl leading-tight text-black mb-4 text-balance md:text-5xl">
            contáctanos
          </h2>
          <p className="text-lg text-black mb-10">
            Estamos para ayudarte en lo que necesites.
          </p>

          {isSubscribed ? (
            <div className="inline-flex items-center gap-3 bg-black/5 backdrop-blur-sm rounded-full px-8 py-4">
              <Check className="w-5 h-5 text-black" />
              <span className="text-black">¡Gracias por escribirnos! Te responderemos a la brevedad.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto text-left">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre completo"
                className="w-full bg-black/5 backdrop-blur-sm border border-black/10 rounded-xl px-5 py-3.5 text-black placeholder:text-black/50 focus:outline-none focus:border-black/30 boty-transition"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                className="w-full bg-black/5 backdrop-blur-sm border border-black/10 rounded-xl px-5 py-3.5 text-black placeholder:text-black/50 focus:outline-none focus:border-black/30 boty-transition"
                required
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe tu mensaje..."
                rows={4}
                className="w-full bg-black/5 backdrop-blur-sm border border-black/10 rounded-xl px-5 py-3.5 text-black placeholder:text-black/50 focus:outline-none focus:border-black/30 boty-transition resize-none"
                required
              />
              <button
                type="submit"
                className="group w-full inline-flex items-center justify-center gap-2 glass-btn-orange !text-black px-8 py-4 rounded-full text-sm font-semibold tracking-wide boty-transition mt-2"
              >
                Enviar mensaje
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 boty-transition" />
              </button>
            </form>
          )}

          <div className="mt-10 text-black text-sm md:text-base font-medium tracking-wider">
            Celular: +51 903 295 930 &nbsp;&nbsp;-&nbsp;&nbsp; Email: ventas@ryf.pe
          </div>
        </div>
      </div>
    </section>
  )
}
