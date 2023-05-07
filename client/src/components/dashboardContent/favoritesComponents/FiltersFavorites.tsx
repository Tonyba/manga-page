import Accordion from "@/components/accordion/Accordion";
import useFilters from "@/hooks/useFilters";
import { AuthContext } from "@/utils/context/AuthContext";
import { handlePush, initFilterState, selectStyles } from "@/utils/helpers";
import { FiltersType, OptionType } from "@/utils/types";
import { demography, genres, status, types } from "@/utils/valoresParaSelect";
import React, { FC, useContext } from "react";
import { default as ReactSelect } from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

type Props = {
  filters: FiltersType;
  setFilters: (filters: FiltersType) => void;
};

const FiltersFavorites: FC<Props> = ({ filters, setFilters }) => {
  const handleValue = (opt: OptionType) => {
    if (opt) {
      return opt;
    }

    return null;
  };

  return (
    <Accordion title="Filtros">
      <div className="pb-3">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <h3 className="mb-2 font-semibold">Tipos</h3>
            <ReactSelect
              closeMenuOnSelect={true}
              components={animatedComponents}
              options={types}
              value={handleValue(
                types.filter((f) => f.label === filters.type)[0]
              )}
              styles={selectStyles}
              placeholder="Seleccione un Tipo"
              onChange={(value: any) =>
                setFilters({ ...filters, type: value.label })
              }
            />
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Demografia</h3>
            <ReactSelect
              closeMenuOnSelect={true}
              components={animatedComponents}
              options={demography}
              value={handleValue(
                demography.filter((f) => f.label === filters.demography)[0]
              )}
              placeholder={"Seleccione una demografia"}
              styles={selectStyles}
              onChange={(value: any) =>
                setFilters({ ...filters, demography: value.label })
              }
            />
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Estado</h3>
            <ReactSelect
              closeMenuOnSelect={true}
              components={animatedComponents}
              options={status}
              placeholder={"Seleccione un estado"}
              value={handleValue(
                status.filter((f) => f.label === filters.status)[0]
              )}
              styles={selectStyles}
              onChange={(value: any) =>
                setFilters({ ...filters, status: value.label })
              }
            />
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Generos</h3>
            <ReactSelect
              closeMenuOnSelect={true}
              components={animatedComponents}
              options={genres}
              isMulti={true}
              value={genres.filter((g) => filters.genres.includes(g.label))}
              placeholder={"Seleccione generos"}
              styles={selectStyles}
              onChange={(value: any) =>
                setFilters({ ...filters, genres: handlePush(value) })
              }
            />
          </div>
        </div>
        <button
          className="bg-important rounded-md p-2 mt-4 font-medium"
          onClick={() => setFilters(initFilterState)}
        >
          Limpiar filtros
        </button>
      </div>
    </Accordion>
  );
};

export default FiltersFavorites;
