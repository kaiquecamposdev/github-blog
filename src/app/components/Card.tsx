export function Card() {
  return (
    <>
      <div className="flex h-full max-h-[260px] w-full max-w-[416px] flex-col gap-5 rounded-[10px] bg-base-post p-8">
        <div className="flex gap-4">
          <h1 className="text-xl font-bold text-base-title">
            JavaScript data types and data structures
          </h1>
          <span className="w-max text-sm text-base-span">Há 1 dia</span>
        </div>
        <p className="overflow-hidden text-base-text">
          Programming languages all have built-in data structures, but these
          often differ from one language to another. This article attempts to
          list the built-in data structures available in JavaScript and what
          properties they have. These can be used to build other data
          structures. Wherever possible, comparisons with other languages are
          drawn.
        </p>
      </div>
    </>
  )
}
