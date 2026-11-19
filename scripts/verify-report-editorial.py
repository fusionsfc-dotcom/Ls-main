"""Ensure the report redesign preserves every published text segment and route."""
import hashlib
import json
from html.parser import HTMLParser
from pathlib import Path


class ReportText(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
        self.skip = 0

    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'):
            self.skip += 1

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.skip = max(0, self.skip - 1)

    def handle_data(self, data):
        if not self.skip and data.strip():
            self.text.append(data.strip())


baseline = json.loads(Path('docs/report-content-baseline-20261026.json').read_text())
for report in baseline:
    route = report['route']
    standalone = route.endswith('.html')
    html = Path('dist' + route + ('' if standalone else '/index.html')).read_text()
    parsed = ReportText()
    parsed.feed(html)
    serialized = json.dumps(parsed.text, ensure_ascii=False, separators=(',', ':'))
    assert hashlib.sha256(serialized.encode()).hexdigest() == report['textHash'], route + ': report content changed'
    assert ('ls-daily-editorial' if standalone else 'ls-report-document') in html, route + ': editorial styles missing'
print(f'PASS {len(baseline)} reports: text unchanged, editorial treatment present.')
