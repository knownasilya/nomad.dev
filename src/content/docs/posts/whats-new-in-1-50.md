---
categories:
  - Announcements
  - Releases
date: "2026-11-12"
description: Your AI can draw cards for your home page and rearrange it, cards that stay up to date with your calendar, Jobs, Notes and drives, a card a Job keeps for you, and a home page for each Space, shared with everyone in it.
title: "Nomad 1.50: a home page your AI can draw"
---

Everything below is in [Nomad 1.50](https://github.com/knownasilya/nomad/releases/tag/v1.50.0), on desktop and Android. Your app updates itself, or you can download it from the release page.

## Pin what your AI draws to your home page

Ask your AI to draw something in the AI Sidebar, like how the sourdough starter did this week, and **Pin to Home** under the drawing keeps it as a card on your [home page](/posts/whats-new-in-1-47/). Your AI also has more to draw with: grids and columns, lists, accordions, calendars, small trend lines, avatars, forms and more.

![The AI Sidebar in light and dark, with a Sourdough starter card: Rise 2.1x with a trend line, 7 feedings, 80% hydration, a feeding schedule, and Pin to Home under it](/posts/whats-new-in-1-50/pin-to-home.webp)

## Ask your AI to change the page

The home page is now something your AI can rearrange. **Customize** at the top has **Ask AI to Change This Page…** and **Add a Card with AI…**. Each one opens the AI Sidebar with the start of a request typed in, so you finish it and press Send. If you don't like the result, **Restore Previous Layout** brings the last one back, and **Reset to Default Layout** goes back to the page as it was. Each card has its own menu too, with **Remove from Home**.

![A home page your AI rearranged, in light and dark: a countdown to the Lisbon trip and a garden tile at the top, Today and My cards tabs, then Coming up, Jobs, Notifications, Latest notes and Latest files](/posts/whats-new-in-1-50/home-by-ai.webp)

## Cards that stay up to date

A card can now read your calendar, your Jobs and their runs, your Notes, and a file or folder in one of your drives, and it keeps itself current. It reads again every few minutes, when your things change, and when you come back to the tab. Each live card says when it last updated and has a refresh button. A card only reads. It never changes your things.

![Live cards in light and dark: Today with six events, Recent notes, and Price watch reading prices.csv from a Trip drive, each marked Live, Updated just now](/posts/whats-new-in-1-50/live-cards.webp)

## A Job can keep a card for you

Tick **Keep a card on my home page** on a Job in **My Library → Jobs**, and each time the Job runs it draws its card fresh. Think of a morning briefing with the weather, your unread posts and the day's appointments, or the cheapest train fare it found. The card says which Job keeps it and when it last ran, and has a Run now button. Remove the card and the Job stops keeping it.

![The home page in light and dark with a Morning briefing card kept by a Job, showing the weather, 7 unread posts and the day's events, and a Train to Lisbon card with the cheapest fare at 42 euros](/posts/whats-new-in-1-50/job-cards.webp)

## A home page for each Space, and a shared one for the household

Each Space now has its own home page. In a [shared Space](/posts/whats-new-in-1-43/), everyone in it sees the same page, and the people who can edit the Space can change it. **Set up a home** starts a household with a board: a Chores list you can tick and add to right on the page, the calendar, photos, the people in the Space and your latest notes. **Make a Home for This Space with AI…** in Customize asks your AI to make one for any Space.

![The Flat's home page in light and dark: Chores and Groceries lists with some items ticked, Coming up, Photos, People, Latest notes and a bin schedule](/posts/whats-new-in-1-50/household.webp)

## Fixes

- **Dark scrollbars in dark mode.** Nomad's own pages kept light scrollbars in dark mode, and some text fields in Settings stayed white.

The phone's home tab doesn't show your cards yet. The full list of changes is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
