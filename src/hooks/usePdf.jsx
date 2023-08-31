import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { config as URLconfig } from "../enviorment/enviorment";
import { getItemToLocalStorage } from "../services/storage";
import AuthEnum from "../enums/auth.enum";
import { saveAs } from "file-saver";
import { PDFDocument } from "pdf-lib";
import fileDownload from "js-file-download";

const usePDF = () => {
  const [isPending, setIsPending] = useState(false);

  function generatePDF(payload) {
    setIsPending(true);

    const storedToken = getItemToLocalStorage(AuthEnum.TOKEN);

    axios
      .post(`${URLconfig.BASE_URL}/pdf-generate`, payload, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
        responseType: "blob",
      })
      .then(async (response) => {
        fileDownload(response.data, `${payload.artist_name}.pdf`);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsPending(false);
      });
  }

  useEffect(() => {}, []);

  return {
    downloadPDF: (metaData) => generatePDF(metaData),
    isPending: isPending,
  };
};

export default usePDF;
