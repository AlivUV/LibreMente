import { FontWeightValues } from "@/app/_enums/FontWeightValues";
import { IReportResult } from "@/app/_interfaces/IReportResult";
import { Box, Typography } from "@mui/material";
import { PieValueType } from "@mui/x-charts/models";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";

function toPieValueType(result: IReportResult): PieValueType {
  return {
    id: String(result._id),
    value: result.count,
    label: result._id
      ? String(result._id).replaceAll(" ", "\n")
      : "No\nregistra",
  };
}

export default function Chart({
  title,
  fetcher,
}: {
  title: string;
  fetcher: () => Promise<IReportResult[]>;
}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PieValueType[]>([]);
  useEffect(() => {
    setLoading(true);
    fetcher().then((results) => {
      const newData = results.map(toPieValueType);
      setData([...newData]);
      setLoading(false);
    });
  }, [fetcher]);
  return (
    <Box display="flex" flexDirection="column">
      <Typography color="text2.main" fontWeight={FontWeightValues.Semibold}>
        {title}
      </Typography>
      <PieChart
        colors={[
          "#1f77b4",
          "#ff7f0e",
          "#2ca02c",
          "#d62728",
          "#9467bd",
          "#8c564b",
          "#e377c2",
          "#7f7f7f",
          "#bcbd22",
          "#17becf",
        ]}
        loading={loading}
        series={[
          {
            data: [...data],
            arcLabel: (item) => item.value,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontWeight: "bold",
          },
          tspan: {
            fill: "#666666",
          },
        }}
        width={380}
        height={200}
        slotProps={{
          legend: {
            direction: "column",
            position: { vertical: "middle", horizontal: "right" },
            padding: 0,
          },
        }}
      />
    </Box>
  );
}
