#!/usr/bin/env python3
"""
Scan HTML for used style tokens.

Collects:
- classes used (".foo" -> "foo")
- ids used ("#bar" -> "bar")
- tag names used ("div", "h1", etc.)
- CSS variable references: var(--token)
- inline <style> blocks are scanned for var(--token) as well

Writes a JSON like:
{
  "classes": [...],
  "ids": [...],
  "tags": [...],
  "css_vars_used": [...]
}
"""

import argparse, json, re, sys
from pathlib import Path
from html.parser import HTMLParser

VAR_RE = re.compile(r"var\(\s*--([a-zA-Z0-9_-]+)")

class UsageHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.classes = set()
        self.ids = set()
        self.tags = set()
        self.css_vars_used = set()
        self._in_style = False
        self._style_buffer = []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        attr_dict = dict(attrs)

        cls = attr_dict.get('class')
        if cls:
            # class="a b   c"
            for c in re.split(r'\s+', cls.strip()):
                if c:
                    self.classes.add(c)

        el_id = attr_dict.get('id')
        if el_id:
            self.ids.add(el_id)

        # inline style="..."
        inline = attr_dict.get('style')
        if inline:
            for m in VAR_RE.finditer(inline):
                self.css_vars_used.add(m.group(1))

    def handle_startendtag(self, tag, attrs):
        # Self-closing tags — treat same as start
        self.handle_starttag(tag, attrs)

    def handle_endtag(self, tag):
        if self._in_style and tag.lower() == 'style':
            css = ''.join(self._style_buffer)
            self._style_buffer.clear()
            self._in_style = False
            for m in VAR_RE.finditer(css):
                self.css_vars_used.add(m.group(1))

    def handle_data(self, data):
        if self._in_style:
            self._style_buffer.append(data)

    def handle_comment(self, data):
        pass

    def handle_decl(self, decl):
        pass

    def handle_pi(self, data):
        pass

    def handle_starttag_style(self):
        self._in_style = True

    def handle_starttag(self, tag, attrs):
        # overridden again to capture <style> start and still do normal work
        self.tags.add(tag.lower())
        if tag.lower() == 'style':
            self._in_style = True

        attr_dict = dict(attrs)
        cls = attr_dict.get('class')
        if cls:
            for c in re.split(r'\s+', cls.strip()):
                if c:
                    self.classes.add(c)

        el_id = attr_dict.get('id')
        if el_id:
            self.ids.add(el_id)

        inline = attr_dict.get('style')
        if inline:
            for m in VAR_RE.finditer(inline):
                self.css_vars_used.add(m.group(1))

def scan_paths(paths):
    parser = UsageHTMLParser()
    for p in paths:
        text = Path(p).read_text(encoding='utf-8', errors='ignore')
        parser.feed(text)
        # Also catch var(--x) anywhere in the raw HTML text
        for m in VAR_RE.finditer(text):
            parser.css_vars_used.add(m.group(1))
    return {
        "classes": sorted(parser.classes),
        "ids": sorted(parser.ids),
        "tags": sorted(parser.tags),
        "css_vars_used": sorted(parser.css_vars_used),
    }

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", default="slides", help="Directory containing HTML files (default: slides)")
    ap.add_argument("--extra", nargs="*", default=[], help="Extra HTML files to include (e.g., index.html)")
    ap.add_argument("--out", default="used_styles.json", help="Output JSON report")
    args = ap.parse_args()

    root = Path(args.root)
    html_files = [str(p) for p in root.rglob("*.html")]
    for e in args.extra:
        if e and Path(e).suffix.lower() == ".html":
            html_files.append(e)

    if not html_files:
        print("No HTML files found.", file=sys.stderr)
        sys.exit(1)

    usage = scan_paths(html_files)
    Path(args.out).write_text(json.dumps(usage, indent=2), encoding="utf-8")
    print(f"Wrote {args.out} with {len(usage['classes'])} classes, {len(usage['ids'])} ids, "
          f"{len(usage['tags'])} tags, {len(usage['css_vars_used'])} css vars.")

if __name__ == "__main__":
    main()
