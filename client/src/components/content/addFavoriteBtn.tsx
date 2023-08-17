import { addFavorite, removeFavorite } from "@/utils/axios/user";
import { useAppContext } from "@/utils/context/AppContext";
import { isFavorite } from "@/utils/helpers";
import { FC, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import UseAnimations from "react-useanimations";
import heart from "react-useanimations/lib/heart";
import LoadingSpinner from "../chapter/LoadingSpinner";

type Props = {
  contentId: number;
};

const AddFavoriteBtn: FC<Props> = ({ contentId }) => {
  const [loading, setLoading] = useState(false);
  const authContext = useAppContext();
  const { setFavorites, favorites, user } = authContext;

  const isAdded = isFavorite(contentId, favorites);

  const text = !isAdded ? "Agregar a favoritos" : "Remover de Favoritos";

  const Icon: FC<{ added: boolean }> = ({ added }) => (
    <>
      {added ? (
        <BsTrashFill size={25} color="#fff" />
      ) : (
        <UseAnimations
          reverse={added}
          size={32}
          animation={heart}
          className=""
          fillColor="#fff"
          strokeColor={"#fff"}
        />
      )}
    </>
  );

  const addToFavorites = async () => {
    setLoading(true);
    try {
      const resp = await addFavorite(contentId, user?.id!);
      if (resp?.status === 200) {
        setFavorites([
          {
            id: resp.data.id,
            title: resp.data.title,
            type: resp.data.type,
            demography: resp.data.demography,
            description: resp.data.description,
            image: resp.data.image,
            banner: "",
            genres: [],
            episodes: [],
            status: resp.data.status,
            numEpisodes: 0,
          },
          ...favorites,
        ]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async () => {
    setLoading(true);
    try {
      const deleted = await removeFavorite(contentId, user?.id!);
      if (deleted?.status === 200) {
        const favCopy = [...favorites].filter((fav) => fav.id !== contentId);

        setFavorites(favCopy);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={() => {
        if (isAdded === false) {
          addToFavorites();
        } else {
          removeFromFavorites();
        }
      }}
      className={`flex mb-5 w-full justify-center gap-3 p-5 bg-accent rounded-md ${
        isAdded ? "hover:bg-red-400" : "button-primary-outline"
      } `}
    >
      {loading ? (
        <LoadingSpinner size={20} color="white" />
      ) : (
        <>
          <Icon added={isAdded} />
          <span className="text-lg font-medium">{text}</span>
        </>
      )}
    </button>
  );
};

export default AddFavoriteBtn;
