import Accordion from "@/components/accordion/Accordion";
import { INIT_FILTER_STATE, SELECT_STYLES } from "@/utils/constants";
import { handlePush } from "@/utils/helpers";

import { FiltersType } from "@/utils/types";
import { demography, genres, status, types } from "@/utils/valoresParaSelect";
import React, { FC, useRef } from "react";
import { default as ReactSelect } from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

type Props = {
  filters: FiltersType;
  setFilters: (filters: FiltersType) => void;
};

const FilterContent: FC<Props> = ({ filters, setFilters }) => {
  const typeRef = useRef<any>();
  const demoRef = useRef<any>();
  const statusRef = useRef<any>();
  const genresRef = useRef<any>();

  const clearSelects = () => {
    typeRef?.current?.clearValue();
    demoRef?.current?.clearValue();
    statusRef?.current?.clearValue();
    genresRef?.current?.clearValue();
    setFilters(INIT_FILTER_STATE);
  };

  return (
    <Accordion title="Filtros">
      <div className="pb-3 z-20 relative">
        <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-4">
          <div>
            <h3 className="mb-2 font-semibold">Tipos</h3>
            <ReactSelect
              ref={(ref) => {
                typeRef.current = ref;
              }}
              closeMenuOnSelect={true}
              components={animatedComponents}
              options={types}
              styles={SELECT_STYLES}
              placeholder="Seleccione un Tipo"
              onChange={(value: any) => {
                setFilters({ ...filters, type: value?.label });
              }}
            />
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Demografia</h3>
            <ReactSelect
              ref={(ref) => {
                demoRef.current = ref;
              }}
              closeMenuOnSelect={true}
              components={animatedComponents}
              options={demography}
              placeholder={"Seleccione una demografia"}
              styles={SELECT_STYLES}
              onChange={(value: any) =>
                setFilters({ ...filters, demography: value?.label })
              }
            />
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Estado</h3>
            <ReactSelect
              ref={(ref) => {
                statusRef.current = ref;
              }}
              closeMenuOnSelect={true}
              components={animatedComponents}
              options={status}
              placeholder={"Seleccione un estado"}
              styles={SELECT_STYLES}
              onChange={(value: any) =>
                setFilters({ ...filters, status: value?.label })
              }
            />
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Generos</h3>
            <ReactSelect
              ref={(ref) => {
                genresRef.current = ref;
              }}
              closeMenuOnSelect={true}
              components={animatedComponents}
              options={genres}
              isMulti={true}
              placeholder={"Seleccione generos"}
              styles={SELECT_STYLES}
              onChange={(value: any) =>
                setFilters({ ...filters, genres: handlePush(value) })
              }
            />
          </div>
        </div>
        <button
          className="bg-important rounded-md p-2 mt-4 font-medium"
          onClick={clearSelects}
        >
          Limpiar filtros
        </button>
      </div>
    </Accordion>
  );
};

export default FilterContent;
