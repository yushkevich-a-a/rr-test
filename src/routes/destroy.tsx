import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ params }: ActionFunctionArgs) {
	if (!params.contactId) {
		return;
	}
	await deleteContact(params.contactId);
	return redirect("/");
}
