import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Accordion built on native <details> and <summary>.
 *
 * The Radix implementation this replaces unmounted closed content, and
 * scripts/prerender.js serializes the live DOM with page.content(). Every FAQ
 * answer on every non-blog page was therefore absent from the HTML a crawler
 * reads, while the FAQPage schema asserted those same answers. Native <details>
 * keeps the answer in the served markup whether the item is open or shut, and
 * needs no script to do it.
 *
 * The exported names and props match the previous API exactly, so no page JSX
 * changed. type="single" maps to the <details name> group, which browsers use
 * to keep one item open at a time; a browser without that support simply allows
 * more than one open, which degrades the behaviour and never the content.
 */

const GroupContext = React.createContext<string | undefined>(undefined);

type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
};

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      children,
      type = "single",
      collapsible: _collapsible,
      defaultValue: _defaultValue,
      value: _value,
      onValueChange: _onValueChange,
      ...props
    },
    ref,
  ) => {
    const reactId = React.useId();
    const group = type === "single" ? `accordion-${reactId.replace(/:/g, "")}` : undefined;
    return (
      <GroupContext.Provider value={group}>
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </GroupContext.Provider>
    );
  },
);
Accordion.displayName = "Accordion";

type AccordionItemProps = React.DetailsHTMLAttributes<HTMLDetailsElement> & {
  /** Accepted for API compatibility; native <details> needs no item value. */
  value?: string;
};

const AccordionItem = React.forwardRef<HTMLDetailsElement, AccordionItemProps>(
  ({ className, value: _value, ...props }, ref) => {
    const group = React.useContext(GroupContext);
    return <details ref={ref} name={group} className={cn("group border-b", className)} {...props} />;
  },
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <summary
      ref={ref}
      className={cn(
        "flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium transition-all hover:underline [&::-webkit-details-marker]:hidden",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown
        aria-hidden="true"
        className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
      />
    </summary>
  ),
);
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className="overflow-hidden text-sm" {...props}>
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </div>
  ),
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
