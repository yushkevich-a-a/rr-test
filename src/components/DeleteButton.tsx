import React from "react";
import { Form, useFormAction } from "react-router-dom";

export const DeleteButton = () => {
	return (
		<button
			type="submit"
			formAction={useFormAction("destroy")}
			formMethod="post"
			onClick={(event) => {
				if (!confirm("Please confirm you want to delete this record.")) {
					event.preventDefault();
				}
			}}
		>
			Delete
		</button>
	);
};
