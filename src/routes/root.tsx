import {
	Form,
	LoaderFunctionArgs,
	NavLink,
	Outlet,
	redirect,
	useHref,
	useInRouterContext,
	useLoaderData,
	useNavigation,
	useResolvedPath,
	useSubmit,
} from "react-router-dom";

import { useEffect } from "react";
import { createContact, getContacts } from "../contacts";
import { TContact } from "../types";

export async function action() {
	const contact = await createContact();
	return redirect(`/contacts/${contact.id}/edit`);
}
export async function loader({
	request,
}: LoaderFunctionArgs): Promise<{ contacts: TContact[]; q: string | null }> {
	const url = new URL(request.url);
	const q = url.searchParams.get("q");
	const contacts = await getContacts(q);
	return { contacts, q };
}

export function Root() {
	const { contacts, q } = useLoaderData() as {
		contacts: any[];
		q: string | null;
	};
	const navigation = useNavigation();
	const submit = useSubmit();

	const searching =
		navigation.location &&
		new URLSearchParams(navigation.location.search).has("q");

	useEffect(() => {
		const element = document.getElementById("q") as HTMLInputElement;
		if (!element) {
			return;
		}
		element.value = q || "";
	}, [q]);

	return (
		<>
			<div id="sidebar">
				<h1>React Router Contacts</h1>
				<div>
					<Form id="search-form" role="search">
						<input
							id="q"
							className={searching ? "loading" : ""}
							aria-label="Search contacts"
							placeholder="Search"
							type="search"
							name="q"
							defaultValue={q || ""}
							onChange={(event) => {
								const isFirstSearch = q == null;
								submit(event.currentTarget.form, {
									replace: !isFirstSearch,
								});
							}}
						/>
						<div id="search-spinner" aria-hidden hidden={!searching} />
						<div className="sr-only" aria-live="polite"></div>
					</Form>
					<Form method="post">
						<button type="submit">New</button>
					</Form>
				</div>
				<nav>
					{contacts.length ? (
						<ul>
							{contacts.map((contact) => (
								<li key={contact.id}>
									<NavLink
										to={`/contacts/${contact.id}`}
										className={({ isActive, isPending }) =>
											isActive ? "active" : isPending ? "pendding" : ""
										}
									>
										{contact.first || contact.last ? (
											<>
												{contact.first} {contact.last}
											</>
										) : (
											<>No name</>
										)}
										{"  "}
										{contact.favorite && <span>*</span>}
									</NavLink>
								</li>
							))}
						</ul>
					) : (
						<p>
							<i>No contacts</i>
						</p>
					)}
				</nav>
			</div>
			<div
				id="detail"
				className={navigation.state === "loading" ? "loading" : ""}
			>
				<Outlet />
			</div>
		</>
	);
}
