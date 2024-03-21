import React, { ReactNode } from "react";
import { useMatches } from "react-router-dom";
import styled from "styled-components";

const Crumps = styled.div`
	display: flex;
`;

const ItemLink = styled.div`
	padding: 5px 0;
	&:nth-child(n + 2) {
		&::before {
			content: ">";
			padding: 5px;
		}
	}
`;

export const BreadCrumps = () => {
	const matches = useMatches();
	let crumbs = matches
		// first get rid of any matches that don't have handle and crumb
		.filter((match) => {
			const handle = match.handle as { crumb?: () => void };
			if (!handle) {
				return false;
			}
			const crumb = handle.crumb;
			return Boolean(handle.crumb);
		})
		// first get rid of any matches that don't have handle and crumb
		// now map them into an array of elements, passing the loader
		// data to each one
		.map((match) => {
			const handle = match.handle as {
				crumb: (path: string, id?: string) => ReactNode;
			};
			if (!handle) {
				return false;
			}
			console.log("match in ", match);
			const path = match.pathname;
			const params = match.params as any;
			let id = (params.contactId || "") as string;

			return handle.crumb(path, id);
		});
	return (
		<Crumps>
			{crumbs.map((crumb, index) => (
				<ItemLink key={Number(index)}>{crumb}</ItemLink>
			))}
		</Crumps>
	);
};
