import {
	ActionFunctionArgs,
	Form,
	LoaderFunctionArgs,
	useFetcher,
	useFormAction,
	useLoaderData,
} from "react-router-dom";
import { getContact, updateContact } from "../contacts";
import { DeleteButton } from "../components/DeleteButton";
import { EditButton } from "../components/EditButton";
import { TContact } from "../types";

export async function loader({ params }: LoaderFunctionArgs) {
	const contact = await getContact(params.contactId);
	if (!contact) {
		throw new Response("", {
			status: 404,
			statusText: "NotFound",
		});
	}
	return { contact };
}

export async function action({ request, params }: ActionFunctionArgs) {
	let formData = await request.formData();
	if (!params.contactId) {
		return;
	}
	return updateContact(params.contactId, {
		favorite: formData.get("favorite") === "true",
	});
}

export function Contact() {
	const { contact } = useLoaderData() as { contact: TContact };
	return (
		<div id="contact">
			<div>
				<img key={contact.avatar} src={contact.avatar} />
			</div>
			<div>
				<h1>
					{contact.first || contact.last ? (
						<>
							{contact.first} {contact.last}
						</>
					) : (
						<i>No Name</i>
					)}{" "}
					<Favorite contact={contact} />
				</h1>

				{contact.twitter && (
					<p>
						<a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
							{contact.twitter}
						</a>
					</p>
				)}

				{contact.notes && <p>{contact.notes}</p>}

				<div>
					<Form>
						<EditButton />
						<DeleteButton />
					</Form>
				</div>
			</div>
		</div>
	);
}

function Favorite({ contact }: { contact: TContact }) {
	// yes, this is a `let` for later
	const fetcher = useFetcher();
	let favorite = contact.favorite;

	if (fetcher.formData) {
		favorite = fetcher.formData.get("favorite") === "true";
	}

	return (
		<fetcher.Form method="post">
			<button
				name="favorite"
				value={favorite ? "false" : "true"}
				aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
			>
				{favorite ? "★" : "☆"}
			</button>
		</fetcher.Form>
	);
}
