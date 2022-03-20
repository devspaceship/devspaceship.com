import Display from "./display";
import Control from "./control";
import { useState } from "react";

const Tesseract = () => {
  const [params, setParams] = useState({ d: 200, alpha: 8, beta: 4 });
  return (
    <>
      <Display />
      <Control params={params} setParams={setParams} />
    </>
  );
};

export default Tesseract;
