---
title: "Why Moroccan Websites Load Slowly — and How to Fix It"
description: "Most sites built in Morocco fail Core Web Vitals on mobile. The causes are consistent, measurable, and fixable in an afternoon."
date: "2026-06-28"
author: "Kitsu Digital"
tags: [Performance, SEO, Development]
---

Google measures three things about how your site feels to a real user, and it uses those measurements to rank you. Most sites we audit in Morocco fail at least two of them on mobile.

## The three numbers

**Largest Contentful Paint (LCP)** — how long until the main content appears. Target under 2.5 seconds.

**Interaction to Next Paint (INP)** — how quickly the page responds when tapped. Target under 200 milliseconds.

**Cumulative Layout Shift (CLS)** — how much the page jumps around while loading. Target under 0.1.

These are measured on real visitors' devices, not in a lab on your fast laptop. That distinction matters more here than in most markets.

## Why the local context makes it worse

A significant share of Moroccan traffic arrives on mid-range Android phones over a congested mobile network. Two consequences follow.

First, **JavaScript is far more expensive than it looks.** A bundle that parses in 200ms on a MacBook can take well over a second on a 15,000 MAD Android phone. Every framework and plugin you add is paid for by the slowest device in your audience, not the fastest.

Second, **server location is measurable latency.** If your host is in North America, every round trip crosses an ocean. Serving from a European edge location, or any CDN with a presence closer to your users, removes a fixed penalty from every single request.

## The five fixes that account for most of the gap

**Serve modern image formats.** Unoptimised JPEGs and PNGs are the single largest payload on most sites we look at. AVIF or WebP typically cuts image weight by 50 to 80% with no visible quality difference. Always set explicit `width` and `height` so the browser reserves the space — that alone fixes most layout shift.

**Self-host your fonts, and subset them.** A Google Fonts request is a third-party connection before your text can render. Self-hosting with `font-display: swap` removes the round trip. If you serve French and Arabic, subset each script separately rather than shipping one enormous file.

**Delete the JavaScript you are not using.** Audit what you actually ship. Carousel libraries used on one page, analytics tools nobody reads, chat widgets loaded on every route. The Coverage tab in Chrome DevTools shows you exactly what downloaded and never ran.

**Load third-party scripts late.** Analytics, pixels, chat widgets and heat maps should never block your content. Defer them until after the page is interactive.

**Reserve space for anything that arrives late.** Ads, embeds, banners and dynamically injected content are the usual causes of a page that jumps under the user's thumb as they try to tap something.

## Measure before you change anything

Run [PageSpeed Insights](https://pagespeed.web.dev/) and read the **field data** section, not the lab score. Field data is your actual visitors. The lab score is a simulation, and it is the number agencies screenshot when they want to look good.

If you have fewer than 28 days of field data, Google has not collected enough traffic to report it. Use the lab score as a rough guide until it appears, and treat it as directional rather than true.

Performance is not a one-time project. It regresses the moment someone adds a plugin. Measure it on a schedule, or it will quietly decay back to where it started.
