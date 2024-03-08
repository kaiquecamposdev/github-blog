import { Card } from './components/Card'
import { Header } from './components/Header'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-base">
      <header className="flex min-h-[296px] w-full before:w-full before:bg-logo before:bg-cover before:bg-center before:bg-no-repeat"></header>
      <section className=" z-10 flex w-full max-w-main-content flex-col">
        <Header />
        <div className="flex flex-col gap-12 pt-[58px]">
          <section className="flex w-full flex-col gap-2">
            <div className="flex w-full justify-between">
              <strong className="text-lg font-bold text-base-subtitle">
                Publicações
              </strong>
              <span className="text-sm text-base-span">
                {0 + ' '}
                Publicações
              </span>
            </div>
            <form>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Buscar conteúdo"
                className="w-full rounded-md border-[1px] border-base-border bg-base-input px-4 py-3 text-base text-white placeholder:text-base-label"
              />
            </form>
          </section>
          <section className="grid grid-cols-2 gap-8">
            <Card />
            <Card />
            <Card />
            <Card />
          </section>
        </div>
      </section>
    </main>
  )
}
