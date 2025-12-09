import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

type Item = { name: string; value: number };

const dummyData: Item[] = [
  { name: "arif", value: 700 },
  { name: "DJ Nova", value: 980 },
  { name: "hamid", value: 1050 },
  { name: "kalam", value: 880 },
  { name: "jahid", value: 920 },
];

export default function TopPerformingUsersChart({
  data = dummyData,
}: {
  data?: Item[];
}) {
  const max = Math.max(...data.map((d) => d.value), 0);
  const domainMax = Math.ceil((max * 1.15) / 100) * 100 || 100;

  return (
    <div className="bg-white rounded shadow-sm p-5">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          Top Performing Users
        </h3>
        <p className="text-sm text-gray-500">By revenue generated</p>
      </div>

      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
          >
            <defs>
              {/* Single gradient for ALL bars */}
              <linearGradient
                id="singleRedGradient"
                x1="0"
                x2="1"
                y1="0"
                y2="0"
              >
                <stop offset="0%" stopColor="#BD001F" />
                <stop offset="70%" stopColor="#FF5060" />
                <stop offset="100%" stopColor="#FFB4C0" />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 6"
              horizontal={false}
              stroke="#E5E5E5"
            />

            <XAxis
              type="number"
              domain={[0, domainMax]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#666" }}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={120}
              tick={{ fill: "#333", fontWeight: 600 }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              formatter={(value: any) => `${value}`}
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
            />

            <Bar dataKey="value" barSize={24} radius={[8, 8, 8, 8]}>
              {data.map((_, index) => (
                <Cell key={index} fill="url(#singleRedGradient)" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
