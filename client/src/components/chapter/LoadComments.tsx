import React, { FC, useState, Suspense, lazy } from "react";
import LoadingButton from "../shared/LoadingButton";

const CommentsComponent = lazy(() => import("./ChapterComments"));

type Props = {
  path: string;
  title: string;
};

const LoadComments: FC<Props> = ({ path, title }) => {
  const [clicked, setCLick] = useState(false);
  const [commentsComp, setCommentsComp] = useState(<div />);

  const loadComments = (): JSX.Element => {
    return (
      <Suspense fallback={<LoadingButton />}>
        <CommentsComponent path={path} title={title} />
      </Suspense>
    );
  };

  return (
    <>
      {!clicked && (
        <button
          className="button-primary p-4 px-7 rounded-md font-medium my-5 text-xl"
          onClick={() => {
            setCLick(true);
            setCommentsComp(loadComments());
          }}
        >
          Cargar Comentarios
        </button>
      )}
      {commentsComp}
    </>
  );
};

export default LoadComments;
