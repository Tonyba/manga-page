import { ExploradorContext } from "@/utils/context/ExploradorContext";
import { selectStyles } from "@/utils/helpers";
import { FiltersType } from "@/utils/types";
import { demography, genres, status, types } from "@/utils/valoresParaSelect";
import React, { useContext, useEffect, useState } from "react";
import { default as ReactSelect } from "react-select";
import makeAnimated from "react-select/animated";
import Accordion from "../accordion/Accordion";

const animatedComponents = makeAnimated();

const ExploradorSidebar = () => {
  const { setContent } = useContext(ExploradorContext);

  const [filters, setFilters] = useState<FiltersType>({
    type: "Manga",
    demography: "",
    status: "",
    genres: [],
  });

  const handlePushGenres = (e: string) => {
    console.log(e);
    //se usa set para que nose repitan los generos
    setFilters({ ...filters, genres: [...new Set([...filters?.genres!, e])] });
    setFilters(filters);
  };

  useEffect(() => {}, []);

  return (
    <div className="bg-primary-dark rounded-md p-5 flex flex-col gap-5">
      <div>
        <span className="text-important font-semibold text-xl block mb-3 ">
          Tipo
        </span>
        <ReactSelect
          closeMenuOnSelect={true}
          components={animatedComponents}
          options={types}
          defaultValue={types[0]}
          styles={selectStyles}
          onChange={(value: any) =>
            setFilters({ ...filters, type: value.label })
          }
        />
      </div>

      <div>
        <span className="text-important font-semibold text-xl block mb-3 ">
          Demografia
        </span>

        <ReactSelect
          closeMenuOnSelect={true}
          components={animatedComponents}
          options={demography}
          defaultValue={demography[0]}
          styles={selectStyles}
          onChange={(value: any) =>
            setFilters({ ...filters, demography: value.label })
          }
        />
      </div>

      <div>
        <span className="text-important font-semibold text-xl block mb-3 ">
          Estado
        </span>

        <ReactSelect
          closeMenuOnSelect={true}
          components={animatedComponents}
          options={status}
          defaultValue={status[0]}
          styles={selectStyles}
          onChange={(value: any) =>
            setFilters({ ...filters, demography: value.label })
          }
        />
      </div>

      <div className="mt-2">
        <Accordion
          title="Generos"
          content={genres.map((genre) => (
            <div key={genre.value} className="form-check">
              <input
                className="accent-important"
                type="checkbox"
                value={genre.label}
                name="genre"
                // cuando se marca se agrega el genero al array de generos si se desmarca se elimina
                onChange={(e) => {
                  if (e.target.checked) {
                    handlePushGenres(e.target.value);
                  } else {
                    setFilters({
                      ...filters,
                      genres: filters?.genres?.filter(
                        (item) => item !== e.target.value
                      ),
                    });
                  }
                }}
              />
              <label className="ms-2">{genre.label}</label>
            </div>
          ))}
        />
      </div>
    </div>
  );
};

export default ExploradorSidebar;
