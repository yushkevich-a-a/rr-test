import { ReactNode } from "react";
import { useInRouterContext } from "react-router-dom";

export const App = ({ children }: { children: ReactNode }) => {
	const refer = useInRouterContext();
	console.log(refer);
	return <>{children}</>;
};
