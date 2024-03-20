import React from "react";
import { useFormAction } from "react-router-dom";

// тестирование работы экшена с помощью хука
export const EditButton = () => {
	return (
		<button type="submit" formAction={useFormAction("edit")} formMethod="post">
			edit
		</button>
	);
};
