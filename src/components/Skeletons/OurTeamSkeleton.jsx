"use client";

const OurTeamSkeleton = () => {
  return (
    <div className="bg-stone-50 min-h-screen antialiased">

      {/* ================= HERO SKELETON ================= */}
      <header className="max-w-7xl mx-auto px-6 md:px-14 pt-32 pb-16 grid md:grid-cols-2 gap-12 md:gap-20 items-end animate-pulse">

      {/* LEFT COLUMN */}
      <div>
        {/* Badge */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          <div className="h-3 w-40 bg-gray-300 rounded-full" />
        </div>

        {/* Heading (3 lines) */}
        <div className="space-y-3 mb-7">
          <div className="h-[64px] md:h-[80px] bg-gray-300 rounded-xl w-full" />
          <div className="h-[64px] md:h-[80px] bg-gray-300 rounded-xl w-5/6" />
          <div className="h-[64px] md:h-[80px] bg-gray-300 rounded-xl w-4/6" />
        </div>

        {/* Paragraph */}
        <div className="space-y-3 max-w-sm">
          <div className="h-4 bg-gray-300 rounded-full w-full" />
          <div className="h-4 bg-gray-300 rounded-full w-5/6" />
          <div className="h-4 bg-gray-300 rounded-full w-2/3" />
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="flex flex-col gap-8">
        {/* Quote */}
        <div className="border-l-[3px] border-gray-300 pl-6 space-y-3">
          <div className="h-4 bg-gray-300 rounded-full w-5/6" />
          <div className="h-4 bg-gray-300 rounded-full w-4/6" />
        </div>

        {/* Stats */}
        <div className="flex gap-10 pl-6">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="h-12 w-20 bg-gray-300 rounded-lg mb-2" />
              <div className="h-3 w-24 bg-gray-300 rounded-full" />
            </div>
          ))}
        </div>
      </div>

    </header>

      {/* ================= DEPARTMENT PILLS ================= */}
      <nav className="max-w-7xl mx-auto px-6 md:px-14 py-10 flex flex-wrap gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-9 w-36 bg-white border border-gray-200 rounded-full animate-pulse"
          />
        ))}
      </nav>

      {/* ================= DEPARTMENT SECTIONS ================= */}
      <main className="max-w-7xl mx-auto px-6 md:px-14 pb-16 space-y-28">
        {[1, 2, 3].map((section) => (
          <section key={section} className="space-y-10">

            {/* Header */}
            <div className="flex items-end justify-between gap-6 border-b border-gray-200 pb-6 flex-wrap">
              <div className="flex items-start gap-4">
                <div className="w-[3px] h-14 bg-gray-300 rounded-full animate-pulse" />
                <div className="space-y-3">
                  <div className="h-3 w-28 bg-gray-300 rounded-full animate-pulse" />
                  <div className="h-10 w-56 bg-gray-300 rounded-xl animate-pulse" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-4 w-14 bg-gray-300 rounded animate-pulse" />
                <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse" />
                <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Carousel */}
            <div className="overflow-hidden">
              <div className="flex gap-5">

                {[1, 2, 3, 4].map((card) => (
                  <div
                    key={card}
                    className="min-w-[260px] md:min-w-[300px] bg-white border border-gray-200 rounded-2xl p-4 space-y-4"
                  >
                    <div className="h-56 bg-gray-200 rounded-xl animate-pulse" />

                    <div className="space-y-2">
                      <div className="h-4 w-3/4 bg-gray-300 rounded-full animate-pulse" />
                      <div className="h-3 w-1/2 bg-gray-300 rounded-full animate-pulse" />
                    </div>

                    <div className="flex gap-2">
                      <div className="h-7 w-20 bg-gray-200 rounded-full animate-pulse" />
                      <div className="h-7 w-20 bg-gray-200 rounded-full animate-pulse" />
                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* Progress bar */}
            <div className="h-[2px] bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-gray-300 animate-pulse" />
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4].map((d) => (
                <div
                  key={d}
                  className="h-2 w-2 bg-gray-300 rounded-full animate-pulse"
                />
              ))}
            </div>

          </section>
        ))}
      </main>

      {/* ================= CTA SKELETON ================= */}
      <section className="bg-white py-24">
        <div className="max-w-3xl mx-auto text-center px-6 space-y-6">
          <div className="h-10 bg-gray-300 rounded-xl animate-pulse" />
          <div className="h-4 w-2/3 mx-auto bg-gray-300 rounded-full animate-pulse" />
          <div className="h-12 w-48 mx-auto bg-gray-300 rounded-xl animate-pulse" />
        </div>
      </section>

    </div>
  );
};

export default OurTeamSkeleton;
