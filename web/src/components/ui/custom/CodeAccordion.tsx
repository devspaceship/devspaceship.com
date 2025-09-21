import { ReactNode } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "ui/accordion";

const CodeAccordion = ({
	children,
	title = "See code",
}: {
	children: ReactNode;
	title?: string;
}) => {
	return (
		<Accordion type="single" collapsible>
			<AccordionItem value="item-1">
				<AccordionTrigger>{title}</AccordionTrigger>
				<AccordionContent>{children}</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default CodeAccordion;
