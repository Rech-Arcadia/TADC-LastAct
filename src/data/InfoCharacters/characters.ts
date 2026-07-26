import PomniChar from '@/images/InfoCharacters/PomniChar.webp'
import PomniDoor from '@/images/InfoCharacters/PomniDoor.webp'
import JaxChar from '@/images/InfoCharacters/JaxChar.webp'
import JaxDoor from '@/images/InfoCharacters/JaxDoor.webp'
import RagathaChar from '@/images/InfoCharacters/RagathaChar.webp'
import RagathaDoor from '@/images/InfoCharacters/RagathaDoor.webp'
import KingerChar from '@/images/InfoCharacters/KingerChar.webp'
import KingerDoor from '@/images/InfoCharacters/KingerDoor.webp'
import ZoobleChar from '@/images/InfoCharacters/ZoobleChar.webp'
import ZoobleDoor from '@/images/InfoCharacters/ZoobleDoor.webp'
import GangleChar from '@/images/InfoCharacters/GangleChar.webp'
import GangleDoor from '@/images/InfoCharacters/GangleDoor.webp'

export type Character = {
  id: string
  name: string
  description: string
  image: string | null
  avatar: string | null
}

export const characters: [Character, ...Character[]] = [
  {
    id: 'pomni',
    name: 'Pomni',
    description:
      'Pomni supera sus miedos, se enfrenta a Caine y viaja a la mente de Jax. Descubre que todos son copias digitales y consuela a sus amigos en el circo.',
    image: PomniChar,
    avatar: PomniDoor,
  },
  {
    id: 'jax',
    name: 'Jax',
    description:
      'Jax convierte el circo en su juguete y a todos en el chiste. Detrás de la burla hay alguien que dejó de creer que salir de aquí sea posible.',
    image: JaxChar,
    avatar: JaxDoor,
  },
  {
    id: 'ragatha',
    name: 'Ragatha',
    description:
      'Ragatha sostiene al grupo cuando todo se rompe. Su optimismo es también su coraza: prefiere coser las grietas de los demás antes que mirar las suyas.',
    image: RagathaChar,
    avatar: RagathaDoor,
  },
  {
    id: 'kinger',
    name: 'Kinger',
    description:
      'Kinger lleva más tiempo dentro que nadie. Entre sus divagaciones se esconde la memoria más antigua del circo y la pista de lo que hubo antes.',
    image: KingerChar,
    avatar: KingerDoor,
  },
  {
    id: 'zooble',
    name: 'Zooble',
    description:
      'Zooble se niega a seguirle el juego a Caine: las aventuras le agotan y solo busca un rincón donde nada ni nadie decida qué forma debe tener.',
    image: ZoobleChar,
    avatar: ZoobleDoor,
  },
  {
    id: 'gangle',
    name: 'Gangle',
    description:
      'Gangle esconde su rostro tras una máscara de comedia que se agrieta a la mínima. Su fragilidad es lo más honesto que queda en el espectáculo.',
    image: GangleChar,
    avatar: GangleDoor,
  },
]
