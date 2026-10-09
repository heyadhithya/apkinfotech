#!/usr/bin/env python3
from pathlib import Path
import re
import subprocess

root = Path(__file__).resolve().parent.parent
skills = root / ".agents/skills"
required = {
    "impeccable", "ponytail", "grill-me", "grilling", "using-superpowers",
    "brainstorming", "writing-plans", "systematic-debugging",
    "test-driven-development", "verification-before-completion",
}
found = set()
for manifest in sorted(skills.glob("*/SKILL.md")):
    body = manifest.read_text()
    assert body.startswith("---\n"), f"Missing frontmatter: {manifest}"
    metadata = body.split("---", 2)[1]
    name = re.search(r"^name: (.+)$", metadata, re.MULTILINE)
    assert name and "description:" in metadata, f"Invalid skill: {manifest}"
    assert name[1] not in found, f"Duplicate skill: {name[1]}"
    found.add(name[1])
assert required <= found, f"Missing skills: {required - found}"
for path in ("AGENTS.md", "PRODUCT.md", "docs/CLOUD.md", "docs/TOOLS.md"):
    content = (root / path).read_text()
    assert "/home/adi" not in content, f"Laptop-specific path: {path}"
for skill in ("impeccable", "superpowers", "ponytail", "grilling"):
    assert (root / f"docs/licenses/{skill}.txt").stat().st_size > 100
subprocess.run(["bash", "-n", str(root / "scripts/cloud-setup.sh")], check=True)
version = subprocess.check_output([str(root / ".tools/bin/rtk"), "--version"], text=True).strip()
assert version == "rtk 0.50.0", version
probe = subprocess.check_output(
    [str(skills / "impeccable/scripts/impeccable"), "engine-probe"], text=True
).strip()
assert probe == "impeccable-engine 0.1.12", probe
print(f"Setup OK: {len(found)} skills, RTK 0.50.0, Impeccable engine 0.1.12, portable project docs.")
