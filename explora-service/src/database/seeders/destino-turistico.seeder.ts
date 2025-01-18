import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DestinoTuristico } from '../../destino-turistico/entities/destino-turistico.entity';
import { Ubicacion } from '../../destino-turistico/entities/ubicacion';
import { Imagen } from '../../destino-turistico/entities/imagen';
import { Resena } from '../../resena/entities/resena.entity';

@Injectable()
export class DestinoTuristicoSeeder {
  constructor(
    @InjectRepository(DestinoTuristico)
    private destinoRepository: Repository<DestinoTuristico>,
    @InjectRepository(Ubicacion)
    private ubicacionRepository: Repository<Ubicacion>,
    @InjectRepository(Imagen)
    private imagenRepository: Repository<Imagen>,
    @InjectRepository(Resena)
    private resenaRepository: Repository<Resena>,
  ) {}

  async seed() {
    const destinos = [
      {
        nombre: 'Salar de Uyuni',
        descripcion: 'El Salar de Uyuni (Salar de Uyuni), ubicado a unos 3800 metros sobre el nivel del mar en medio de los Andes en el suroeste de Bolivia, es el salar más grande del mundo . La sal se depositó aquí después de que un océano interior prehistórico se secara, dejando atrás un desierto de sal blanca cegadora de casi 11000 kilómetros cuadrados (aproximadamente 4086 millas cuadradas) de hasta 120 metros de profundidad. El Salar de Uyuni es la atracción turística más popular en Bolivia , una que debe verse para creerse.',
        departamento: 'La Paz',
        puntoSalida: 'Terminal de Buses La Paz',
        imagenesUrls: [
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736802583/destinos-turisticos/o8seh6oxdhzqkxcgdeca.jpg',
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736802583/destinos-turisticos/mjazqutut5ghkpudolnf.jpg',
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736802583/destinos-turisticos/gmoepfva4oicrn9b2aqn.jpg',
        ],
        calificacion: 4,
        costoAprox: 500.00,
        ubicacion: {
          nombreUbicacion: 'Humedal en Valle de Rocas',
          latitud: -19.812784,
          longitud: -67.712792,
          tipo: 'Salar - Laguna'
        },
        resenas: [
          {
            calificacion: 5,
            comentario: 'Una experiencia única, las islas flotantes son impresionantes',
            nombrePersona: 'Carlos Mamani'
          },
          {
            calificacion: 4,
            comentario: 'Hermoso lugar, clima frío pero vale la pena',
            nombrePersona: 'María Quispe'
          }
        ]
      },
      {
        nombre: 'Isla del Sol',
        descripcion: 'La Isla del Sol (Isla del Sol) es una isla boliviana en el lago Titicaca. Una de las mejores formas de comprender la magnitud del Lago Titicaca es tomar un viaje en barco desde Copacabana. Aquí descubrirás antiguas ruinas incas diseminadas por toda la isla, así como aldeanos aymaras ocupados cultivando las terrazas y cuidando los sitios sagrados . La isla está atravesada por rutas de senderismo y los sitios de los Incas como Pilko Kaina, con su palacio en ruinas. Caminar de un lado a otro de la isla es una experiencia catártica que permitirá a los viajeros presenciar algunos de los paisajes más impresionantes de Bolivia . En la cercana aldea de Yumani, en el lado sur de la isla, la Escalera del Inca conduce a la legendaria Fuente de la Juventud o Tres Aguas. ',
        departamento: 'La Paz',
        puntoSalida: 'Cementerio - La Paz',
        imagenesUrls: [
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736802924/destinos-turisticos/tcfwpr2a25cborjol2fj.jpg',
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736802924/destinos-turisticos/xxj7vzxccj0onewfdukx.jpg',
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736802924/destinos-turisticos/kgktod8hm1syvdmkkplu.jpg',
        ],
        calificacion: 3,
        costoAprox: 800.00,
        ubicacion: {
          nombreUbicacion: 'Copacabana La Paz',
          latitud: -16.018199,
          longitud: -69.174409,
          tipo: 'Islas - Lago'
        },
        resenas: [
          {
            calificacion: 5,
            comentario: 'A las 13hrs aprox ya estábamos de vuelta a Yumani y preguntando en boletería, un boliviano con un barco buscaba gente...',
            nombrePersona: 'Justina Mamani'
          },
          {
            calificacion: 4,
            comentario: 'En el lado sur hay varios lugares donde comer, en el norte también hay servicios de restaurante con precios razonables.',
            nombrePersona: 'Mariela Chuquimia'
          }
        ]
      },
      {
        nombre: 'Valle de la Luna',
        descripcion: 'El Valle de la Luna se encuentra a unos 10 kilómetros del centro de La Paz. Consiste en un área donde la erosión ha creado un paisaje lunar. Hay senderos estrechos para caminar en el valle y puedes tomar fotos fantásticas. Un viaje al Valle de la Luna es una gran excursión de un día. Tenga cuidado ya que el suelo es blando y se desprende fácilmente. Haga un picnic y pase un rato disfrutando de una buena caminata.',
        departamento: 'La Paz',
        puntoSalida: 'Plaza del estudiante - La Paz',
        imagenesUrls: [
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736803557/destinos-turisticos/d3zk147birzs4dp8biv1.jpg',
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736803557/destinos-turisticos/pzysgqfpf9ajjutf6kna.jpg',
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736803558/destinos-turisticos/nmz1pqohtfg7jxkqdhxd.jpg',
        ],
        calificacion: 4,
        costoAprox: 100.00,
        ubicacion: {
          nombreUbicacion: 'Mallasilla - La Paz',
          latitud: -16.567457,
          longitud: -68.093908,
          tipo: 'Valle - Campo'
        },
        resenas: [
          {
            calificacion: 4,
            comentario: 'Es un lugar con vista fuera de este mundo, no por nada le dicen Valle de la Luna, que dicho sea de paso, no tiene nada de valle, las formaciones rocosas nos dan la apariencia de estar en otro planeta y sólo nos falta ver a otros terrícolas paseando por sus caminos y puentes. No olvidar este paseo por cuenta propia o en tour, con mi internet me documenté de qué era tal lugar, tomé un colectivo que me dejó en el lugar y a pasear',
          },
          {
            calificacion: 3,
            comentario: 'Lo que más me gustó: Las formaciones rocosas: Son realmente impresionantes y únicas en el mundo. Hay hoodoos, pináculos, torres y otras formas que parecen sacadas de una película de ciencia ficción. Los colores: Los diferentes tipos de rocas dan al valle una variedad de colores, desde el marrón rojizo hasta el amarillo ocre.',
            nombrePersona: 'Miguel Vargas'
          }
        ]
      },
      {
        nombre: 'Plaza 24 de Septiembre',
        descripcion: 'La Plaza 24 de septiembre es el espacio central de la ciudad, enmarcada por casonas con portales y la Catedral. Constituye un espacio para el esparcimiento con amplios andadores y palmeras que le dan ese aspecto de tropical característico del oriente boliviano. Una escultura es el ornamento destacado y se rinde homenaje al héroe insurgente Ignacio Warnes. Se percibe un ambiente de provincia y armonía, inclusive existen mesas donde en la tarde ciudadanos disfrutan del aire fresco y de jugar ajedrez.',
        departamento: 'Santa Cruz',
        puntoSalida: 'Terminal de buses - Santa Cruz',
        imagenesUrls: [
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736804187/destinos-turisticos/q2zcv2obufjynfbykbd8.jpg',
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736804187/destinos-turisticos/lfsdvsez2shxarusld5v.jpg',
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736804187/destinos-turisticos/hlf5au29f909hmkxboyz.jpg',
        ],
        calificacion: 3,
        costoAprox: 80.00,
        ubicacion: {
          nombreUbicacion: 'Plaza Santa Cruz - La Paz',
          latitud: -17.783336,
          longitud: -63.182118,
          tipo: 'Plaza - Iglesia'
        },
        resenas: [
          {
            calificacion: 3,
            comentario: 'La plaza es muy encantadora y su gente muy cordial, debes tomar el cafésito que te venden unos compás ahi, están caliente',
            nombrePersona: 'Freddy Pinto'
          },
          {
            calificacion: 4,
            comentario: 'El paseo tranquilo de la gente , los Señores , que venden cafe , las caseritas ofreciendo productos tipicos , por los alrededores y el mercado cercano , con puestos callejeros para comer excelentes lomitos y demas variedades , zumos naturales al momento , coquitos , etc',
            nombrePersona: 'Andrea Gutierrez'
          },
          {
            calificacion: 3,
            comentario: 'hermosa plaza con sol..sombra..en el corazón de Santa Cruz..arquitectura antigua..parte del centro viejo de la ciudad..muy emblematica',
          }
        ]
      },
      {
        nombre: 'Mercado de Las Brujas',
        descripcion: 'El mercado de las Brujas es un lugar muy peculiar. Existen muchos comercios de lado y lado de la calle con sus exhibiciones muy coloridas. En mi caso, las personas con las que hablé en varios de los comercios, son muy agradables. Te explican el porqué le llaman el mercado de las Brujas, me hablaron de los rituales de la Pachamama, el significado y muchas cosas que son muy de la cultura y costumbres bolivianas. En muchos de los locales podrás conseguir cualquier cantidad de "pócimas", botellas con líquidos para rituales, incienso, mirra, bolsas con productos hechos en azúcar y hasta fetos de llamas (animal originario de la zona andina) ',
        departamento: 'La Paz',
        puntoSalida: 'Plaza San Fransisco - La Paz',
        imagenesUrls: [
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736805041/destinos-turisticos/fd173bnakuln9whrvnwt.jpg',
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736805041/destinos-turisticos/w90xzatlel3ztmdo9g6f.jpg',
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736805041/destinos-turisticos/al7cyl22tzzjyhmcgcbl.jpg',
        ],
        calificacion: 5,
        costoAprox: 350.00,
        ubicacion: {
          nombreUbicacion: 'Mercado Centro - La Paz',
          latitud: -16.496156,
          longitud: -68.138900,
          tipo: 'Culturas - Mercado'
        },
        resenas: [
          {
            calificacion: 4,
            comentario: 'En pleno centro de la paz se encuentran esta calles de artesanias, arte, esoterismo y ofrendas de la cultura boliviana.',
            nombrePersona: 'Sebastian Julian'
          },
          {
            calificacion: 5,
            comentario: 'Este mercado de calles seguidas, esta muy cerca a la Catedral de San Francisco y sus almacenes hace que sean calles muy coloridas y agradables. El trafico es lo único malo, pero es normal en La Paz. Se consiguen artesanías de todo Bolivia, pero cuidado con las imitaciones chinas que venden en muchos sitios.',
          },
          {
            calificacion: 3,
            comentario: 'La calle de la brujas es excelente puedes comprar cualquier tipo de detalles para tu familia desde los 5 bolivianos en adelante la verdad conocer la cultura es importante',
          }
        ]
      },
      {
        nombre: 'Tiwanaku y Puma Punku',
        descripcion: 'El yacimiento arqueológico de Tiwanaku, anterior incluso a los incas y declarado Patrimonio de la UNESCO, arroja luz sobre una antigua civilización perdida en el tiempo. Sin embargo, al visitarla por su cuenta, se perdería la importancia histórica del lugar. Esta excursión comenzará con la recogida en su hotel de La Paz y la exploración con su guía. Obtendrá valiosa información sobre el significado de reliquias como la Puerta del Sol, el templo Kalasasaya y el complejo de Puma Punku.',
        departamento: 'La Paz',
        puntoSalida: 'Plaza San Fransisco - La Paz',
        imagenesUrls: [
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736805668/destinos-turisticos/ckeet0nubwe8hgpb4ubz.jpg',
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736805668/destinos-turisticos/hjpugrpdkgxxwjnzce5y.jpg',
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736805667/destinos-turisticos/lj4ekqwvrux9gjx28csg.jpg',
        ],
        calificacion: 5,
        costoAprox: 1000.00,
        ubicacion: {
          nombreUbicacion: 'Provincia Ingavi - La Paz',
          latitud: -16.552753,
          longitud: -68.678048,
          tipo: 'Museo - Arqueologia'
        },
        resenas: [
          {
            calificacion: 4,
            comentario: 'Excelente tour, visitmos un lugar maravilloso, muy bonito realmente Leo, el guía, es un genio, se notaba que sabía mucho del tema y que lo hacía con placer La comida en el restaurante exquisita Recomiendo muchísimo esta agencia Saludos',
            nombrePersona: 'Jorge Jimenez'
          },
          {
            calificacion: 2,
            comentario: 'Te llevan a dos museos y a los sitios de Tiawanaku y Puma Punku, te proveen de un almuerzo muy bueno. La cosa es que el almuerzo dura más que las visitas a los sitios arqueológicos. Está un poco más de tiempo en Tiawanaku, pero en Pumapunku no llegué a caminar 100 mts que ya estábamos volviendo. Si no te interesa mucho el sitio está bien por el precio, pero si realmente querés saber y observar profundamente, no contrates un tour, andá por tu cuenta.',
          },
          {
            calificacion: 3,
            comentario: 'Horrible experiencia. Nos metieron en una vieja camioneta Toyota. Éramos 15 personas en esta pequeña camioneta (no caben más de 8 personas cómodamente). Además, el grupo era una mezcla de español e inglés, por lo que la guía necesitaba cambiar constantemente, lo cual es difícil de seguir. Volvería a Tiwanaku pero con diferente proveedor. ¡El sitio es un recuerdo increíble y duradero!',
            nombrePersona: 'Sergio Aruquipa'
          }
        ]
      },
      {
        nombre: 'Valle de Las Ánimas',
        descripcion: 'Sumérgete en un mundo de maravillas naturales, riqueza cultural y paisajes impresionantes con nuestro tour de medio día meticulosamente diseñado en La Paz. Descubra gemas ocultas y lugares emblemáticos que harán que su visita sea realmente inolvidable. Explora el místico Valle de las Ánimas y pasea por el paisaje lunar del Valle de la Luna, donde antiguas formaciones rocosas cautivarán tu imaginación.',
        departamento: 'La Paz',
        puntoSalida: 'Puente Calacoto - La Paz',
        imagenesUrls: [
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736806388/destinos-turisticos/pxhoeacnbfvgikoazgtr.jpg',
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736806388/destinos-turisticos/uqihx1rd6jrgg21yqpea.jpg',
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736806387/destinos-turisticos/n16ncunq8cvzzaobcvlx.jpg',
        ],
        calificacion: 3,
        costoAprox: 250.00,
        ubicacion: {
          nombreUbicacion: 'Zona Sur - La Paz',
          latitud: -16.535236,
          longitud: -68.022110,
          tipo: 'Valle - Caminatas - Paisaje'
        },
        resenas: [
          {
            calificacion: 5,
            comentario: 'Lovely tour guide, very knowledgable guy and amazing views and all round awesome experience! We covered loads of things in a short time, so perfect for anyone whos in a rush to see everything they can!',
            nombrePersona: 'Roberto Guzman'
          },
          {
            calificacion: 3,
            comentario: 'Very interesting rock formations and worthwhile to visit. You could get here by yourself but I believe its worthwhile to go with a guide.',
            nombrePersona: 'Marisol Gonzales'
          },
          {
            calificacion: 5,
            comentario: 'The best tour in La Paz. Valle de las Animas has a unique view and the guides attention makes all the difference. A good option for those who are not yet used to the altitude (I went on my first day in the city).',
            nombrePersona: 'Jhon Perez'
          }
        ]
      },
      {
        nombre: 'Cristo de la Concordia',
        descripcion: 'El Cristo de la Concordia es una estatua monumental de Jesucristo, ubicada sobre el cerro de San Pedro en la ciudad de Cochabamba, Bolivia, a una altura de 265 m sobre la ciudad. La estatua mide 34,20 m de altura, sobre un pedestal de 6,24 m, con una altura total de 40,44 m. La estatua es ligeramente más pequeña que la estatua de Estatua de Cristo Rey (Świebodzin), 36 m, contando los 2 m de la corona, y es más alta que la estatua de Cristo Rey en Cali (28 m),',
        departamento: 'Cochabamba',
        puntoSalida: 'Terminal de Buses - Cochabamba',
        imagenesUrls: [
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736811173/destinos-turisticos/jrkvwbpsqihklipstt9v.jpg',
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736811173/destinos-turisticos/wfhrnrqsdahyejxxzpuo.jpg',
          'https://res.cloudinary.com/djvwwfvba/image/upload/v1736811173/destinos-turisticos/catvjb231divxoldklh0.jpg',
        ],
        calificacion: 4,
        costoAprox: 479.00,
        ubicacion: {
          nombreUbicacion: 'Cerro de San Pedro - Cochabamba',
          latitud: -17.384394,
          longitud: -66.134967,
          tipo: 'Monumento - Paisaje'
        },
        resenas: [
          {
            calificacion: 5,
            comentario: 'Subì en telesférico y bvalio la pena, las vistas increibles, la estatua imponente. Vale la pena, se puede subir y bajar a pie sin cargo.',
            nombrePersona: 'Sofia Guzman Guitierrez'
          },
          {
            calificacion: 4,
            comentario: 'Preciosa vista, un nivel. Normal de gente... Hace falta un restaurant o cafetería para disfrutar la vista con un buen cafe',
            nombrePersona: 'Limber Vazquez'
          },
          {
            calificacion: 5,
            comentario: 'Cada que puedo subo a pie por los escalones, no solo por deporte y ejercitarme si lo tambien por los avistamientos que puede uno observar a diferentes alturas de la montaña. El camino es seguro aunque es preferible ir durante el día. ',
            nombrePersona: 'Paola Alarcon'
          }
        ]
      },
    ];

    for (const destinoData of destinos) {
      const ubicacion = this.ubicacionRepository.create(destinoData.ubicacion);
      await this.ubicacionRepository.save(ubicacion);

      const destino = this.destinoRepository.create({
        nombre: destinoData.nombre,
        descripcion: destinoData.descripcion,
        departamento: destinoData.departamento,
        puntoSalida: destinoData.puntoSalida,
        calificacion: destinoData.calificacion,
        costoAprox: destinoData.costoAprox,
        ubicacion: ubicacion,
      });
      await this.destinoRepository.save(destino);

      const imagenes = destinoData.imagenesUrls.map(url => 
        this.imagenRepository.create({
          url,
          destino,
        })
      );
      await this.imagenRepository.save(imagenes);

      // Create resenas
      const resenas = destinoData.resenas.map(resena =>
        this.resenaRepository.create({
          ...resena,
          destino,
        })
      );
      await this.resenaRepository.save(resenas);
    }
  }
}
