import Display from "./display";
import Control from "./control";
import { useState } from "react";

const Tesseract = () => {
  const [params, setParams] = useState({ d: 300, alpha: 10, beta: 12 });
  return (
    <>
      <Display params={params} />
      <Control params={params} setParams={setParams} />
    </>
  );
};

export default Tesseract;
