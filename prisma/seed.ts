import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.rental.deleteMany();
  await prisma.game.deleteMany();

  await prisma.game.createMany({
    data: [
      {
        name: 'Catan',
        description: 'Construye asentamientos, ciudades y carreteras para dominar la isla de Catan. Un clásico de negociación y gestión de recursos.',
        minPlayers: 3,
        maxPlayers: 4,
        minAge: 10,
        playtime: 90,
        image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffaed?q=80&w=2000&auto=format&fit=crop',
        category: 'Estrategia',
        price: 5.0,
        stock: 2,
      },
      {
        name: 'Ticket to Ride',
        description: 'Construye tus rutas de tren a través de Norteamérica en esta aventura ferroviaria. Ideal para jugar con amigos y familia.',
        minPlayers: 2,
        maxPlayers: 5,
        minAge: 8,
        playtime: 60,
        image: 'https://images.unsplash.com/photo-1593814681464-eef5af2b0628?q=80&w=2000&auto=format&fit=crop',
        category: 'Familiar',
        price: 4.5,
        stock: 3,
      },
      {
        name: 'Dixit',
        description: 'Un juego de cartas donde la creatividad y la deducción son la clave. Usa hermosas ilustraciones para dar pistas sutiles.',
        minPlayers: 3,
        maxPlayers: 6,
        minAge: 8,
        playtime: 30,
        image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?q=80&w=2000&auto=format&fit=crop',
        category: 'Party',
        price: 3.5,
        stock: 1,
      },
      {
        name: 'Carcassonne',
        description: 'Construye el paisaje medieval colocando losetas y envía a tus seguidores para controlar ciudades, caminos y monasterios.',
        minPlayers: 2,
        maxPlayers: 5,
        minAge: 7,
        playtime: 45,
        image: 'https://images.unsplash.com/photo-1649955743419-74d6c4d7ecf3?q=80&w=2000&auto=format&fit=crop',
        category: 'Estrategia',
        price: 4.0,
        stock: 2,
      },
      {
        name: 'Virus!',
        description: '¡Enfréntate a la pandemia! Compite para ser el primero en aislar un cuerpo sano mientras infectas los órganos de tus rivales.',
        minPlayers: 2,
        maxPlayers: 6,
        minAge: 8,
        playtime: 20,
        image: 'https://images.unsplash.com/photo-1593631379413-5a034440c4cc?q=80&w=2000&auto=format&fit=crop',
        category: 'Cartas',
        price: 2.5,
        stock: 4,
      },
      {
        name: 'Exploding Kittens',
        description: 'Una versión gatuna de la ruleta rusa. Roba cartas hasta que alguien saca un gatito explosivo y pierde la partida.',
        minPlayers: 2,
        maxPlayers: 5,
        minAge: 7,
        playtime: 15,
        image: 'https://images.unsplash.com/photo-1606503153303-346cb46f33d7?q=80&w=2000&auto=format&fit=crop',
        category: 'Party',
        price: 3.0,
        stock: 2,
      },
      {
        name: 'Splendor',
        description: 'Conviértete en un rico mercader del Renacimiento. Recolecta gemas para adquirir minas y barcos para ganar prestigio.',
        minPlayers: 2,
        maxPlayers: 4,
        minAge: 10,
        playtime: 30,
        image: 'https://images.unsplash.com/photo-1638210350738-f71bb4af9bce?q=80&w=2000&auto=format&fit=crop',
        category: 'Estrategia',
        price: 4.0,
        stock: 1,
      },
      {
        name: 'Aventureros al Tren: Europa',
        description: 'Una versión independiente del aclamado juego de trenes, esta vez ambientado en los mapas y túneles de Europa.',
        minPlayers: 2,
        maxPlayers: 5,
        minAge: 8,
        playtime: 60,
        image: 'https://images.unsplash.com/photo-1593814681464-eef5af2b0628?q=80&w=2000&auto=format&fit=crop',
        category: 'Familiar',
        price: 5.0,
        stock: 2,
      },
      {
        name: 'Dobble',
        description: 'Juego de observación y reflejos rápidos. Encuentra el símbolo coincidente entre las cartas antes que los demás.',
        minPlayers: 2,
        maxPlayers: 8,
        minAge: 6,
        playtime: 15,
        image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f563?q=80&w=2000&auto=format&fit=crop',
        category: 'Cartas',
        price: 2.0,
        stock: 5,
      }
    ],
  })

  console.log('Base de datos inicializada con juegos de prueba ampliada.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
