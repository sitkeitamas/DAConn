# DreamApply WebUI Integration Example (runtime credentials)

Ez a minta azt mutatja, hogyan add meg a DreamApply kapcsolatot futás közben
(`base_url`, `api_key`) egy webes felületen keresztül, tartós kulcstárolás
nélkül.

## Cél

- a megrendelő adja meg a DA kapcsolatot a UI-ban
- a backend a kulcsot csak a kérés idejére használja
- nem mentjük adatbázisba vagy `.env`-be
- a kimenet a belső input CSV formátum

## FastAPI endpoint példa

```python
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, HttpUrl, Field
from typing import List, Optional
from fastapi.responses import FileResponse
import tempfile

from python_da import DreamApplyApiClient, build_rows_from_api_payloads, write_rows_to_csv

router = APIRouter(prefix="/integrations/dreamapply", tags=["dreamapply"])


class DreamApplyExportRequest(BaseModel):
    base_url: HttpUrl
    api_key: str = Field(min_length=10)
    statuses: Optional[List[str]] = None
    limit: int = Field(default=500, ge=1, le=5000)


@router.post("/export")
def export_dreamapply_csv(payload: DreamApplyExportRequest):
    # FONTOS: api_key-t ne logolj!
    try:
        client = DreamApplyApiClient(
            base_url=str(payload.base_url).rstrip("/"),
            api_key=payload.api_key,
            timeout_sec=30,
        )

        applications = client.list_applications(limit=payload.limit)
        applicants = client.list_applicants(limit=payload.limit)
        offers = client.list_offers(limit=payload.limit)
        programs = client.list_programs(limit=payload.limit)

        rows = build_rows_from_api_payloads(
            applicants_payload=applicants,
            applications_payload=applications,
            offers_payload=offers,
            programs_payload=programs,
            statuses=payload.statuses,
        )

        tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".csv")
        tmp.close()
        write_rows_to_csv(rows, tmp.name)

        return FileResponse(
            tmp.name,
            media_type="text/csv",
            filename="da_export_internal_input.csv",
        )
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Export failed: {exc}")
```

## React form példa

```jsx
import { useState } from "react";
import axios from "axios";

export default function DreamApplyExportForm() {
  const [baseUrl, setBaseUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [statuses, setStatuses] = useState(["accepted"]);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/integrations/dreamapply/export",
        {
          base_url: baseUrl,
          api_key: apiKey,
          statuses,
          limit: 500,
        },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "da_export_internal_input.csv";
      a.click();
      window.URL.revokeObjectURL(url);
      setApiKey("");
    } catch (err) {
      alert(err?.response?.data?.detail || "Export error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <label>DreamApply Base URL</label>
      <input
        type="url"
        required
        value={baseUrl}
        onChange={(e) => setBaseUrl(e.target.value)}
        placeholder="https://yourinstance.dreamapply.com"
      />

      <label>DreamApply API Key</label>
      <input
        type="password"
        required
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        autoComplete="off"
      />

      <label>Statuses (comma separated)</label>
      <input
        type="text"
        defaultValue="accepted"
        onBlur={(e) =>
          setStatuses(
            e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          )
        }
      />

      <button type="submit" disabled={loading}>
        {loading ? "Export folyamatban..." : "DA export letöltése"}
      </button>
    </form>
  );
}
```

## Security minimum checklist

- ne logold nyersen a request body-t
- `api_key` sose menjen adatbázisba / config fájlba
- frontend oldalon ne mentsd localStorage-be
- HTTPS használata kötelező
- hibalogban maszkold a secret értékeket

