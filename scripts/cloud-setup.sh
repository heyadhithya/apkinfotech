#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

for tool in curl tar sha256sum python3 node npm; do
  command -v "$tool" >/dev/null || { printf 'Missing required tool: %s\n' "$tool" >&2; exit 1; }
done

case "$(uname -s)/$(uname -m)" in
  Linux/x86_64)
    target=x86_64-unknown-linux-musl
    digest=bc2b8902b0d9c796c82ef45f16ae2307e17757afeca5ee156235a3dc7bda5f89 ;;
  Linux/aarch64|Linux/arm64)
    target=aarch64-unknown-linux-gnu
    digest=d1cc49dfa2cd443fc32625444b59fe616b6c80478cca210985118347174dd758 ;;
  *) printf 'Cloud setup supports Linux x86_64 and arm64.\n' >&2; exit 1 ;;
esac

mkdir -p .tools/bin
if [[ ! -x .tools/bin/rtk ]] || [[ "$(.tools/bin/rtk --version)" != 'rtk 0.50.0' ]]; then
  staging=$(mktemp -d)
  trap 'rm -rf "$staging"' EXIT
  curl -fsSL --retry 2 "https://github.com/rtk-ai/rtk/releases/download/v0.50.0/rtk-$target.tar.gz" -o "$staging/rtk.tar.gz"
  printf '%s  %s\n' "$digest" "$staging/rtk.tar.gz" | sha256sum --check --status
  tar -xzf "$staging/rtk.tar.gz" -C "$staging"
  install -m 755 "$staging/rtk" .tools/bin/rtk
fi

[[ "$(.tools/bin/rtk --version)" == 'rtk 0.50.0' ]]
export IMPECCABLE_HOME="${IMPECCABLE_HOME:-$PWD/.tools/impeccable}"
.agents/skills/impeccable/scripts/impeccable engine-probe
export npm_config_cache="${npm_config_cache:-$PWD/.tools/npm-cache}"
npm ci --no-audit --no-fund
python3 scripts/check-setup.py
