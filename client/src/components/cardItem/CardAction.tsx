import { addFavorite, removeFavorite } from "@/utils/axios/user";
import { useAppContext } from "@/utils/context/AppContext";
import { findFavorite } from "@/utils/helpers";
import React, { FC } from "react";
import heart from "react-useanimations/lib/heart";
import UseAnimations from "react-useanimations";
import { BsTrashFill } from "react-icons/bs";

type Props = {
  action: string;
  contentId: number;
};

const CardAction: FC<Props> = ({ action, contentId }) => {
  const authContext = useAppContext();
  const { setFavorites, favorites, user } = authContext;
  const isAdded = findFavorite(contentId, favorites);

  const addToFavorites = async () => {
    const resp = await addFavorite(contentId, user?.id!);
    const { setFavorites, favorites } = authContext;

    if (resp?.status === 200)
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
          Episodes: [],
          status: resp.data.status,
        },
        ...favorites,
      ]);
  };

  const removeFromFavorites = async () => {
    const deleted = await removeFavorite(contentId, user?.id!);

    if (deleted?.status === 200) {
      const favCopy = [...favorites];
      const favIndex = favCopy.findIndex((fav) => fav.id == contentId);
      favCopy.splice(favIndex, 1);

      setFavorites(favCopy);
    }
  };

  return action === "add" ? (
    <UseAnimations
      reverse={isAdded}
      size={32}
      animation={heart}
      onClick={() => (isAdded ? removeFromFavorites() : addToFavorites())}
      className="absolute top-2 right-2 z-20 cursor-pointer bg-primary rounded-full p-1"
      fillColor="#fff"
      strokeColor={"#fff"}
    />
  ) : (
    <BsTrashFill
      size={32}
      color="#fff"
      onClick={() => removeFromFavorites()}
      className="absolute top-2 right-2 z-20 cursor-pointer bg-primary rounded-full p-1"
    />
  );
};

export default CardAction;
