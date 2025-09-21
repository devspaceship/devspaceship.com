import {
	TypographyBlockquote,
	TypographyH1,
	TypographyH2,
	TypographyH3,
	TypographyH4,
	TypographyList,
	TypographyP,
	TypographyTD,
	TypographyTH,
	TypographyTR,
	TypographyTable,
} from "@/components/ui/typography";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...components,
		h1: ({ children }) => (
			<div className="text-center">
				<TypographyH1>{children}</TypographyH1>
			</div>
		),
		h2: ({ children }) => <TypographyH2>{children}</TypographyH2>,
		h3: ({ children }) => <TypographyH3>{children}</TypographyH3>,
		h4: ({ children }) => <TypographyH4>{children}</TypographyH4>,
		p: ({ children }) => <TypographyP>{children}</TypographyP>,
		blockquote: ({ children }) => (
			<TypographyBlockquote>{children}</TypographyBlockquote>
		),
		table: ({ children }) => <TypographyTable>{children}</TypographyTable>,
		th: ({ children }) => <TypographyTH>{children}</TypographyTH>,
		tr: ({ children }) => <TypographyTR>{children}</TypographyTR>,
		td: ({ children }) => <TypographyTD>{children}</TypographyTD>,
		ul: ({ children }) => <TypographyList>{children}</TypographyList>,
		a: ({ children, href }) => (
			<a href={href} target="_blank" className="text-primary">
				{children}
			</a>
		),
	};
}
