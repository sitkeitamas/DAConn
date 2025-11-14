# DreamApply SDK Examples

This directory contains example scripts demonstrating how to use the DreamApply JavaScript SDK.

## Examples

### basic-usage.js
Basic examples showing common SDK operations:
- Creating applicants
- Retrieving applicant details
- Listing programs
- Submitting applications
- Updating application status

**Usage:**
```bash
node examples/basic-usage.js
```

**Environment Variables:**
- `DREAMAPPLY_API_KEY` - Your DreamApply API key
- `DREAMAPPLY_BASE_URL` - Your DreamApply instance URL

### generate-test-data.js
Comprehensive test data generator that:
- Creates 5 applicants with realistic data
- Each applicant makes 1-5 applications (applicant 1 makes 1, applicant 2 makes 2, etc.)
- Uploads 3 documents per application
- Generates summary report

**Usage:**
```bash
node examples/generate-test-data.js
```

**What it generates:**
- 5 applicants with unique names, emails, and contact information
- 15 total applications (1+2+3+4+5 = 15)
- ~45 documents (3 per application)
- Results saved to `test-data-results.json`

**Environment Variables:**
- `DREAMAPPLY_API_KEY` - Your DreamApply API key
- `DREAMAPPLY_BASE_URL` - Your DreamApply instance URL

## Configuration

Set environment variables before running examples:

```bash
export DREAMAPPLY_API_KEY="your-api-key-here"
export DREAMAPPLY_BASE_URL="https://yourinstance.dreamapply.com"
```

Or create a `.env` file (not included in git):
```
DREAMAPPLY_API_KEY=your-api-key-here
DREAMAPPLY_BASE_URL=https://yourinstance.dreamapply.com
```

## Requirements

- Node.js 18+ (for FormData and fetch support)
- Valid DreamApply API key
- DreamApply instance with API enabled

