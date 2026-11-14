import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import { buildGraph, PAGE_FAQS } from "@/lib/schema";
import CPLCourseDetailsPage from "@/pages/BecomeAPilot/commercial-pilot-license";

const pagePath = "/become-a-pilot/commercial-pilot-licence";

afterEach(() => {
    vi.unstubAllGlobals();
});

describe("Commercial Pilot Licence pathway page", () => {
    it("preserves the page H1 and renders the ground-training scope", () => {
        vi.stubGlobal(
            "IntersectionObserver",
            class {
                observe() {}
                unobserve() {}
                disconnect() {}
            },
        );

        render(
            <MemoryRouter>
                <CPLCourseDetailsPage />
            </MemoryRouter>,
        );

        expect(
            screen.getByRole("heading", { level: 1, name: "Commercial Pilot License Course Details" }),
        ).toBeInTheDocument();
        expect(
            screen.getAllByText(/it does not operate an FTO or provide aircraft flying training/i),
        ).toHaveLength(2);
        const overviewTable = screen.getByRole("table");
        expect(within(overviewTable).getAllByRole("columnheader")).toHaveLength(2);
        expect(
            within(overviewTable).getByRole("row", {
                name: "Page scope CPL pathway information and ground-class preparation",
            }),
        ).toBeInTheDocument();
    });

    it("keeps visible FAQs identical to the FAQPage schema", () => {
        vi.stubGlobal(
            "IntersectionObserver",
            class {
                observe() {}
                unobserve() {}
                disconnect() {}
            },
        );

        render(
            <MemoryRouter>
                <CPLCourseDetailsPage />
            </MemoryRouter>,
        );

        const heading = screen.getByRole("heading", { name: "Frequently asked questions" });
        const section = heading.closest("section");
        if (!section) throw new Error("FAQ section was not rendered");

        const visibleFaqs = within(section)
            .getAllByRole("heading", { level: 3 })
            .map((question, index) => ({
                q: question.textContent,
                a: section.querySelectorAll("article p")[index]?.textContent,
            }));
        const expectedFaqs = PAGE_FAQS[pagePath].map(({ q, a }) => ({ q, a }));

        expect(visibleFaqs).toEqual(expectedFaqs);

        const graph = buildGraph(pagePath);
        const nodes = graph?.["@graph"] as Array<Record<string, unknown>> | undefined;
        const faqNode = nodes?.find((node) => node["@type"] === "FAQPage");
        expect(faqNode).toBeDefined();
        expect(faqNode?.mainEntity).toEqual(
            PAGE_FAQS[pagePath].map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
        );
    });
});
