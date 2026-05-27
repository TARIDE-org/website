# SPDX-License-Identifier: Apache-2.0
# SPDX-FileCopyrightText: 2026 Stichting TARIDE (TARIDE Foundation)
#
# Reproducible weasyprint image for generating the doc PDFs at deploy time.
# Built once on the runner and cached; avoids installing weasyprint's system
# libraries (Pango, Cairo, etc.) on the shared host.
FROM python:3.12-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
      libpango-1.0-0 \
      libpangocairo-1.0-0 \
      libpangoft2-1.0-0 \
      libgdk-pixbuf-2.0-0 \
      libcairo2 \
      libffi8 \
      fonts-liberation \
 && rm -rf /var/lib/apt/lists/*

# pydyf is pinned: weasyprint 62.3 predates pydyf 0.11's Stream API change,
# which otherwise throws "'super' object has no attribute 'transform'".
RUN pip install --no-cache-dir "weasyprint==62.3" "pydyf==0.10.0"

ENTRYPOINT ["weasyprint"]
