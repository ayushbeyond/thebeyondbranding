#!/usr/bin/env python3
"""Injects site-wide <head> snippets (Google tag GTM-T6XNBKNC + Microsoft Clarity) into every HTML page.

Runs automatically at the end of build.py, and covers hand-made pages too
(stay/, pitch/, for/, showcase/). Safe to run any number of times.
Run on its own with:  python3 _build/inject_head.py
"""
import os, re

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

CLARITY_ID = "z7a3izqphe"
MARK = "<!-- clarity -->"
CLARITY = MARK + """<script type="text/javascript">
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "%s");
</script>""" % CLARITY_ID

GTAG_ID = "GTM-T6XNBKNC"
GMARK = "<!-- google-tag -->"
GTAG = GMARK + """<script async src="https://www.googletagmanager.com/gtm.js?id=%s"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
</script>""" % GTAG_ID

SKIP_DIRS = {".git", "_build", "node_modules", "assets"}


def inject(root=ROOT):
    n = 0
    for dirpath, dirs, files in os.walk(root):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for f in files:
            if not f.endswith(".html"):
                continue
            path = os.path.join(dirpath, f)
            s = open(path, encoding="utf-8").read()
            orig = s
            if "</head>" not in s:
                continue
            # Google tag: immediately after <head>, once per page
            if GMARK not in s and GTAG_ID not in s:
                s = re.sub(r"(<head[^>]*>)", lambda m: m.group(1) + "\n" + GTAG, s, count=1, flags=re.I)
            if MARK not in s and "clarity.ms/tag" not in s:
                s = re.sub(r"</head>", CLARITY + "\n</head>", s, count=1, flags=re.I)
            if s != orig:
                open(path, "w", encoding="utf-8").write(s)
                n += 1
    return n


if __name__ == "__main__":
    print(f"head snippets added/updated on {inject()} pages")
