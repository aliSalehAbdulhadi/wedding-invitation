"""Small static-site smoke check; Python standard library only."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import os
import re
import sys


PUBLIC = Path(__file__).resolve().parents[1] / "public"


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.source = source
        self.ids = set()
        self.refs = []
        self.errors = []
        self.h1_count = 0

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag == "h1":
            self.h1_count += 1
        if tag == "html" and not attrs.get("lang"):
            self.errors.append("html must declare a language")
        if tag == "img" and "alt" not in attrs:
            self.errors.append("image is missing alt text")
        if "id" in attrs:
            if attrs["id"] in self.ids:
                self.errors.append(f"duplicate id: {attrs['id']}")
            self.ids.add(attrs["id"])
        for name in ("href", "src"):
            if attrs.get(name):
                self.refs.append(attrs[name])


def check_site(public):
    errors = []
    pages = {}
    if not (public / "index.html").is_file():
        errors.append("missing public/index.html")
    for source in sorted(public.rglob("*.html")):
        page = Page(source)
        page.feed(source.read_text(encoding="utf-8"))
        pages[source.resolve()] = page
        errors.extend(f"{source.name}: {error}" for error in page.errors)
        if page.h1_count != 1:
            errors.append(f"{source.name}: expected one h1, found {page.h1_count}")

    references = [(page.source, ref) for page in pages.values() for ref in page.refs]
    for source in sorted(public.rglob("*.css")):
        css = source.read_text(encoding="utf-8")
        references.extend((source, match.strip().strip("\"'")) for match in re.findall(r"url\(([^)]+)\)", css))

    for source, ref in references:
        url = urlsplit(ref)
        if url.scheme or url.netloc:
            continue
        if url.path.startswith("/"):
            errors.append(f"{source.name}: use a relative URL for subdirectory hosting: {ref}")
            continue
        requested = Path(os.path.abspath(source.parent / unquote(url.path))) if url.path else source.absolute()
        target = requested.resolve()
        if not target.is_relative_to(public.resolve()):
            errors.append(f"{source.name}: URL escapes public/: {ref}")
            continue
        if not target.is_file():
            errors.append(f"{source.name}: missing local file: {ref}")
            continue
        # Check real directory entry spelling even on case-insensitive Windows.
        current = public.resolve()
        for part in requested.relative_to(current).parts:
            if part not in {entry.name for entry in current.iterdir()}:
                errors.append(f"{source.name}: filename case mismatch: {ref}")
                break
            current /= part
        if url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
            errors.append(f"{source.name}: missing anchor: {ref}")

    return errors, len(pages), len(references)


if __name__ == "__main__":
    failures, page_count, reference_count = check_site(PUBLIC)
    if failures:
        print("\n".join(f"FAIL {failure}" for failure in failures))
        sys.exit(1)
    print(f"PASS {page_count} HTML page(s), {reference_count} local URL reference(s).")
    print("This smoke check does not replace browser, accessibility, or launch review.")
