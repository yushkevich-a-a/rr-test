import {
	HTMLAttributeAnchorTarget,
	MouseEventHandler,
	ReactNode,
	forwardRef,
} from "react";
import { To, useHref, useLinkClickHandler } from "react-router-dom";
import styled from "styled-components";

type TCustomLink = {
	onClick: MouseEventHandler<HTMLAnchorElement>;
	replace?: boolean;
	state: any;
	target: HTMLAttributeAnchorTarget;
	to: To;
	children?: ReactNode;
};

const StyledLink = styled.a`
	color: fuchsia;
`;

export const CustomLink = forwardRef(
	(
		{
			onClick,
			replace = false,
			state,
			target,
			to,
			children,
			...rest
		}: TCustomLink,
		ref
	) => {
		let href = useHref(to);
		let handleClick = useLinkClickHandler(to, {
			replace,
			state,
			target,
		});

		return (
			<StyledLink
				{...rest}
				href={href}
				onClick={(event) => {
					onClick?.(event);
					if (!event.defaultPrevented) {
						handleClick(event);
					}
				}}
				ref={ref as any}
				target={target}
			>
				{children}
			</StyledLink>
		);
	}
);
