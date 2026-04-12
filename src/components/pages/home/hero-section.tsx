import {
  ArrowRight,
  Calendar,
  MapPin,
  ShieldCheck,
  Star,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#030303] text-zinc-100 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full" />

        <div
          className="absolute inset-0 opacity-[0.15] mask-[radial-gradient(ellipse_at_center,black,transparent_80%)]"
          style={{
            backgroundImage:
              'url("https://grainy-gradients.vercel.app/noise.svg"), linear-gradient(to right, #222 1px, transparent 1px), linear-gradient(to bottom, #222 1px, transparent 1px)',
            backgroundSize: "100%, 40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 w-full container mx-auto px-4 lg:px-0 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div className="space-y-10 text-center lg:text-left">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping" />
              <span className="text-zinc-400">
                Trusted by 50,000+ Event Goers
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="max-[350px]:text-3xl max-[450px]:text-5xl text-6xl md:text-7xl xl:text-8xl font-black tracking-tight  text-white">
                GET YOUR {""}
                <span className="bg-linear-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  FRONT ROW
                </span>{" "}
                
                EXPERIENCE.
              </h1>
              <p className="max-[450px]:text-base text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed">
                The world&apos;s fastest ticketing engine. Secure your spot at
                the most exclusive concerts, tech conferences, and sporting
                events with zero latency.
              </p>
            </div>


            <div className="flex max-lg:justify-center flex-wrap gap-5">
              <Link
                href="/events"
                className="group relative px-8 py-4 bg-white text-black font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                Explore Live Events
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex max-lg:justify-center items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="relative w-10 h-10 rounded-full border-2 border-[#030303] bg-zinc-800 overflow-hidden"
                  >
                    <Image
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt={`User Avatar ${i}`}
                      fill
                      sizes="40px"
                      priority={true}
                      className="object-cover opacity-80"
                    />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-[#030303] bg-blue-600 flex items-center justify-center text-[10px] font-bold">
                  12k+
                </div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-3 h-3 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>
                <span className="text-xs text-zinc-500 font-medium">
                  4.9/5 Average Rating
                </span>
              </div>
            </div>
          </div>


          <div className="relative hidden lg:flex justify-center items-center">
            
            <div className="relative w-[400px] h-[540px] rounded-[40px] border border-white/10 bg-linear-to-br from-white/10 to-transparent backdrop-blur-2xl p-8 shadow-2xl flex flex-col justify-between overflow-hidden group">
              
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 blur-[60px] group-hover:bg-blue-500/40 transition-colors" />

              <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-[10px] font-bold tracking-widest uppercase">
                    Verified Pass
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">
                    Upcoming Event
                  </span>
                  <h3 className="text-3xl font-bold leading-tight">
                    Afterlife: Global Tech Conference 2025
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-zinc-300">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium">
                      Dec 24, 2025 • 09:00 PM
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-300">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium">
                      Innovation Hub, Silicon Valley
                    </span>
                  </div>
                </div>
              </div>

              {/* কার্ডের নিচের অংশ (QR Section Placeholder) */}
              <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-center py-4 border-y border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 uppercase font-bold">
                      Price
                    </span>
                    <span className="text-xl font-bold">$249.00</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] text-zinc-500 uppercase font-bold">
                      Seat
                    </span>
                    <span className="text-xl font-bold">V-102</span>
                  </div>
                </div>
                <div className="w-full h-12 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-1 bg-linear-to-r from-transparent via-blue-500 to-transparent animate-shimmer" />
                  <span className="absolute text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
                    Scanning Integrity...
                  </span>
                </div>
              </div>
            </div>

            {/* ফ্লোটিং ইনফো ব্যাজ */}
            <div className="absolute top-10 -right-10 p-5 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl animate-bounce duration-4000">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-bold">
                    ACTUAL DEMAND
                  </p>
                  <p className="text-sm font-bold text-white">🔥 High Volume</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-10 p-5 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-bold">SECURITY</p>
                  <p className="text-sm font-bold text-white">Atomic Locking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `,
        }}
      />
    </section>
  );
}
