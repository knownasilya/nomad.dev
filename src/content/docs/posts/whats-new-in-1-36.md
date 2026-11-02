---
categories:
  - Announcements
  - Releases
date: "2026-11-02"
description: AI Jobs keep a run history and can open web pages and click on them. Your AI can make drives, Personas get their own menu, and setup offers to make your first one.
title: "Nomad 1.36: Jobs that use the web, and your AI makes drives"
---

Everything below is in [Nomad 1.36](https://github.com/knownasilya/nomad/releases/tag/v1.36.0), on desktop and Android. Your app updates itself, or you can download it from the release page.

## A history for every Job

Each [AI Job](/posts/whats-new-in-1-27/) now keeps its last 50 runs. In My Library → Jobs and on the phone, a Job shows how many times it ran and how many runs failed. Switch between **All** and **Failed**, or search the answers and errors. Each run shows when it ran, how long it took and which device ran it. A failing Job shows its last error right in the list.

![A Job's history in My Library, with runs that worked, a few that failed, and the search box](/posts/whats-new-in-1-36/job-history.webp)

**Clear history** deletes a Job's runs on every device. Clearing doesn't make a Job run early, and a one-time Job won't run twice.

## Jobs that open pages and click

A Job can now open a web page and click, type and scroll on it, like the AI Sidebar does on your tab. "Every evening, open my team's task board, mark today's report done and post a note" is now a Job. Your Job's page opens in a hidden window, signed in as you, or in a tab you can watch with **Run with me**.

![A Job in My Library with the sites it may use listed under Web pages](/posts/whats-new-in-1-36/job-web-pages.webp)

You choose which sites a Job may use. On a run you watch, the Job asks the first time it needs a site, and before any risky click, and remembers your yes. A run on its own never asks. It stops instead and records what it wanted, so you can say yes next time. It still can't type passwords or card numbers.

![The prompt asking to let a Job click, type and scroll on a site each time it runs](/posts/whats-new-in-1-36/job-click-prompt.webp)

## Your AI can make drives

Ask your AI for a new drive, and it makes one: a title, a description, a blank or document template. It asks first, then it can fill the drive in the same answer and link to it.

![The AI Sidebar making a "Lisbon trip photos" drive with a gallery page](/posts/whats-new-in-1-36/ai-create-drive.webp)

A Job can make drives too, once you tick **Make new drives** for it. Each run lists the drives it made.

![A Job run that made a new drive, linked under Changed](/posts/whats-new-in-1-36/job-made-drive.webp)

## A menu for your Persona

The [Persona](/posts/whats-new-in-1-34/) icon in the location bar opens a small menu of its own. It shows who the site sees you as, what it can see, and links to open your profile, manage Personas or log out. The Persona picture on the Spaces button opens the same menu.

![The Persona menu for forum.example.org](/posts/whats-new-in-1-36/persona-menu.webp)

## Make your first Persona during setup

Setting up Nomad now asks "Who are you online?" and offers to make your first Persona. It's the same form as My Library, and **Skip for now** moves on. The phone offers the same step once it's linked to your computer.

![The setup step for making your first Persona](/posts/whats-new-in-1-36/persona-onboarding.webp)

## Your AI asks before sending private data

Once a chat has read something private, such as your Notes, Reader, files or the page in your tab, your AI asks before it sends a request to any site you didn't name yourself. That way a page can't trick it into sending your data somewhere else. A Job can't ask, so after a private read it only reaches the sites its prompt names.

![The prompt asking before the AI sends a request to a site you didn't name](/posts/whats-new-in-1-36/send-data-prompt.webp)

## Everything else

On the phone's home page, pages from the same site visited one after another now share one Recent row. The full list of changes is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
