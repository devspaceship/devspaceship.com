import { ReactNode } from "react";

export function TypographyH1({ children, ...props }: { children: ReactNode }) {
	return (
		<h1
			className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
			{...props}
		>
			{children}
		</h1>
	);
}

export function TypographyH2({ children, ...props }: { children: ReactNode }) {
	return (
		<h2
			className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
			{...props}
		>
			{children}
		</h2>
	);
}

export function TypographyH3({ children, ...props }: { children: ReactNode }) {
	return (
		<h3
			className="scroll-m-20 text-2xl font-semibold tracking-tight"
			{...props}
		>
			{children}
		</h3>
	);
}

export function TypographyH4({ children, ...props }: { children: ReactNode }) {
	return (
		<h4 className="scroll-m-20 text-xl font-semibold tracking-tight" {...props}>
			{children}
		</h4>
	);
}

export function TypographyP({ children, ...props }: { children: ReactNode }) {
	return (
		<p className="leading-7 [&:not(:first-child)]:mt-6" {...props}>
			{children}
		</p>
	);
}

export function TypographyBlockquote({
	children,
	...props
}: {
	children: ReactNode;
}) {
	return (
		<blockquote className="mt-6 border-l-2 pl-6 italic" {...props}>
			{children}
		</blockquote>
	);
}

export function TypographyTable({
	children,
	...props
}: {
	children: ReactNode;
}) {
	return (
		<div className="my-6 w-full overflow-y-auto">
			<table className="w-full" {...props}>
				{children}
			</table>
		</div>
	);
}

export function TypographyTR({ children, ...props }: { children: ReactNode }) {
	return (
		<tr className="m-0 border-t p-0 even:bg-muted" {...props}>
			{children}
		</tr>
	);
}

export function TypographyTH({ children, ...props }: { children: ReactNode }) {
	return (
		<th
			className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
			{...props}
		>
			{children}
		</th>
	);
}

export function TypographyTD({ children, ...props }: { children: ReactNode }) {
	return (
		<td
			className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
			{...props}
		>
			{children}
		</td>
	);
}

export function TypographyList({
	children,
	...props
}: {
	children: ReactNode;
}) {
	return (
		<ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>
			{children}
		</ul>
	);
}

export function TypographyInlineCode({
	children,
	...props
}: {
	children: ReactNode;
}) {
	return (
		<code
			className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
			{...props}
		>
			{children}
		</code>
	);
}

export function TypographyLead({
	children,
	...props
}: {
	children: ReactNode;
}) {
	return (
		<p className="text-xl text-muted-foreground" {...props}>
			{children}
		</p>
	);
}

export function TypographyLarge({
	children,
	...props
}: {
	children: ReactNode;
}) {
	return (
		<div className="text-lg font-semibold" {...props}>
			{children}
		</div>
	);
}

export function TypographySmall({
	children,
	...props
}: {
	children: ReactNode;
}) {
	return (
		<small className="text-sm font-medium leading-none" {...props}>
			{children}
		</small>
	);
}

export function TypographyMuted({
	children,
	...props
}: {
	children: ReactNode;
}) {
	return (
		<p className="text-sm text-muted-foreground" {...props}>
			{children}
		</p>
	);
}
