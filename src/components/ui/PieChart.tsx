interface PieChartProps {
  size?: number;
  percent: number;
}

export default function PieChart(props: PieChartProps) {
  const pieStyle = () => {
    const deg = (360 * props.percent) / 50;
    return `conic-gradient(#1f8ecd 0deg ${deg}deg,#ee5a52 ${deg}deg 360deg)`;
  };

  return (
    <div className="relative w-[200px] h-[200px]">
      <div
        style={{
          background: pieStyle(),
        }}
        className="rounded-[100%] w-[200px] h-[200px]"
      />
      <div className="text-2xl font-bold absolute top-[20px] left-[20px] w-[160px] h-[160px] rounded-[100%] bg-[#ededed] flex justify-center items-center">
        {props.percent / 10} / 5
      </div>
    </div>
  );
}
