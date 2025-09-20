#!/usr/bin/env python3
"""
Prune styles.css to only keep rules that are used by the HTML.

Keeps:
- Rules whose selector mentions any used class/id/tag (conservative match)
- :root and rules that define CSS variables that are referenced
- @media/@supports blocks if they contain at least one kept rule
- (Default) Keep all @keyframes (safe). Toggle with --drop-keyframes.

Outputs a pruned CSS file and a small report.

NOTE: Selector matching is conservative: if any simple token (.cls, #id, tag)
appears in the used sets, the rule is kept. This avoids false deletions on
complex selectors.
"""

import argparse, json, re
from pathlib import Path

SIMPLE_SELECTOR_RE = re.compile(r'([.#][a-zA-Z0-9_-]+)|\b([a-zA-Z][a-zA-Z0-9_-]*)\b')
CUSTOM_PROP_DEF_RE = re.compile(r'--([a-zA-Z0-9_-]+)\s*:')
CUSTOM_PROP_USE_RE = re.compile(r'var\(\s*--([a-zA-Z0-9_-]+)')

def split_top_level_blocks(css_text):
    """
    Split CSS into top-level blocks while respecting braces, including at-rules.
    Returns a list of (header, body, full_text) where:
      - normal rule: header='selector1, selector2', body='prop: val; ...'
      - at-rule: header='@media ...' or '@supports ...' or '@keyframes name'
    """
    blocks = []
    i = 0
    n = len(css_text)
    while i < n:
        # skip whitespace/comments
        if css_text[i].isspace():
            i += 1
            continue
        if css_text.startswith("/*", i):
            j = css_text.find("*/", i+2)
            i = n if j == -1 else j+2
            continue

        # find header up to '{'
        brace = css_text.find("{", i)
        if brace == -1:
            # leftover tail (e.g., @charset etc.)
            tail = css_text[i:].strip()
            if tail:
                blocks.append((tail, "", tail))
            break

        header = css_text[i:brace].strip()
        depth = 1
        j = brace + 1
        while j < n and depth > 0:
            if css_text.startswith("/*", j):
                k = css_text.find("*/", j+2)
                j = n if k == -1 else k+2
                continue
            ch = css_text[j]
            if ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
            j += 1
        body = css_text[brace+1:j-1] if j <= n else css_text[brace+1:]
        full = css_text[i:j]
        blocks.append((header, body, full))
        i = j
    return blocks

def selector_tokens(selector):
    """Extract simple tokens: classes (.x), ids (#y), tags (div, h1)."""
    classes, ids, tags = set(), set(), set()
    for m in SIMPLE_SELECTOR_RE.finditer(selector):
        g = m.group(0)
        if g.startswith('.'):
            classes.add(g[1:])
        elif g.startswith('#'):
            ids.add(g[1:])
        else:
            tags.add(g)
    return classes, ids, tags

def rule_defines_any_used_vars(body, used_vars):
    """Return True if rule body defines any custom property that is in used_vars."""
    for m in CUSTOM_PROP_DEF_RE.finditer(body):
        if m.group(1) in used_vars:
            return True
    return False

def rule_is_root_or_global(header):
    h = header.strip()
    return h == ":root" or h == "html" or h == "body" or h.startswith("@font-face")

def should_keep_rule(header, body, used_classes, used_ids, used_tags, used_vars):
    if header.startswith("@"):
        # handled by wrapper (we keep at-rules if they contain kept inner rules)
        return False

    if rule_is_root_or_global(header):
        return True

    # Split comma selectors and keep if ANY matches
    for sel in [s.strip() for s in header.split(",") if s.strip()]:
        cls, ids, tgs = selector_tokens(sel)
        if (cls & used_classes) or (ids & used_ids) or (tgs & used_tags):
            return True

    # Keep if this rule defines a used CSS var
    if rule_defines_any_used_vars(body, used_vars):
        return True

    return False

def prune(css_text, usage, keep_keyframes=True):
    used_classes = set(usage.get("classes", []))
    used_ids     = set(usage.get("ids", []))
    used_tags    = set(usage.get("tags", [])) | {"html", "body"}  # always consider basic tags used
    used_vars    = set(usage.get("css_vars_used", []))

    kept = []
    removed = []
    keyframes_blocks = []

    blocks = split_top_level_blocks(css_text)

    for header, body, full in blocks:
        if header.startswith("@media") or header.startswith("@supports"):
            # Recursively process inner rules
            inner = split_top_level_blocks(body)
            kept_inner = []
            for ih, ib, ifull in inner:
                if ih.startswith("@"):  # nested at-rule inside media
                    kept_inner.append(ifull)  # keep nested at-rules conservatively
                    continue
                if should_keep_rule(ih, ib, used_classes, used_ids, used_tags, used_vars):
                    kept_inner.append(ifull)
            if kept_inner:
                # rebuild at-rule with only kept inner
                rebuilt = f"{header}{{\n" + "\n".join(kept_inner) + "\n}\n"
                kept.append(rebuilt)
            else:
                removed.append(header)
            continue

        if header.startswith("@keyframes"):
            if keep_keyframes:
                kept.append(full)
            else:
                removed.append(header)
            continue

        if header.startswith("@"):
            # other at-rules (font-face, etc.)
            if rule_is_root_or_global(header):
                kept.append(full)
            else:
                # Keep @font-face, @layer, etc. conservatively
                kept.append(full)
            continue

        if should_keep_rule(header, body, used_classes, used_ids, used_tags, used_vars):
            kept.append(full)
        else:
            removed.append(header)

    pruned_css = "\n\n".join(kept) + "\n"
    return pruned_css, removed

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--css", default="styles.css", help="Path to styles.css")
    ap.add_argument("--usage", default="used_styles.json", help="JSON from scan_html_usage.py")
    ap.add_argument("--out", default="styles.pruned.css", help="Output pruned CSS")
    ap.add_argument("--drop-keyframes", action="store_true", help="Drop all @keyframes blocks (default keep)")
    ap.add_argument("--report", default="prune_report.txt", help="Write a small report here")
    args = ap.parse_args()

    css_text = Path(args.css).read_text(encoding="utf-8", errors="ignore")
    usage = json.loads(Path(args.usage).read_text(encoding="utf-8"))

    pruned, removed = prune(css_text, usage, keep_keyframes=not args.drop_keyframes)
    Path(args.out).write_text(pruned, encoding="utf-8")

    report = [
        f"Original CSS: {len(css_text):,} chars",
        f"Pruned CSS:   {len(pruned):,} chars",
        f"Removed blocks: {len(removed)}",
        "",
        "First 40 removed headers:",
        *removed[:40]
    ]
    Path(args.report).write_text("\n".join(report), encoding="utf-8")

    print(f"Wrote {args.out} and {args.report}")

if __name__ == "__main__":
    main()
