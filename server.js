"use strict";

const path = require("path");
const express = require("express");
const compression = require("compression");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression
app.use(compression());

// Serve the static site from the inner folder where the HTML lives
// Folder structure: <repo>/Cleeve-main/{index.html, cart.html, ...}
const staticDir = path.join(__dirname, "Cleeve-main");
app.use(
  express.static(staticDir, {
    index: "index.html",
    extensions: ["html"],
    maxAge: "1h",
  })
);

// Lightweight Instagram recent media proxy (requires env vars)
// Set IG_TOKEN and IG_USER_ID in your environment to enable
app.get("/api/instagram/recent", async (_req, res) => {
  const token = process.env.IG_TOKEN;
  const userId = process.env.IG_USER_ID;
  if (!token || !userId) {
    return res.status(501).json({
      error: "Instagram feed not configured",
      howTo:
        "Set IG_TOKEN and IG_USER_ID environment variables to enable recent posts.",
    });
  }
  try {
    // Lazy import to avoid unused dep when not configured
    const fetch = (await import("node-fetch")).default;
    const url = new URL(`https://graph.instagram.com/${userId}/media`);
    url.searchParams.set(
      "fields",
      "id,caption,permalink,media_url,thumbnail_url,media_type,timestamp,children{media_url,thumbnail_url,media_type}"
    );
    url.searchParams.set("access_token", token);
    url.searchParams.set("limit", "6");

    const igRes = await fetch(url.toString());
    if (!igRes.ok) {
      const body = await igRes.text();
      return res.status(igRes.status).json({ error: "Upstream error", body });
    }
    const data = await igRes.json();
    return res.json({ items: data.data || [] });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server error", message: String(err) });
  }
});

// Explicit routes
app.get("/", (_req, res) => {
  res.sendFile(path.join(staticDir, "index.html"));
});

app.get("/cart", (_req, res) => {
  res.sendFile(path.join(staticDir, "cart.html"));
});

// Fallback 404
app.use((_req, res) => {
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Cleeve server running at http://localhost:${PORT}`);
});
