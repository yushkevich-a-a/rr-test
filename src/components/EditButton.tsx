import { useLocation, useNavigate } from "react-router-dom";

// тестирование работы экшена с помощью хука
export const EditButton = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`${location.pathname}/edit`);
	};

	return (
		<button formMethod="post" onClick={handleClick}>
			edit
		</button>
	);
};
