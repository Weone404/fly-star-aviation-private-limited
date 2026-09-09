import React, { cloneElement, isValidElement, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { KEYWORD_LINKS } from "@/lib/seoKeywords";

const keywordMap = new Map<string, string>(
  KEYWORD_LINKS.map(({ keyword, href }) => [keyword.toLowerCase(), href])
);

const escapedKeywords = KEYWORD_LINKS.map(({ keyword }) =>
  keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
).sort((a, b) => b.length - a.length);

const keywordRegex = new RegExp(`\\b(${escapedKeywords.join("|")})\\b`, "gi");

interface KeywordLinkifyProps {
  children: ReactNode;
}

/**
 * Elements whose text must never be broken up by a link.
 *
 * A heading and a question are single semantic units. Linkifying inside them
 * split "What is an Airline Transport Pilot License (ATPL)?" into five nodes on
 * screen and gave a crawler a heading made of anchors — the visible symptom that
 * prompted this fix. Prose is where an internal link belongs; a title is not.
 */
const NEVER_LINKIFY_TAGS = new Set(["h1", "h2", "h3", "h4", "h5", "h6", "summary", "button", "label", "th"]);

const NEVER_LINKIFY_COMPONENTS = new Set([
  "AccordionTrigger",
  "CardTitle",
  "DialogTitle",
  "SheetTitle",
]);

export function KeywordLinkify({ children }: KeywordLinkifyProps) {
  let linkKeyCounter = 0;
  const { pathname } = useLocation();

  // First mention only. Repeating the same anchor to the same URL a dozen times
  // down a page adds no crawl signal and reads as keyword spray; search engines
  // weigh the first link to a target anyway.
  const alreadyLinked = new Set<string>();

  function linkifyText(text: string): ReactNode[] {
    const elements: ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = keywordRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        elements.push(text.slice(lastIndex, match.index));
      }

      const matchedText = match[0];
      const href = keywordMap.get(matchedText.toLowerCase());
      const key = `keyword-${linkKeyCounter++}-${matchedText}-${match.index}`;

      // Never link a page to itself, and never link the same target twice.
      const usable = href && href !== pathname && !alreadyLinked.has(href);
      if (usable) alreadyLinked.add(href as string);

      if (usable) {
        elements.push(
          <Link key={key} to={href} className="text-accent hover:underline">
            {matchedText}
          </Link>
        );
      } else {
        elements.push(matchedText);
      }

      lastIndex = match.index + matchedText.length;
    }

    if (lastIndex < text.length) {
      elements.push(text.slice(lastIndex));
    }

    return elements;
  }

  function linkifyNode(node: ReactNode): ReactNode {
    if (typeof node === "string") {
      return linkifyText(node);
    }

    if (typeof node === "number" || typeof node === "boolean" || node == null) {
      return node;
    }

    if (Array.isArray(node)) {
      return React.Children.toArray(node).flatMap((child) => linkifyNode(child));
    }

    if (isValidElement(node)) {
      const elementType = node.type;
      const isProtectedElement =
        (typeof elementType === "string" && NEVER_LINKIFY_TAGS.has(elementType)) ||
        (typeof elementType === "function" &&
          NEVER_LINKIFY_COMPONENTS.has(elementType.displayName || elementType.name)) ||
        elementType === Link ||
        elementType === "a" ||
        elementType === "title" ||
        elementType === "meta" ||
        elementType === "link" ||
        elementType === "script" ||
        elementType === "style" ||
        (typeof elementType === "function" &&
          (elementType.displayName === "Helmet" || elementType.name === "Helmet"));

      if (isProtectedElement) {
        return node;
      }

      const props = node.props as { children?: ReactNode };
      if (!props.children) {
        return node;
      }

      return cloneElement(node, {
        ...node.props,
        children: linkifyNode(props.children),
      });
    }

    return node;
  }

  return <>{linkifyNode(children)}</>;
}

