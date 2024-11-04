import React from 'react';
import Slider from "react-slick"; // Asegúrate de que esta línea esté presente
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Conocenos.css';
import Footer from '../assets/Footer';
import Header from '../assets/Header';
import Video from '../assets/video';
import InfoCard from './InfoCard';

const Conocenos = () => {

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 2,
    centerMode: true,
    centerPadding: "0px",
    variableWidth: false,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200, // Pantallas grandes
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "0px",
        }
      },
      {
        breakpoint: 768, // Tablets
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0px",
        }
      },
      {
        breakpoint: 480, // Móviles
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "00px",
          dots: false, // Opcionalmente oculta los puntos en pantallas pequeñas
        }
      }
    ]
  };



  return (
    <div className="bg-gradient-to-r from-teal-100 via-blue-100 to-green-100 min-h-screen" onContextMenu={(e) => e.preventDefault()}>
      <div className="next-module"><Header /></div>
      <div className="next-module" />
      <h1 className="text-5xl font-extrabold mb-4 animate-reveal" style={{ color: '#666666', fontWeight: '600', fontFamily: 'Poppins', fontSize: 45 }}>
        Conócenos
      </h1>
      <main className="main-carousel-container  mx-auto py-10">
        <div>
          <h1 className='center-textC' style={{ color: '#666666', fontWeight: '600', fontFamily: 'Poppins', fontSize: 30 }}>
            ¿Quiénes somos?
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', margin: '20px 0' }}>
            <Video/>
          </div>
        </div>
        <div className="next-module" />
        <h1 className='center-textC' style={{ color: '#666666', fontWeight: '900', fontFamily: 'Poppins', fontSize: 30 }}>Lideres del proyecto</h1>
        <Slider {...settings}>
          <InfoCard
            image="/imagenes/oscar.jpeg"
            name="Dr. Oscar Montiel Ross"
            title="Líder del proyecto"
            description="Actualmente es investigador del Centro de Investigación y Desarrollo de Tecnología Digital (CITEDI-IPN). Recibió el grado de Doctor en Ciencias de la Computación por la Universidad Autónoma de Baja California (UABC) en 2006, la Maestría en Ciencias de la Computación por el Instituto Tecnológico de Tijuana en el año 2000, la Maestría en Sistemas Digitales por el Instituto Politécnico Nacional (IPN) en 1999, y Licenciatura en Ciencias de la Ingeniería Eléctrica en Electrónica por la UABC en 1985, Ha publicado artículos, libros y capítulos de libros sobre computación cuántica, computación evolutiva, robótica móvil, lógica difusa mediativa, colonias de hormigas, sistemas difusos tipo 2 y sistemas integrados. Ha liderado 20 proyectos de investigación y participado en otros 20, la mayoría de ellos en el campo de la Inteligencia Computacional. Es miembro senior del Instituto de Ingenieros Eléctricos y Electrónicos, miembro de la Asociación Internacional de Ingenieros (IANG) y de la Fundación Mexicana para la Ciencia CONACYT (Consejo Nacional de Ciencia y Tecnología). Tiene experiencia editando y publicando libros. Es miembro del Consejo Editorial de la Revista Axioms, Editor Asociado de Sistemas Expertos con Aplicaciones, como Editor Invitado ha publicado números especiales para las revistas Advances in Fuzzy Systems, Computación y Sistemas, Axioms y Soft Computing. Recibió el Premio de Investigación en 2016 del IPN. Es Cofundador y Miembro Activo de la HAFSA (Asociación Hispanoamericana de Sistemas Difusos) y del Capítulo Mexicano de la Sociedad de Inteligencia Computacional (IEEE). Es miembro de la Academia de Ciencias de Baja California, México."
          />
          <InfoCard
            image="/imagenes/maria.jpg"
            name="Dra. María de los Ángeles Cosío León"
            title="Coordinadora técnica"
            description="Realizó su formación doctoral en la Universidad Autónoma de Baja California (MyDCI PNPC CONAHCyT) con la tesis 'Privacidad en la Ubicación de la Fuente de Datos', bajo la dirección del Dr. Juan Iván Nieto Hipólito, obteniendo el grado de Doctora en Ciencias con Mención Honorífica en diciembre de 2012. Obtuvo la maestría en la Universidad de Colima (PNPC CONACyT) con un proyecto de colaboración México-USA UC NEXUS-CICESE, desarrollando el algoritmo PANDORA para redes ad-hoc, bajo la dirección del Dr. Raúl Aquino Santos, recibiendo el grado en agosto de 2007. Además, cuenta con una licenciatura en Comercio Internacional (febrero de 2002, ESCA-SADE-Instituto Politécnico Nacional) y una en Ingeniería en Sistemas Computacionales (febrero de 1992, Instituto Tecnológico de Zacatecas). Colaboradora de la Universidad Politécnica de Pachuca como profesor investigador nivel C en la Dirección de Innovación, Investigación y Posgrado (DIIP), es parte de los núcleos académicos de la Maestría en Tecnologías de la Información y del Doctorado en Ciencias y Tecnologías Avanzadas, imparte clases de Inteligencia Artificial, Minería de Datos, Algoritmos y Proyecto de Tesis. Líder del cuerpo académico de Cómputo Suave y Analítica de Datos, el cual cuenta con un laboratorio especializado, cuenta con el reconocimiento SNII I y realiza colaboración con diversos centros de investigación, incluyendo CICESE, CITEDI Tijuana y CICATA, así como con la Universidad Autónoma de Baja California, Universidad de Colima, y Universidad Autónoma de Nuevo León, entre otras. Ha dirigido cuatro tesis doctorales en la Universidad Autónoma de Baja California (tres con reconocimiento SNII Candidato) y participó en comités doctorales en UPPachuca, CITEDI Tijuana y CICATA, Querétaro (SNII Candidato). Además, ha dirigido y codirigido cuatro tesis de maestría (tres con grado de doctor) y ha formado parte de comités de tesis de maestría en UPPachuca. Ha efectuado estancias de investigación y capacitación en el HUAWEI International Training Center en Hangzhou, China, en el área de Inteligencia Artificial, específicamente en modelos LLM y Transformers (mayo de 2024), obteniendo la certificación HCIA-AI por HUAWEI, así mismo ha cursado un diplomado en inteligencia artificial aplicada en IPICyT y ha laborado en TU-Darmstadt DEEDS Lab en Alemania y en la Universidad Politécnica de Cataluña, España, desarrollando procesos de privacidad en sistemas embebidos y el algoritmo metaheurístico ACO para proveer privacidad en la transmisión de datos. Actualmente, se encuentra realizando el proyecto estrella en colaboración con CITEDI Tijuana integrando algoritmos clásicos y cuánticos de Inteligencia Artificial y tecnologías de blockchain, especialmente Hyperledger Fabric, aplicado al área médica, en el cual, también trabajan cinco estudiantes de las ingenierías de software y biomédica"
          />
          <InfoCard
            image="/imagenes/anabel.jpg"
            name="Dra. Anabel Martínez Vargas"
            title="Coordinadora Administrativa"
            description="Realizó estudios de Ingeniería en Sistemas Computacionales en el Instituto Tecnológico de San Luis Potosí, México. Tiene Maestría en Computación con especialidad en Redes y Conectividad por la Universidad de Colima, México. Es Doctora en Ciencias por la Universidad Autónoma de Baja California Campus Mexicali, México. Realizó una estancia posdoctoral en el Centro de Investigación y Desarrollo de Tecnología Digital del Instituto Politécnico Nacional (CITEDI-IPN) en Tijuana, México. Recientemente, realizó un diplomado en Inteligencia Artificial Aplicada en el IPICYT y Pertenece al Sistema Nacional de Investigadores (SNI) de CONAHCYT en el nivel 1. Es miembro de la Academia Mexicana de Computación (AMEXCOMP), la Sociedad Mexicana de Investigación de Operaciones (SMIO) y la Red Temática de Inteligencia Computacional Aplicada (RedICA) de CONAHCYT. Sus líneas de interés son algoritmos bio-inspirados y optimización. Actualmente es Profesora Investigadora Titular “C” en la Universidad Politécnica de Pachuca. Pertenece a los núcleos básicos de la Maestría en TIC y del Doctorado en Ciencias y Tecnologías Avanzadas. Es miembro del Cuerpo Académico Cómputo Suave y Analítica de Datos."
          />
          <InfoCard
            image="/imagenes/tania.jpg"
            name="Dra. Tania Inés Aparicio Monroy"
            title="Área Médica"
            description="Nacida en Poza Rica de Hidalgo Veracruz en 1969, recibiendo la educación básica en el Estado de Puebla y la educación superior en el Estado de Hidalgo, es graduada como Médico cirujano por la Universidad Autónoma del Estado de Hidalgo en 1994. Ha tenido la oportunidad de ejercer la medicina asistencial y quirúrgica desde la iniciativa privada y pública. Inició desde 1996 el ejercer de la docencia en el nivel de educación medio superior, impartiendo asignaturas de ciencias de la salud. Posteriormente en el año 2000 laboró en la Secretaría de Salud del Estado de Tabasco, en la Dirección de Atención Médica como supervisor médico en área normativa y colaboró de manera interinstitucional con instituciones filantrópicas como “I Care Internacional y el grupo Rotario Tabasco”, fue nombrada miembro Honorario por organizar campañas en pro de la salud visual. Desde el año 2005 radica en la ciudad de Pachuca de Soto Hidalgo, colaboró en el Hospital Obstétrico donde junto con el Médico especialista en Genética Rogelio Edmundo Méndez Llaca, para la creación del Departamento de Genética con un proyecto llamado “Clínica de cuidados preconcepciones”. A partir del año 2007 se desempeñó como docente de tiempo completo en la Universidad Politécnica de Pachuca, donde tuve la oportunidad de dar inicio a la inserción de la Lic. en Terapia Física, colaborando con el diseño del mapa curricular, así como la creación y revisión de los temarios de asignatura, así mismo recibió el curso de Equinoterapia dentro de la misma Institución educativa. En el año 2008 desarrolló un proyecto para la apertura de la Clínica Universitaria de Rehabilitación y hasta la actualidad funciona otorgando servicio asistencial a la comunidad de Zempoala, Hidalgo y lugares de afluencia de pacientes con diferentes tipos de discapacidad (motriz, visual, auditiva, de lenguaje o cognitiva), incluyendo a todos los grupos etarios. Como docente de tiempo completo he impartido clases en la Lic. de Terapia Física, Lic. En Médico Cirujano y la Ingeniería Biomédica. Como Médico cirujano las asignaturas que ha tenido la oportunidad de impartir son, anatomía del sistema musculo esquelético, anatomía de aparatos y sistemas, neuroanatomía, fisiología, neurofisiología, atención pre hospitalaria, farmacología, Imagenología, Histología, Patología, neuropatología, salud Publica, salud Laboral, legislación en salud. En el año 2019, estuvo a cargo del Servicio de Atención y Promoción a la Salud. Ha organizado Ferias de la Salud para los distintos programas educativos, atendiendo una población de cinco mil estudiantes, con enfoque en la medicina preventiva y promoción a la salud principalmente, así como medicina asistencial de urgencias y dando seguimiento a los diferentes programas de salud, como Diabetes Mellitus, Hipertensión, vacunación control de natalidad mediante uso de los diferentes métodos anticonceptivos. Ha recibido clases de dibujo y pintura por parte de la Casa de Cultura de Playas de Tijuana, modalidad virtual, como una estrategia de enseñanza a sus estudiantes en cuanto a la morfología en la anatomía macroscópica y microscópica, que al dar la clase vayan dibujando y haciendo trazos de células, tejidos, y músculos y órganos que componen al cuerpo humano. También ha participado con la Sociedad Mexicana de Histología y de Anatomía, con el objetivo de mantenerse a la vanguardia en los avances en cuanto a estas asignaturas y las estrategias de enseñanza. Realiza apoyos de manera filantrópica a la Fundación Hidalguense de Craneosinostosis México Asociación Civil, elaborando propuestas que puedan ser presentadas ante el Congreso del Estado, en la Cámara de Diputados a fin de mejorar el diagnóstico temprano en este tipo de pacientes y algunas otras enfermedades genéticas que conforman el grupo de las llamadas enfermedades raras. Actualmente recibe de manera virtual un Diplomado por parte del Instituto Mexicano de la Propiedad Industrial a través de la Universidad Autónoma del Estado de México."
          />
          <InfoCard
            image="/imagenes/gener.jpeg"
            name="Dr. Gener José Avilés Rodríguez"
            title="Asesor Clínico"
            description="Médico por la Universidad de Montemorelos, Nuevo León. Maestro y Doctor en Ciencias por la Universidad Autónoma de Baja California (UABC) con acentuación en analítica de datos y estadística computacional. Miembro del Sistema Nacional de Investigadoras e Investigadores y de la Academia Jóven de México. Profesor Investigador de tiempo completo en la Escuela de Ciencias de la Salud de la UABC campus Enesenada. Líder del grupo de Medicina Computacional y colaborador con el Laboratorio de Telemática en la Facultad de Ingeniería, Arquitectura y Diseño de la misma Universidad. Sus intereses en investigación están enfocados actualmente en el uso de herramientas de aprendizaje automatizado, análisis topológico de datos e inteligencia artificial para la caracterización de individuos y poblaciones en el continuo salud-enfermedad."
          />
        </Slider>
        <div className="next-module" />
        <h1 className='center-textC' style={{ color: '#666666', fontWeight: '600', fontFamily: 'Poppins', fontSize: 30 }}>Nuestro equipo</h1>
        <Slider {...settings}>
          <InfoCard
            image="/imagenes/cesar.jpeg"
            name="Cesar Andres Ortega Herrera"
            title="Ingenieria en Software"
            description="Actualmente es investigador del Centro de Investigación y Desarrollo de Tecnología Digital (CITEDI-IPN). Recibió el grado de Doctor en Ciencias de la Computación por la Universidad Autónoma de Baja California (UABC) en 2006, la Maestría en Ciencias de la Computación por el Instituto Tecnológico de Tijuana en el año 2000, la Maestría en Sistemas Digitales por el Instituto Politécnico Nacional (IPN) en 1999, y Licenciatura en Ciencias de la Ingeniería Eléctrica en Electrónica por la UABC en 1985, Ha publicado artículos, libros y capítulos de libros sobre computación cuántica, computación evolutiva, robótica móvil, lógica difusa mediativa, colonias de hormigas, sistemas difusos tipo 2 y sistemas integrados. Ha liderado 20 proyectos de investigación y participado en otros 20, la mayoría de ellos en el campo de la Inteligencia Computacional. Es miembro senior del Instituto de Ingenieros Eléctricos y Electrónicos, miembro de la Asociación Internacional de Ingenieros (IANG) y de la Fundación Mexicana para la Ciencia CONACYT (Consejo Nacional de Ciencia y Tecnología). Tiene experiencia editando y publicando libros. Es miembro del Consejo Editorial de la Revista Axioms, Editor Asociado de Sistemas Expertos con Aplicaciones, como Editor Invitado ha publicado números especiales para las revistas Advances in Fuzzy Systems, Computación y Sistemas, Axioms y Soft Computing. Recibió el Premio de Investigación en 2016 del IPN. Es Cofundador y Miembro Activo de la HAFSA (Asociación Hispanoamericana de Sistemas Difusos) y del Capítulo Mexicano de la Sociedad de Inteligencia Computacional (IEEE). Es miembro de la Academia de Ciencias de Baja California, México."
          />
          <InfoCard
            image="/imagenes/dieter.jpeg"
            name="Dieter Valderrabano Garcia"
            title="Ingenieria en Biomedica"
            description="Realizó su formación doctoral en la Universidad Autónoma de Baja California (MyDCI PNPC CONAHCyT) con la tesis 'Privacidad en la Ubicación de la Fuente de Datos', bajo la dirección del Dr. Juan Iván Nieto Hipólito, obteniendo el grado de Doctora en Ciencias con Mención Honorífica en diciembre de 2012. Obtuvo la maestría en la Universidad de Colima (PNPC CONACyT) con un proyecto de colaboración México-USA UC NEXUS-CICESE, desarrollando el algoritmo PANDORA para redes ad-hoc, bajo la dirección del Dr. Raúl Aquino Santos, recibiendo el grado en agosto de 2007. Además, cuenta con una licenciatura en Comercio Internacional (febrero de 2002, ESCA-SADE-Instituto Politécnico Nacional) y una en Ingeniería en Sistemas Computacionales (febrero de 1992, Instituto Tecnológico de Zacatecas). Colaboradora de la Universidad Politécnica de Pachuca como profesor investigador nivel C en la Dirección de Innovación, Investigación y Posgrado (DIIP), es parte de los núcleos académicos de la Maestría en Tecnologías de la Información y del Doctorado en Ciencias y Tecnologías Avanzadas, imparte clases de Inteligencia Artificial, Minería de Datos, Algoritmos y Proyecto de Tesis. Líder del cuerpo académico de Cómputo Suave y Analítica de Datos, el cual cuenta con un laboratorio especializado, cuenta con el reconocimiento SNII I y realiza colaboración con diversos centros de investigación, incluyendo CICESE, CITEDI Tijuana y CICATA, así como con la Universidad Autónoma de Baja California, Universidad de Colima, y Universidad Autónoma de Nuevo León, entre otras. Ha dirigido cuatro tesis doctorales en la Universidad Autónoma de Baja California (tres con reconocimiento SNII Candidato) y participó en comités doctorales en UPPachuca, CITEDI Tijuana y CICATA, Querétaro (SNII Candidato). Además, ha dirigido y codirigido cuatro tesis de maestría (tres con grado de doctor) y ha formado parte de comités de tesis de maestría en UPPachuca. Ha efectuado estancias de investigación y capacitación en el HUAWEI International Training Center en Hangzhou, China, en el área de Inteligencia Artificial, específicamente en modelos LLM y Transformers (mayo de 2024), obteniendo la certificación HCIA-AI por HUAWEI, así mismo ha cursado un diplomado en inteligencia artificial aplicada en IPICyT y ha laborado en TU-Darmstadt DEEDS Lab en Alemania y en la Universidad Politécnica de Cataluña, España, desarrollando procesos de privacidad en sistemas embebidos y el algoritmo metaheurístico ACO para proveer privacidad en la transmisión de datos. Actualmente, se encuentra realizando el proyecto estrella en colaboración con CITEDI Tijuana integrando algoritmos clásicos y cuánticos de Inteligencia Artificial y tecnologías de blockchain, especialmente Hyperledger Fabric, aplicado al área médica, en el cual, también trabajan cinco estudiantes de las ingenierías de software y biomédica"
          />
          <InfoCard
            image="/imagenes/rodrigo.jpeg"
            name="Ing. Rodrigo"
            title="Ingenieria en Telematica"
            description="" />
          <InfoCard
            image="/imagenes/miguel.jpeg"
            name="Miguel Ángel Butrón Gómez"
            title="Ingenieria en Biomedica"
            description="" />
          <InfoCard
            image="/imagenes/gener.jpeg"
            name="Aris"
            title="Ingenieria en Biomedica"
            description="" />
        </Slider>
      </main>
      <div className="next-module" />

      <Footer />
    </div>
  );
};

export default Conocenos;
