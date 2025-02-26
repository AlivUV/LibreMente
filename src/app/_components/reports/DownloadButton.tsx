import { FontWeightValues } from "@/app/_enums/FontWeightValues";
import { Download } from "@mui/icons-material";
import { Button } from "@mui/material";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { MutableRefObject } from "react";
export default function DownloadButton({
  pdfRef,
}: {
  pdfRef: MutableRefObject<HTMLDivElement | null>;
}) {
  const handleDownloadPDF = () => {
    const input = pdfRef.current as HTMLDivElement;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      const date = format(new Date(), "do 'de' MMMM 'del' y 'a las' p aaaa", {
        locale: es,
      });
      pdf.setFontSize(9);
      pdf.text("Generado el día " + date, pdfWidth - 90, 10);
      pdf.save(`Reporte Estumente ${format(new Date(), "dd/MM/yyyy")}.pdf`);
    });
    // const pdf = new jsPDF();
    // const element = pdfRef.current || "";
    // pdf.html(element, {
    //   callback: function (doc) {
    //     doc.save("prueba.pdf");
    //   },
    //   x: 10,
    //   y: 10,
    //   html2canvas: { scale: 0.15 },
    // });
  };
  return (
    <Button
      onClick={handleDownloadPDF}
      color="secondary"
      size="large"
      endIcon={<Download />}
      sx={{ m: 2, fontWeight: FontWeightValues.Semibold }}
    >
      Descargar en PDF
    </Button>
  );
}
