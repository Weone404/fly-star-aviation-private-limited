import React, { cloneElement, isValidElement, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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

export function KeywordLinkify({ children }: KeywordLinkifyProps) {
  let linkKeyCounter = 0;

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

      if (href) {
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
