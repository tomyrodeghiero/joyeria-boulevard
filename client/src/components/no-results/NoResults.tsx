import { NO_RESULTS_ICON } from "@/utils/constants";

export const NoResults = ({ onEditSearch }: any) => (
  <div className="flex flex-col justify-center items-center">
    <img className="h-60" src={NO_RESULTS_ICON} alt={"Without results"} />
    <p className="font-medium text-[1.15rem] max-w-[30rem] text-center">
      No se encontraron productos que coincidan con los criterios de búsqueda.
    </p>
    <p className="mt-4 text-[1.05rem] text-center">
      Por favor, intenta recortar o reformular su búsqueda 🔎
    </p>
    <button
      onClick={onEditSearch}
      className="bg-white border py-2 text-[0.85rem] font-medium px-8 border-black rounded mt-7 uppercase"
    >
      Editar Búsqueda
    </button>
  </div>
);
