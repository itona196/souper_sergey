"use client";

import { useState, useEffect } from "react";
import { nextThursday, format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";

export default function Home() {
  const [prenom, setPrenom] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [fireflies, setFireflies] = useState<
    { x: number; y: number; size: number; delay: number; duration: number }[]
  >([]);

  useEffect(() => {
    setShow(true);

    const generated = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100, 
      size: Math.random() * 3 + 1.5, 
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 14, 
    }));
    setFireflies(generated);
  }, []);

  const prochainJeudi = format(nextThursday(new Date()), "EEEE d MMMM", { locale: fr });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/inscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prenom }),
    });

    const data = await res.json();
    if (data.success) {
      setMessage("Ton inscription est bien enregistrée. À jeudi !");
      setPrenom("");
    } else {
      setMessage(data.error || "Une erreur est survenue.");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b132b] text-[#eaeaea] px-6 py-12 relative overflow-hidden">

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_transparent_70%)]"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {fireflies.map((f, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#f4d35e] blur-[1px]"
          style={{
            width: `${f.size}px`,
            height: `${f.size}px`,
            left: `${f.x}vw`,
            top: `${f.y}vh`,
            opacity: 0.8,
            zIndex: Math.random() > 0.5 ? 0 : -1,
            filter: `blur(${Math.random() * 1.5}px)`,
          }}
          animate={{
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25],
            opacity: [0.2, 0.9, 0.2],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 360],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

  
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.15)] rounded-3xl p-8 relative z-10"
      >
        <h1 className="text-3xl font-semibold text-center mb-3 text-[#f6f6f6]">
          Souper du Jeudi chez les Dijkstra
        </h1>
        <p className="text-center text-gray-300 mb-8 text-lg">
          Prochain souper :{" "}
          <strong className="text-[#fffbe6]">
            {prochainJeudi.charAt(0).toUpperCase() + prochainJeudi.slice(1)}
          </strong>
        </p>

        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <input
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Ton prénom"
            className="bg-white/15 border border-white/30 rounded-lg px-4 py-3 text-center text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f4d35e]/60 transition"
            required
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="bg-[#f4d35e] text-[#0b132b] font-medium py-3 rounded-lg shadow-lg hover:shadow-[#f4d35e]/40 hover:bg-[#ffe38a] transition"
          >
            Je m’inscris
          </motion.button>
        </motion.form>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-center text-sm bg-white/10 border border-white/20 text-[#fffbe6] rounded-lg py-2"
          >
            {message}
          </motion.p>
        )}
      </motion.div>

     
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-10 text-sm text-gray-400 text-center z-10"
      >
        Organisé avec ❤️ par <span className="text-gray-100 font-medium">Esteban & Loan</span>
        <br />
      </motion.footer>
    </main>
  );
}
