---
title: nomad.session
description: Log the user in with one of their Personas
slug: docs/api/apis/nomad.session
---

A site or a drive app can ask "who are you?", and Nomad answers with one of the user's **Personas**. A Persona is one of the user's identities: a profile drive (`walled.garden/person`) with a name and a picture, kept on the user's own devices. The user manages them in My Library → Personas.

The answer is a **Session**. Nomad shows its login prompt, the user picks a Persona and what to share, and the page gets a Session back. There is no password and no account on your side: the Session's `id` is a random value made for your site, that Persona and the Space the user is in. It stays the same on every visit until the user logs out.

The prompt is the only way a Session is made. There is no silent path, so call `requestLogin()` from a button the user clicks, not when the page loads.

## What a site can see

- **Always:** the Session's `id`. Without anything else, the site knows it's the same visitor each time, and nothing more.
- **`profile`:** the Persona's profile drive URL, its name and its picture.
- **`modifyDrive`:** write files in the Persona's own profile drive. It needs `profile`.
- **`email`:** the Persona's email address. It stands on its own: a site can ask for it with or without `profile`. Nomad doesn't verify the address, so send your own confirmation code if you need to know it's real. A Persona with no email gives none, even when the user leaves the box checked.

The user can uncheck what you ask for, so a partial grant is normal. Check `session.perms` before you use the profile or the email.

A page can never list the user's Personas, and two sites can't tell they saw the same Persona: each gets its own `id`.

## API

### nomad.session.requestLogin([opts])

Show the login prompt.

* **opts** Object.
  * **perms** Array&lt;String&gt;. What to ask for: `'profile'`, `'modifyDrive'` and/or `'email'`. Leave it out to ask only for the `id`.
  * **maxAge** Number. Seconds until the Session ends. By default it doesn't end until the user logs out.
* Returns **Promise&lt;Session&gt;**.

It rejects with `UserDeniedError` when the user cancels, says no, or has no Persona that can log in. These look the same on purpose. After a "no", later calls on the same page load reject without showing the prompt again.

If the user is already logged in to your site with everything you asked for, it resolves with that Session and shows no prompt.

```javascript
loginButton.addEventListener('click', async () => {
  try {
    const session = await nomad.session.requestLogin({ perms: ['profile'] })
    showUser(session)
  } catch (err) {
    // The user said no. Keep the login button.
  }
})
```

### nomad.session.getCurrent()

Get the Session, if the user is logged in to your site. It never prompts.

* Returns **Promise&lt;Session|null&gt;**.

```javascript
const session = await nomad.session.getCurrent()
if (session) showUser(session)
else showLoginButton()
```

### nomad.session.revoke()

Log out. The Session ends on all of the user's devices.

* Returns **Promise&lt;Void&gt;**.

```javascript
await nomad.session.revoke()
```

### Event: change

Fires when the Session ends or changes: after `revoke()`, when the user logs out in the site-info panel or My Library, changes or deletes the Space's Persona, changes the Persona's email, or does any of that on another device.

* **session** Session|null. The new Session, or `null` once the user is logged out.

```javascript
nomad.session.addEventListener('change', (e) => {
  if (e.session) showUser(e.session)
  else showLoginButton()
})
```

## The Session object

* **id** String. Random, made for your site, this Persona and this Space.
* **perms** Array&lt;String&gt;. What the user granted: any of `'profile'`, `'modifyDrive'` and `'email'`, or none.
* **profile** Object. Only with `'profile'`.
  * **url** String. The Persona's profile drive, like `hyper://…/`.
  * **title** String. The Persona's name.
  * **thumb** String. The picture's path in that drive, like `/thumb.png`, when there is one.
* **email** String. Only with `'email'`, when the Persona has one.
* **createdAt** String. When the user logged in (ISO 8601).
* **expiresAt** String. When the Session ends, if you passed `maxAge`.

```javascript
function showUser(session) {
  if (!session.perms.includes('profile')) {
    nameEl.textContent = 'Logged in'
    return
  }
  const { url, title, thumb } = session.profile
  nameEl.textContent = title
  if (thumb) avatarEl.src = new URL(thumb, url).href
}
```

## Asking for an email

```javascript
const session = await nomad.session.requestLogin({ perms: ['email'] })
if (session.email) {
  // Not verified by Nomad: send a code before you rely on it.
  await sendConfirmationCode(session.email)
}
```

The email lives on the user's own devices, not in their profile drive, and a site sees it only after the user says yes. One address given to two sites lets them tell it's the same person, and the prompt says so.

## Notes

- Only `https://` and `http://` sites and `hyper://` drives addressed by their key can ask. A drive opened by a short name the user gave it uses its key.
- A Session belongs to a Space. If the user opens your site in another Space, they log in again there, maybe as another Persona.
- With `modifyDrive`, write to the profile drive with [`nomad.fs`](/docs/api/apis/nomad.fs/), using `session.profile.url`.
- `nomad.session` isn't on the phone yet. There, `requestLogin()` rejects with `UserDeniedError` and `getCurrent()` resolves to `null`, so the same code works on both.
