
"use client"
import { useState } from "react"

function StoryCard({ title, image, excerpt, author }) {
  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition h-64 flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 px-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-white/90 mt-1">{excerpt}</p>
        <p className="text-xs text-white/70 mt-2">— {author}</p>
      </div>
    </div>
  )
}

export default function StoriesCTA() {
  const [visibleCount, setVisibleCount] = useState(4)


  const stories = [
    {
      id: 1,

      title: "Finding Light Again",
      image: "/stories-background1.jpeg",
      excerpt: "After years of struggle, I found hope through Ian Cares.",
      author: "Aarav, 32",
    },
    {
      id: 2,
      title: "Nature Heals",
      image: "/stories-background2.jpeg",
      excerpt: "Being heard changed everything. I’m finally healing.",
      author: "Meera, 27",
    },
    {
      id: 3,
      title: "Peace Within",
      image: "/stories-background3.jpeg",
      excerpt: "Meditation and support helped me reclaim my life.",
      author: "Ravi, 40",
    },
    {
      id: 4,
      title: "Sunlight Returns",
      image: "/stories-background4.jpeg",
      excerpt: "I never thought I’d smile again. Ian Cares made it possible.",
      author: "Anjali, 35",
    },
    {
      id: 5,
      title: "Rebuilding Trust",
      image: "/stories-background1.jpeg",
      excerpt: "I learned to trust again—with myself and others.",
      author: "Kabir, 29",
    },
    {
      id: 6,
      title: "A New Chapter",
      image: "/stories-background2.jpeg",
      excerpt: "Every day feels like a fresh start now.",
      author: "Tanya, 38",
    },
    {
      id: 7,
      title: "From Darkness to Light",
      image: "/stories-background3.jpeg",
      excerpt: "I was lost, but now I feel whole again.",
      author: "Rahul, 45",
    },
    {
      id: 8,
      title: "The Power of Listening",
      image: "/stories-background4.jpeg",
      excerpt: "Someone finally listened. That changed everything.",
      author: "Nisha, 30",
    },
  ]

  const visibleStories = stories.slice(0, visibleCount)

  return (
    <section
      className="relative py-20 sm:py-24 overflow-hidden"
      style={{
        backgroundImage: "url('/backgrounds/soft-watercolor.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Section Title */}
          <div className="text-center max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Journeys to <span className="text-teal-600">Wholeness</span>
            </h2>
            <p className="mt-6 text-lg md:text-xl text-slate-700 mx-auto leading-relaxed">
              Real stories. Real change. Discover journeys of courage, healing, 
              and renewed purpose from individuals supported by our foundation.
            </p>
          </div>

          {/* Story Grid */}
          <div className="mt-16 w-full max-w-4xl transition-all duration-500 ease-in-out">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {visibleStories.map((story) => (
                <StoryCard key={story.id} {...story} />
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < stories.length && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                  className="inline-flex items-center gap-2.5 bg-teal-600 text-white font-semibold px-7 py-3 rounded-full shadow-lg shadow-teal-600/30 hover:shadow-teal-600/50 hover:bg-teal-700 hover:-translate-y-0.5 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Show More Stories
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )

}
