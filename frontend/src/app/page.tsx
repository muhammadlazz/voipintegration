export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#b2e0e5] text-[#0d1a59] font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 bg-[#17285d] text-white">
        <h1 className="text-3xl font-bold">Ringi</h1>
        <ul className="flex space-x-8 text-sm font-medium">
          <li className="hover:text-cyan-300 cursor-pointer">Home</li>
          <li className="hover:text-cyan-300 cursor-pointer">Dial Pad</li>
          <li className="hover:text-cyan-300 cursor-pointer">Call Logs</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center relative text-center px-4 py-20 bg-[#0d1a59] text-white overflow-hidden">
        {/* Decorative Circle */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#2d00b3] rounded-full -translate-y-1/2 translate-x-1/4 z-0"></div>

        <div className="relative z-10 max-w-xl mx-auto">
          <h2 className="text-5xl font-bold mb-4 leading-tight">
            VoIP for <br /> Kamailio
          </h2>
          <h3 className="text-lg font-semibold mb-2">
            “Simplify Your Communication with Kamailio-Powered VoIP Platform”
          </h3>
          <p className="italic text-sm mb-6">
            Real-time voice and video calls, right from your browser
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <input
              type="text"
              placeholder="Enter your phone number..."
              className="px-5 py-3 rounded-full w-64 text-black"
            />
            <button className="bg-[#00aaff] hover:bg-cyan-600 text-white px-6 py-3 rounded-full transition">
              login
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#17285d] text-white px-10 py-6 text-center">
        <div className="flex justify-center space-x-6 mb-2 text-sm">
          <span className="cursor-pointer hover:text-cyan-300">About</span>
          <span className="cursor-pointer hover:text-cyan-300">Features</span>
          <span className="cursor-pointer hover:text-cyan-300">Help</span>
          <span className="cursor-pointer hover:text-cyan-300">Contact</span>
        </div>
        <p className="text-xs">© 2025 Ringi. All rights reserved</p>
      </footer>
    </main>
  );
}