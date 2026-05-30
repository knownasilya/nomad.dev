---
title: beaker.contacts
description: This API gives read access to the user's address book
---

> **Deprecated.** This API was deprecated. It now calls to beaker.shell APIs to access drives saved with the 'contact' tag. Applications should migrate to `beaker.shell` for new development.

## beaker.contacts.requestProfile()

Displays a dialog to select one profile drive.

* Returns **Promise&lt;Object&gt;**. An object with `url`, `title`, and `description` properties.

## beaker.contacts.requestContact()

Shows a selection dialog for one contact from the address book.

* Returns **Promise&lt;Object&gt;**. An object with `url`, `title`, and `description` properties.

## beaker.contacts.requestContacts()

Creates a multi-select dialog for choosing multiple contacts.

* Returns **Promise&lt;Array&lt;Object&gt;&gt;**. An array of contact objects each containing `url`, `title`, and `description`.

## beaker.contacts.list()

Retrieves all contacts in the address book as an array. Requires explicit user permission.

* Returns **Promise&lt;Array&lt;Object&gt;&gt;**. An array of objects containing `url`, `title`, and `description` for each contact.
