import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * Invariant 5, page half.
 *
 * scripts/prerender.js serializes the live DOM with page.content(). Any FAQ
 * primitive that unmounts its closed content therefore ships questions without
 * answers, while the FAQPage schema keeps asserting those answers. This gate
 * exists because that is exactly what happened: the blog path was fixed with
 * native <details> and the page path was left on Radix for eighteen pages.
 */

const ACCORDION = "src/components/ui/accordion.tsx";
const PAGES_DIR = "src/pages";

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const sourceFiles = walk(PAGES_DIR).filter((f) => /\.(tsx|jsx)$/.test(f));

describe("FAQ answers survive prerendering", () => {
  it("renders a closed answer into the markup a crawler reads", () => {
    const question = "Does DGCA publish a pass rate?";
    const answer = "No DGCA document found stating a published pass rate for its examinations.";

    const { container } = render(
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="item-0">
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    // Nothing was clicked, so this is the state the prerenderer serializes.
    const details = container.querySelector("details");
    expect(details).not.toBeNull();
    expect(details?.hasAttribute("open")).toBe(false);
    expect(container.querySelector("summary")?.textContent).toContain(question);
    expect(container.innerHTML).toContain(answer);
  });

  it("the shared accordion renders native details and summary", () => {
    const src = readFileSync(ACCORDION, "utf8");
    expect(src).toMatch(/<details\b/);
    expect(src).toMatch(/<summary\b/);
  });

  it("the shared accordion does not use a primitive that unmounts closed content", () => {
    const src = readFileSync(ACCORDION, "utf8");
    expect(src).not.toMatch(/@radix-ui\/react-accordion/);
    expect(src).not.toMatch(/@radix-ui\/react-collapsible/);
  });

  it("no page imports a collapsing primitive directly, bypassing the shared component", () => {
    const offenders = sourceFiles.filter((f) => /@radix-ui\/react-(accordion|collapsible)/.test(readFileSync(f, "utf8")));
    expect(offenders, `pages importing a collapsing primitive directly: ${offenders.join(", ")}`).toEqual([]);
  });

  it("every page that renders an FAQ answer does so through the shared component", () => {
    const offenders = sourceFiles.filter((f) => {
      const src = readFileSync(f, "utf8");
      if (!/AccordionContent/.test(src)) return false;
      return !/from\s+["']@\/components\/ui\/accordion["']/.test(src);
    });
    expect(offenders, `pages using AccordionContent from elsewhere: ${offenders.join(", ")}`).toEqual([]);
  });
});
