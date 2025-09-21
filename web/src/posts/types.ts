export interface PostMetadata {
	slug: string;
	title: string;
	creation: string;
	updated: string;
	summary: string;
	categories: string[];
	tags: string[];
}

export type MDXComponent = (props: unknown) => JSX.Element;
