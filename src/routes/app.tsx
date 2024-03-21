import { useInRouterContext } from "react-router-dom";

export const App = ({ children }) => {
  const refer = useInRouterContext();
  console.log(refer);
	return <>{children}</>;
};
