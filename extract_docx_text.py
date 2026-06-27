import zipfile
import xml.etree.ElementTree as ET
import re
from pathlib import Path

root = Path(__file__).parent

def extract_text(docx_path):
    with zipfile.ZipFile(docx_path) as z:
        xml = z.read('word/document.xml')
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    root = ET.fromstring(xml)
    texts = []
    for elem in root.iter():
        tag = elem.tag
        if tag.endswith('}t') or tag == 't':
            if elem.text:
                texts.append(elem.text)
        elif tag.endswith('}tab') or tag == 'tab':
            texts.append('\t')
        elif tag.endswith('}br') or tag == 'br' or tag.endswith('}cr') or tag == 'cr':
            texts.append('\n')
    text = ''.join(texts)
    text = re.sub(r'\n\s*\n+', '\n\n', text)
    return text

for doc in ['UI+Selenium+java+Hybrid.docx', 'API in detail.docx', 'REST.docx', 'BDD.docx', 'Master Doc.docx']:
    path = root / doc
    out = root / (doc.replace('.docx', '.clean.txt'))
    try:
        text = extract_text(path)
        text = text.replace('â€™', "'").replace('â€œ', '"').replace('â€', '"').replace('â€', '').replace('â€“', '-')
        out.write_text(text, encoding='utf-8')
        print(f'Wrote {out.name}')
    except Exception as e:
        print(f'ERROR {doc}: {e}')
