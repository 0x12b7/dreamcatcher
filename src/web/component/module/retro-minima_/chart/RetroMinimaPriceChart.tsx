import type {ReactNode} from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import {PnlTracker} from "../display/pnl/PnlTracker";
import * as ColorPalette from "../../../../style/ColorPalette";
import { easings } from "react-spring";
import * as Symbol from "../../../../style/Symbol";
import { Heading } from "../typography/Heading";
import { NavButton } from "../nav/NavButton";

export type RetroMinimaPriceChartData = {
	timestamp: number;
	price: number;
};
export type RetroMinimaPriceChartProps = {
	w: number;
	h: number;
	dataset: Array<RetroMinimaPriceChartData>;
};
export function RetroMinimaPriceChart(props: RetroMinimaPriceChartProps): ReactNode {
	let {w, h, dataset} = props;


	return <>
		<NavButton>
			<>09</>
			<>HOME</>
		</NavButton>
		<Heading>
			ETHx Hyperloop by Stader Labs
		</Heading>
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center"
			}}>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "start",
					alignItems: "center",
					width: "100%",
					color: ColorPalette.TIMPERWOLD,
					fontSize: "0.75em",
					fontFamily: "departure-mono"
				}}>
				<PnlTracker
					animation={{
						duration: 2000,
						easing: easings.easeInOutExpo
					}}/>
			</div>
			<ResponsiveContainer
				width={w}
				height={h}>
				<LineChart
					data={dataset}>
					<XAxis
						fill={ColorPalette.TIMPERWOLD}
						axisLine={false}
						tickLine={false}
						tick={{
							fill: ColorPalette.TIMPERWOLD,
							fontFamily: "departure-mono",
							fontSize: "0.75em"
						}}
						dataKey="timestamp"
						tickFormatter={timestamp => new Date(timestamp).toLocaleDateString()}/>
					<YAxis
						scale="auto"
						padding={{
							bottom: 20
						}}
						axisLine={false}
						tickLine={false}
						tickFormatter={tk => `$${tk}`}
						tick={{
							fill: ColorPalette.TIMPERWOLD,
							fontFamily: "departure-mono",
							fontSize: "0.75em"
						}}
						orientation="right"/>
					<Tooltip
						contentStyle={{
							backgroundColor: ColorPalette.EEIRE_BLACK,
							color: ColorPalette.TIMPERWOLD,
							fontFamily: "departure-mono",
							fontSize: "0.75em"
						}}
						labelFormatter={timestamp => new Date(timestamp).toLocaleString()}/>
					<Line
						type="monotone"
						dataKey="price"
						stroke={ColorPalette.TIMPERWOLD}
						dot={false}
						height={5}
						strokeWidth={2.5}
						strokeLinecap="square"/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	</>;
}