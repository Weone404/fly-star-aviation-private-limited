import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SocialShareButtons } from "@/components/SocialShareButtons";

describe("SocialShareButtons", () => {
  it("uses a readable foreground label on dark backgrounds", () => {
    render(<SocialShareButtons label="Share this course" theme="dark" />);

    expect(screen.getByText("Share this course")).toHaveClass(
      "text-primary-foreground/80",
    );
    expect(screen.getByText("Share this course")).not.toHaveClass(
      "text-muted-foreground",
    );
  });

  it("keeps the muted label color on light backgrounds", () => {
    render(<SocialShareButtons label="Share" />);

    expect(screen.getByText("Share")).toHaveClass("text-muted-foreground");
  });
});
