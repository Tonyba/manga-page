import React, { FC } from "react";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  RedditIcon,
  RedditShareButton,
  VKShareButton,
  VKIcon,
} from "next-share";
import { BsFillShareFill } from "react-icons/bs";
import { FaLink } from "react-icons/fa";

type Props = {
  type: string;
  title: string;
  desc: string;
};

const ShareContent: FC<Props> = ({ type, title, desc }) => {
  const iconSize = 40;
  const currentUrl = globalThis.window?.location.href;

  const shareMobile = () => {
    if (navigator.share !== undefined)
      navigator
        .share({
          title: title,
          text: desc,
          url: currentUrl,
        })
        .then(() => console.log("Successful share! 🎉"))
        .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="hidden xl:flex gap-5 items-center">
        <h2 className="text-2xl font-medium">Compartir {type}</h2>
        <div className="flex gap-5 items-center">
          <FacebookShareButton url={currentUrl}>
            <FacebookIcon size={iconSize} round />
          </FacebookShareButton>

          <TwitterShareButton url={currentUrl}>
            <TwitterIcon size={iconSize} round />
          </TwitterShareButton>

          <TelegramShareButton url={currentUrl}>
            <TelegramIcon size={iconSize} round />
          </TelegramShareButton>

          <WhatsappShareButton url={currentUrl}>
            <WhatsappIcon size={iconSize} round />
          </WhatsappShareButton>

          <RedditShareButton url={currentUrl}>
            <RedditIcon size={iconSize} round />
          </RedditShareButton>

          <VKShareButton url={currentUrl}>
            <VKIcon size={iconSize} round />
          </VKShareButton>

          <button
            onClick={() => navigator.clipboard.writeText(currentUrl)}
            className="bg-primary p-2 rounded-full cursor-pointer"
          >
            <FaLink size={iconSize - 15} />
          </button>
        </div>
      </div>
      <button
        onClick={() => shareMobile()}
        className="flex xl:hidden mt-6 w-full justify-center items-center gap-3 p-5 bg-accent rounded-md text-lg font-medium"
      >
        <BsFillShareFill size={18} /> <span>Compartir</span>
      </button>
    </>
  );
};

export default ShareContent;
