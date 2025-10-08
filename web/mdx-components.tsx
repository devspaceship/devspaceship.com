import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import ExternalLink from "@/components/ExternalLink";
import {
	TypographyBlockquote,
	TypographyH1,
	TypographyH2,
	TypographyH3,
	TypographyH4,
	TypographyList,
	TypographyP,
	TypographyTable,
	TypographyTD,
	TypographyTH,
	TypographyTR,
} from "@/components/ui/typography";

function isExternalLink(href: string): boolean {
	try {
		new URL(href);
		return true;
	} catch {
		return false;
	}
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...components,
		h1: ({ children }) => (
			<div className="text-center">
				<TypographyH1>{children}</TypographyH1>
			</div>
		),
		h2: ({ children, id }) => <TypographyH2 id={id}>{children}</TypographyH2>,
		h3: ({ children, id }) => <TypographyH3 id={id}>{children}</TypographyH3>,
		h4: ({ children, id }) => <TypographyH4 id={id}>{children}</TypographyH4>,
		p: ({ children }) => <TypographyP>{children}</TypographyP>,
		blockquote: ({ children }) => (
			<TypographyBlockquote>{children}</TypographyBlockquote>
		),
		table: ({ children }) => <TypographyTable>{children}</TypographyTable>,
		th: ({ children }) => <TypographyTH>{children}</TypographyTH>,
		tr: ({ children }) => <TypographyTR>{children}</TypographyTR>,
		td: ({ children }) => <TypographyTD>{children}</TypographyTD>,
		ul: ({ children }) => <TypographyList>{children}</TypographyList>,
		a: ({ children, href }) =>
			isExternalLink(href) ? (
				<ExternalLink href={href}>{children}</ExternalLink>
			) : (
				<Link href={href} className="text-primary group">
					{children}
					{href.startsWith("#") && (
						<span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
							<FontAwesomeIcon icon={faLink} />
						</span>
					)}
				</Link>
			),
	};
}
