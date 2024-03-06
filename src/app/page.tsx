import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare,
  faBuilding,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-white before:absolute before:top-0 before:z-10  before:h-[296px] before:w-full before:bg-logo before:bg-cover before:bg-center before:bg-no-repeat">
      <main className="bg-base max-w-main-content flex w-full">
        <header className="bg-base-profile flex items-center gap-8">
          <section className="rounded-lg bg-slate-400">
            <Image src={'/person.png'} width={148} height={148} alt="" />
          </section>
          <section>
            <div>
              <h1 className="text-base-title text-2xl font-bold">
                Kaique de Campos Monteiro
              </h1>
              <a className="text-base-blue flex cursor-pointer items-center gap-2 text-xs font-bold uppercase">
                Github
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  width={12}
                  height={12}
                />
              </a>
            </div>
            <p className="text-base-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum
              fugit soluta magnam, impedit laudantium repudiandae, pariatur,
              atque reiciendis saepe suscipit quo consectetur! Repudiandae,
              provident quo consequuntur quod consectetur eligendi numquam!
            </p>
            <nav>
              <ul className="flex">
                <li className="flex items-center gap-2">
                  <FontAwesomeIcon width={18} height={18} icon={faGithub} />
                  kaiquecamposdev
                </li>
                <li className="flex items-center gap-2">
                  <FontAwesomeIcon width={18} height={18} icon={faBuilding} />
                  KaiqueTech
                </li>
                <li className="flex items-center gap-2">
                  <FontAwesomeIcon width={18} height={18} icon={faUserGroup} />
                  32 Seguidores
                </li>
              </ul>
            </nav>
          </section>
        </header>
      </main>
    </div>
  )
}
