import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import TopBarPogress from "react-topbar-progress-indicator";

TopBarPogress.config({
	barColors: {
		"0": "#fff",
		"1.0": "#3cff64",
	},
	shadowBlur: 5,
});

export function TopBarProgressByLocation() {
	const [progress, setProgress] = useState(false);
	const [previousLocation, setPreviousLocation] = useState("");
	const location = useLocation();

	useEffect(() => {
		setPreviousLocation(location.pathname);
		setProgress(true);
		preventInfiniteProgressBar();
	}, [location]);

	useEffect(() => {
		setProgress(false);
	}, [previousLocation]);

	function preventInfiniteProgressBar() {
		const hasClickedOnALinkToTheCurrentPage = location.pathname === previousLocation;

		if (hasClickedOnALinkToTheCurrentPage) {
			setPreviousLocation("");
		}
	}

	if (!progress) {
		return <></>;
	}

	return <TopBarPogress />;
}

export default TopBarProgressByLocation;
