export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4">
          Welcome to the Next.js Layout
        </h1>
        <p className="text-purple-300 text-base lg:text-lg leading-relaxed">
          This is the main content area with a responsive design that works
          across all screen sizes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-purple-900 rounded-lg p-6 border border-purple-800">
          <h2 className="text-lg font-semibold text-white mb-2">Feature 1</h2>
          <p className="text-purple-300 text-sm">
            Responsive sidebar that adapts to different screen sizes.
          </p>
        </div>
        <div className="bg-purple-900 rounded-lg p-6 border border-purple-800">
          <h2 className="text-lg font-semibold text-white mb-2">Feature 2</h2>
          <p className="text-purple-300 text-sm">
            Hamburger menu functionality for mobile devices.
          </p>
        </div>
        <div className="bg-purple-900 rounded-lg p-6 border border-purple-800 md:col-span-2 lg:col-span-1">
          <h2 className="text-lg font-semibold text-white mb-2">Feature 3</h2>
          <p className="text-purple-300 text-sm">
            Modern design with Tailwind CSS and Lucide icons.
          </p>
        </div>
      </div>
    </div>
  );
}
