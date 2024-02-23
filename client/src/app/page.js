export default function Home() {
  return (
    <main className="p-8 flex flex-col items-center gap-y-8">
      <h1 className="text-4xl">heading</h1>

      <h2 className="text-xl text-teal-600">subheading</h2>

      <button className="bg-teal-600 px-4 py-2 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:bg-teal-700 focus:ring-teal-300">
        button
      </button>
      
      <div className="bg-red-300 px-4 py-2 rounded text-red-800 flex justify-between items-center w-64">
        <div>
          <h2 className="font-bold text-xl">card</h2>
          <p>description</p>
        </div>
        <button className="hover:bg-red-400 w-6 h-6 rounded-full focus:outline-none focus:bg-red-400">X</button>
      </div>
    </main>
  )
}
