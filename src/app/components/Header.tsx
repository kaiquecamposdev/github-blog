import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare,
  faBuilding,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'

export function Header() {
  return (
    <header className="mt-[-87px] flex items-center gap-8 rounded-lg bg-base-profile p-10 shadow-xl">
      <section className="rounded-lg bg-slate-400">
        <Image src={'/person.png'} width={148} height={148} alt="" />
      </section>
      <section>
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-base-title">
            Kaique de Campos Monteiro
          </h1>
          <a className="flex cursor-pointer items-center gap-2 text-xs font-bold uppercase text-base-blue">
            Github
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              width={12}
              height={12}
            />
          </a>
        </div>
        <div className="flex flex-col gap-6">
          <p className="leading-[160%] text-base-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum
            fugit soluta magnam, impedit laudantium repudiandae, pariatur, atque
            reiciendis saepe suscipit quo consectetur! Repudiandae, provident
            quo consequuntur quod consectetur eligendi numquam!
          </p>
          <nav>
            <ul className="flex gap-6 text-base-subtitle">
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
        </div>
      </section>
    </header>
  )
}
