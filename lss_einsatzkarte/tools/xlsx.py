"""Minimaler XLSX-Leser ohne Zusatzpakete (liest alle Blätter als Zeilen mit Spaltenbuchstaben)."""
import zipfile,re,sys,json
import xml.etree.ElementTree as ET
NS={"m":"http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
def read(path):
    z=zipfile.ZipFile(path)
    shared=[]
    if "xl/sharedStrings.xml" in z.namelist():
        for si in ET.fromstring(z.read("xl/sharedStrings.xml")).findall("m:si",NS):
            shared.append("".join(t.text or "" for t in si.iter("{%s}t"%NS["m"])))
    wb=ET.fromstring(z.read("xl/workbook.xml"))
    sheets=[s.get("name") for s in wb.find("m:sheets",NS)]
    out={}
    for i,name in enumerate(sheets,1):
        f=f"xl/worksheets/sheet{i}.xml"
        if f not in z.namelist(): continue
        rows=[]
        for r in ET.fromstring(z.read(f)).iter("{%s}row"%NS["m"]):
            row={}
            for c in r.findall("m:c",NS):
                col=re.match(r"[A-Z]+",c.get("r")).group(0)
                v=c.find("m:v",NS); t=c.get("t")
                if t=="inlineStr": val="".join(x.text or "" for x in c.iter("{%s}t"%NS["m"]))
                elif v is None: val=""
                elif t=="s": val=shared[int(v.text)]
                else: val=v.text
                row[col]=val
            rows.append(row)
        out[name]=rows
    return out
