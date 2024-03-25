import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import "./index.css";
import {
	Root,
	loader as rootLoader,
	action as rootAction,
} from "./routes/root";
import {
	Contact,
	loader as contactLoader,
	action as contactAction,
} from "./routes/contact";
import ErrorPage from "./error-page";
import { EditContact, action as editAction } from "./routes/edit";
import { action as deleteAction } from "./routes/destroy";
import Index from "./routes";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: rootLoader,
		action: rootAction,
		handle: {
			crumb: (path: string, name: string) => <Link to={path}>root</Link>,
		},
		id: "root",
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{
						index: true,
						element: <Index />,
					},
					{
						path: "/contacts/:contactId",
						element: <Contact />,
						loader: contactLoader,
						action: contactAction,
						handle: {
							crumb: (path: string, name: string) => (
								<Link to={path}>contact-{name}</Link>
							),
						},
					},
					{
						path: "/contacts/:contactId/edit",
						element: <EditContact />,
						loader: contactLoader,
						action: editAction,
						children: [
							{
								path: "/contacts/:contactId/edit/some",
								element: <div>Привет мир</div>,
							},
						],
					},
					{
						path: "/contacts/:contactId/destroy",
						action: deleteAction,
						errorElement: <div>Error</div>,
					},
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
