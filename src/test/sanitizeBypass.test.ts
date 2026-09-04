import { describe, expect, it } from "vitest";
import { sanitizeHtml } from "../lib/sanitizeHtml";
// @ts-expect-error - plain .mjs build script, no types
import { sanitizeHtml as sanitizeNode } from "../../scripts/sanitize.mjs";

/**
 * Known bypass classes for HTML sanitisers.
 *
 * Written to FAIL if the sanitiser is inadequate, not to confirm it is fine.
 * Standing rule: if a vector here ever passes, do NOT patch the custom
 * sanitiser — replace it with a maintained library. Hand-rolled sanitisers get
 * iterated into bypasses, and the iteration is the failure mode.
 *
 * Both copies are asserted, because the build-side copy writes into static HTML
 * served from the edge, where a payload needs no fetch to run.
 */
const both = (input: string) => [sanitizeHtml(input), sanitizeNode(input)];

function assertInert(input: string, label: string) {
  for (const out of both(input)) {
    const low = out.toLowerCase();
    expect(low, label + " :: " + out).not.toMatch(/<script/);
    expect(low, label + " :: " + out).not.toMatch(/\son[a-z]+\s*=/);
    expect(low, label + " :: " + out).not.toMatch(/javascript:/);
    expect(low, label + " :: " + out).not.toMatch(/<iframe|<object|<embed|<svg|<math|<template|<form|<base|<meta/);
    expect(low, label + " :: " + out).not.toMatch(/srcdoc|xlink:href|formaction/);
    expect(low, label + " :: " + out).not.toMatch(/data:text\/html/);
  }
}

describe("sanitiser bypass classes", () => {
  it("mutation XSS: recontextualised containers", () => {
    assertInert('<noscript><p title="</noscript><img src=x onerror=alert(1)>">', "noscript mXSS");
    assertInert("<style><img src=x onerror=alert(1)></style>", "style mXSS");
    assertInert("<template><script>alert(1)</script></template>", "template mXSS");
    assertInert("<svg><style><img src=x onerror=alert(1)></style></svg>", "svg style mXSS");
    assertInert("<math><mtext><table><mglyph><style><img src=x onerror=alert(1)>", "math mglyph mXSS");
  });

  it("iframe srcdoc", () => {
    assertInert('<iframe srcdoc="&lt;script&gt;alert(1)&lt;/script&gt;"></iframe>', "srcdoc encoded");
    assertInert('<iframe srcdoc="<script>alert(1)</script>">', "srcdoc raw");
  });

  it("xlink:href with javascript:", () => {
    assertInert('<svg><a xlink:href="javascript:alert(1)"><text>x</text></a></svg>', "svg xlink");
    assertInert('<a xlink:href="javascript:alert(1)">x</a>', "anchor xlink");
  });

  it("data: URIs", () => {
    assertInert('<a href="data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==">x</a>', "data href");
    assertInert('<img src="data:text/html,<script>alert(1)</script>">', "data img");
    assertInert('<object data="data:text/html,<script>alert(1)</script>"></object>', "data object");
  });
});

describe("sanitiser bypass classes, part two", () => {
  it("split, malformed and unclosed tags", () => {
    assertInert("<scr<script>ipt>alert(1)</script>", "split script");
    assertInert("<script>alert(1)", "unclosed script");
    assertInert("<SCRIPT SRC=//evil.tld></SCRIPT>", "uppercase script");
    assertInert('<script/src="//evil.tld">', "slash separated script");
    assertInert("<img src=x onerror=alert(1)//", "unterminated img");
  });

  it("event handlers in every quoting style", () => {
    assertInert("<img src=x onerror=alert(1)>", "unquoted");
    assertInert("<img src='x' onerror='alert(1)'>", "single quoted");
    assertInert('<img src="x" ONERROR="alert(1)">', "uppercase");
    assertInert('<img src="x" onerror = "alert(1)">', "spaced");
    assertInert('<body onload="alert(1)">', "body onload");
  });

  it("form and formaction", () => {
    assertInert('<form action="//evil.tld"><button formaction="javascript:alert(1)">go</button></form>', "formaction");
    assertInert('<input type="image" formaction="javascript:alert(1)">', "input formaction");
  });

  it("base and meta redirection", () => {
    assertInert('<base href="//evil.tld/">', "base tag");
    assertInert('<meta http-equiv="refresh" content="0;url=//evil.tld">', "meta refresh");
  });

  it("still keeps genuine article markup after all of that", () => {
    const good = '<h2>DGCA exams</h2><p>Pass mark is <strong>70%</strong>.</p><a href="https://dgca.gov.in">source</a>';
    for (const out of both(good)) {
      expect(out).toContain("<h2>DGCA exams</h2>");
      expect(out).toContain("<strong>70%</strong>");
      expect(out).toContain('href="https://dgca.gov.in"');
    }
  });
});

describe("obfuscated schemes and hidden payloads", () => {
  it("obfuscated javascript schemes", () => {
    assertInert('<a href="jav\tascript:alert(1)">x</a>', "tab in scheme");
    assertInert('<a href="jav\nascript:alert(1)">x</a>', "newline in scheme");
    assertInert('<a href="JaVaScRiPt:alert(1)">x</a>', "mixed case");
    assertInert('<a href="   javascript:alert(1)">x</a>', "leading space");
  });

  it("comments hiding payloads", () => {
    assertInert("<!--<script>alert(1)</script>--><p>x</p>", "commented script");
    assertInert("<!--[if IE]><script>alert(1)</script><![endif]-->", "conditional comment");
  });
});
