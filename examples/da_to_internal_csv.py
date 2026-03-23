#!/usr/bin/env python3
"""
Example: export DreamApply data and map to internal CSV schema.

Usage:
  DREAMAPPLY_BASE_URL="https://yourinstance.dreamapply.com" \
  DREAMAPPLY_API_KEY="..." \
  python3 examples/da_to_internal_csv.py --status accepted --status submitted --output da_input.csv
"""

from __future__ import annotations

import argparse
import os
import sys

from python_da import DreamApplyApiClient, build_rows_from_api_payloads, write_rows_to_csv


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="DreamApply -> internal CSV export")
    parser.add_argument(
        "--status",
        action="append",
        dest="statuses",
        default=[],
        help="Application status filter. Repeatable.",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=500,
        help="Limit for list endpoints (if supported by the API).",
    )
    parser.add_argument(
        "--output",
        required=True,
        help="Output CSV path.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    base_url = os.getenv("DREAMAPPLY_BASE_URL", "").strip()
    api_key = os.getenv("DREAMAPPLY_API_KEY", "").strip()
    if not base_url or not api_key:
        print("Missing DREAMAPPLY_BASE_URL or DREAMAPPLY_API_KEY", file=sys.stderr)
        return 2

    client = DreamApplyApiClient(base_url=base_url, api_key=api_key)

    applications_payload = client.list_applications(limit=args.limit)
    applicants_payload = client.list_applicants(limit=args.limit)
    offers_payload = client.list_offers(limit=args.limit)
    programs_payload = client.list_programs(limit=args.limit)

    rows = build_rows_from_api_payloads(
        applicants_payload=applicants_payload,
        applications_payload=applications_payload,
        offers_payload=offers_payload,
        programs_payload=programs_payload,
        statuses=args.statuses or None,
    )
    write_rows_to_csv(rows, args.output)

    print(f"Wrote {len(rows)} rows to {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

