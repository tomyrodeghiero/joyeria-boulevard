import React from "react";
import { ABOUT_01, ABOUT_02 } from "@/utils/constants";

const Page = () => {
  return (
    <div className="flex flex-col text-black pt-5 lg:py-16 lg:px-40">
      <h1 className="text-2xl lg:text-center">Acerca de nosotros</h1>
      <h2 className="text-[1.1rem] lg:text-center mt-4 mb-5 lg:mb-10">
        ¿Quiénes somos y por qué hacemos lo que hacemos?
      </h2>
      <p className="text-[0.9rem] lg:text-base">
        Nuestro viaje comenzó en 1984, en la encantadora ciudad de Parque
        Patricios, Buenos Aires 🇦🇷. Desde el principio, nuestra misión ha sido
        ofrecer joyería de la más alta calidad, con un toque personal y único. A
        lo largo de los años, hemos tenido el privilegio de crecer junto a
        nuestra comunidad y hemos llegado a amar profundamente lo que hacemos.
      </p>
      <h3 className="text-2xl mt-8 mb-5">Nuestras tendencias ✨</h3>
      <img
        className="object-cover w-full rounded-lg h-full"
        src={ABOUT_01}
        alt="About 01"
      />
      <p className="mt-8 mb-5">
        En la joyería, las tendencias van y vienen, pero siempre nos esforzamos
        por estar al tanto de lo último y lo más grandioso. Nuestra selección
        siempre incluye piezas modernas y elegantes que reflejan lo último en
        moda y diseño. 💍
      </p>
      <div className="ml-4">
        <li>
          Contamos con una variedad de estilos para adaptarnos a cualquier gusto
          y ocasión.
        </li>
        <li>
          Desde piezas clásicas y elegantes hasta diseños modernos y audaces,
          tenemos algo para todos.
        </li>
      </div>
      <h3 className="text-2xl mt-8 mb-5">Actualidad</h3>
      <img
        className="object-cover w-full rounded-lg h-full"
        src={ABOUT_02}
        alt="About 02"
      />
      <p className="mt-8 mb-5">
        Hoy en día, continuamos creciendo y evolucionando, siempre con nuestros
        clientes en el corazón de lo que hacemos. Seguimos comprometidos con la
        calidad y el servicio, y nos enorgullece ser una parte querida de la
        comunidad de Río Cuarto. A medida que avanzamos hacia el futuro, nos
        emociona seguir ofreciendo a nuestros clientes hermosas piezas de
        joyería que pueden amar y apreciar por años. 💖
      </p>
    </div>
  );
};

export default Page;
