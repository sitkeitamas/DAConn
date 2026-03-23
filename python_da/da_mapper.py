"""
DreamApply -> internal source row mapper.

This module provides:
1) a minimal DreamApply API client
2) mapping logic that produces rows compatible with the expected input schema
   described in src/inputfile-elvart-mezok.md
"""

from __future__ import annotations

import csv
import json
from dataclasses import dataclass
from typing import Any, Dict, Iterable, List, Mapping, Optional, Sequence
from urllib.parse import urlencode
from urllib.request import Request, urlopen


EXPECTED_INPUT_COLUMNS: List[str] = [
    "Date of birth",
    "Family name(s)",
    "Given name(s)",
    "Mother's previous family name",
    "Mother's given name(s)",
    "Social security number (if any)",
    "Gender",
    "Place of birth",
    "Country of birth",
    "Address: City, town, village",
    "Address: Country",
    "Address: Street address",
    "Address: House number",
    "Address: Postal code",
    "E-mail",
    "Képzéskód",
    "Offer course name",
    "Offer score (extra)",
    "Tanterv",
    "Önktg",
    "Önktg HU",
    "Önktg EN",
    "Pénznem",
    "Citizenship",
    "TO Neptun kód",
]


@dataclass(frozen=True)
class MapperConfig:
    """
    Configure alias names for instance-specific custom fields.

    Values are candidate names looked up in applicant/application/program/offer
    custom field maps.
    """

    mother_previous_family_name_aliases: Sequence[str] = (
        "mother_previous_family_name",
        "motherPreviousFamilyName",
        "Mother's previous family name",
    )
    mother_given_name_aliases: Sequence[str] = (
        "mother_given_name",
        "motherGivenName",
        "Mother's given name(s)",
    )
    kepzeskod_aliases: Sequence[str] = ("kepzeskod", "Kepzeskod", "Képzéskód")
    tanterv_aliases: Sequence[str] = ("tanterv", "Tanterv")
    onktg_aliases: Sequence[str] = ("onktg", "Onktg", "Önktg")
    onktg_hu_aliases: Sequence[str] = ("onktg_hu", "Onktg HU", "Önktg HU")
    onktg_en_aliases: Sequence[str] = ("onktg_en", "Onktg EN", "Önktg EN")
    penznem_aliases: Sequence[str] = ("penznem", "Penznem", "Pénznem", "currency")
    to_neptun_kod_aliases: Sequence[str] = ("to_neptun_kod", "TO Neptun kod", "TO Neptun kód", "neptun_code")
    social_security_aliases: Sequence[str] = ("social_security_number", "ssn", "national_id")
    citizenship_aliases: Sequence[str] = ("citizenship", "nationality")


class DreamApplyApiClient:
    """Minimal client for DreamApply public API."""

    def __init__(self, base_url: str, api_key: str, timeout_sec: int = 30) -> None:
        self.base_url = base_url.rstrip("/")
        self.api_key = api_key
        self.timeout_sec = timeout_sec

    def _get(self, path: str, params: Optional[Mapping[str, Any]] = None) -> Any:
        query = ""
        if params:
            query = "?" + urlencode({k: v for k, v in params.items() if v is not None})
        url = f"{self.base_url}{path}{query}"
        request = Request(
            url=url,
            method="GET",
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Accept": "application/json",
            },
        )
        with urlopen(request, timeout=self.timeout_sec) as response:
            payload = response.read().decode("utf-8")
            return json.loads(payload) if payload else None

    def list_applicants(self, **filters: Any) -> Any:
        return self._get("/api/applicants", filters)

    def list_applications(self, **filters: Any) -> Any:
        return self._get("/api/applications", filters)

    def list_offers(self, **filters: Any) -> Any:
        return self._get("/api/offers", filters)

    def list_programs(self, **filters: Any) -> Any:
        return self._get("/api/programs", filters)


def _as_list(payload: Any) -> List[Dict[str, Any]]:
    """
    Normalize list-like API payloads.

    Handles:
    - [ ... ]
    - { "data": [ ... ] }
    - { "items": [ ... ] }
    """
    if isinstance(payload, list):
        return [x for x in payload if isinstance(x, dict)]
    if isinstance(payload, dict):
        for key in ("data", "items", "results"):
            value = payload.get(key)
            if isinstance(value, list):
                return [x for x in value if isinstance(x, dict)]
    return []


def _coalesce(*values: Any) -> str:
    for value in values:
        if value is None:
            continue
        text = str(value).strip()
        if text:
            return text
    return ""


def _extract_custom_fields(entity: Mapping[str, Any]) -> Dict[str, Any]:
    """
    Return custom field key/value map from common formats.
    """
    fields = entity.get("customFields") or entity.get("custom_fields")
    if isinstance(fields, dict):
        return dict(fields)
    if isinstance(fields, list):
        out: Dict[str, Any] = {}
        for item in fields:
            if not isinstance(item, dict):
                continue
            key = item.get("name") or item.get("key") or item.get("code")
            if key:
                out[str(key)] = item.get("value")
        return out
    return {}


def _pick(entity_maps: Iterable[Mapping[str, Any]], aliases: Sequence[str]) -> str:
    alias_set = {a.lower(): a for a in aliases}
    for data in entity_maps:
        for key, value in data.items():
            if str(key).lower() in alias_set:
                return _coalesce(value)
    return ""


def map_record_to_input_row(
    applicant: Mapping[str, Any],
    application: Mapping[str, Any],
    offer: Optional[Mapping[str, Any]] = None,
    program: Optional[Mapping[str, Any]] = None,
    config: Optional[MapperConfig] = None,
) -> Dict[str, str]:
    """
    Convert mixed DA entities into one normalized row.
    """
    cfg = config or MapperConfig()
    offer = offer or {}
    program = program or {}

    app_custom = _extract_custom_fields(applicant)
    appl_custom = _extract_custom_fields(application)
    offer_custom = _extract_custom_fields(offer)
    program_custom = _extract_custom_fields(program)
    all_custom = (app_custom, appl_custom, offer_custom, program_custom)

    address = applicant.get("address") if isinstance(applicant.get("address"), dict) else {}
    mother = applicant.get("mother") if isinstance(applicant.get("mother"), dict) else {}
    birth = applicant.get("birth") if isinstance(applicant.get("birth"), dict) else {}

    row: Dict[str, str] = {column: "" for column in EXPECTED_INPUT_COLUMNS}

    row["Date of birth"] = _coalesce(
        applicant.get("dateOfBirth"),
        birth.get("date"),
        applicant.get("birthDate"),
    )
    row["Family name(s)"] = _coalesce(applicant.get("lastName"), applicant.get("familyName"))
    row["Given name(s)"] = _coalesce(applicant.get("firstName"), applicant.get("givenName"))
    row["Mother's previous family name"] = _coalesce(
        mother.get("previousFamilyName"),
        _pick(all_custom, cfg.mother_previous_family_name_aliases),
    )
    row["Mother's given name(s)"] = _coalesce(
        mother.get("givenName"),
        _pick(all_custom, cfg.mother_given_name_aliases),
    )
    row["Social security number (if any)"] = _coalesce(
        applicant.get("socialSecurityNumber"),
        applicant.get("nationalId"),
        _pick(all_custom, cfg.social_security_aliases),
    )
    row["Gender"] = _coalesce(applicant.get("gender"))
    row["Place of birth"] = _coalesce(applicant.get("placeOfBirth"), birth.get("place"))
    row["Country of birth"] = _coalesce(
        applicant.get("countryOfBirth"),
        birth.get("country"),
    )
    row["Address: City, town, village"] = _coalesce(address.get("city"), applicant.get("city"))
    row["Address: Country"] = _coalesce(address.get("country"), applicant.get("country"))
    row["Address: Street address"] = _coalesce(address.get("street"), applicant.get("street"))
    row["Address: House number"] = _coalesce(address.get("houseNumber"))
    row["Address: Postal code"] = _coalesce(address.get("postalCode"), address.get("zip"))
    row["E-mail"] = _coalesce(applicant.get("email"))
    row["Képzéskód"] = _coalesce(
        application.get("programCode"),
        program.get("code"),
        _pick(all_custom, cfg.kepzeskod_aliases),
    )
    row["Offer course name"] = _coalesce(
        offer.get("courseName"),
        offer.get("name"),
        application.get("programName"),
        program.get("name"),
    )
    row["Offer score (extra)"] = _coalesce(offer.get("score"), application.get("offerScore"))
    row["Tanterv"] = _coalesce(_pick(all_custom, cfg.tanterv_aliases))
    row["Önktg"] = _coalesce(_pick(all_custom, cfg.onktg_aliases))
    row["Önktg HU"] = _coalesce(_pick(all_custom, cfg.onktg_hu_aliases))
    row["Önktg EN"] = _coalesce(_pick(all_custom, cfg.onktg_en_aliases))
    row["Pénznem"] = _coalesce(offer.get("currency"), _pick(all_custom, cfg.penznem_aliases))
    row["Citizenship"] = _coalesce(
        applicant.get("citizenship"),
        applicant.get("nationality"),
        _pick(all_custom, cfg.citizenship_aliases),
    )
    row["TO Neptun kód"] = _coalesce(
        applicant.get("neptunCode"),
        application.get("neptunCode"),
        _pick(all_custom, cfg.to_neptun_kod_aliases),
    )

    return row


def build_rows_from_api_payloads(
    applicants_payload: Any,
    applications_payload: Any,
    offers_payload: Any,
    programs_payload: Any,
    statuses: Optional[Sequence[str]] = None,
    config: Optional[MapperConfig] = None,
) -> List[Dict[str, str]]:
    """
    Build rows by joining applicant/application/offer/program datasets.
    """
    applicants = _as_list(applicants_payload)
    applications = _as_list(applications_payload)
    offers = _as_list(offers_payload)
    programs = _as_list(programs_payload)

    applicants_by_id = {str(a.get("id")): a for a in applicants if a.get("id") is not None}
    programs_by_id = {str(p.get("id")): p for p in programs if p.get("id") is not None}

    offers_by_application_id: Dict[str, Dict[str, Any]] = {}
    for offer in offers:
        app_id = offer.get("applicationId")
        if app_id is not None and str(app_id) not in offers_by_application_id:
            offers_by_application_id[str(app_id)] = offer

    allowed_statuses = {s.strip() for s in statuses} if statuses else None
    rows: List[Dict[str, str]] = []

    for application in applications:
        if allowed_statuses:
            app_status = str(application.get("status", "")).strip()
            if app_status not in allowed_statuses:
                continue

        applicant_id = application.get("applicantId")
        applicant = applicants_by_id.get(str(applicant_id))
        if not applicant:
            continue

        application_id = application.get("id")
        offer = offers_by_application_id.get(str(application_id))
        program = programs_by_id.get(str(application.get("programId")))

        row = map_record_to_input_row(applicant, application, offer, program, config=config)
        rows.append(row)

    return rows


def write_rows_to_csv(rows: Sequence[Mapping[str, Any]], output_path: str) -> None:
    with open(output_path, "w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=EXPECTED_INPUT_COLUMNS)
        writer.writeheader()
        for row in rows:
            writer.writerow({key: row.get(key, "") for key in EXPECTED_INPUT_COLUMNS})

