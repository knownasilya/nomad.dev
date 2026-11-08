// The invite page (ADR-0040 §3). Reads the invite from the URL fragment, which never reaches the
// server, and says who it's from and what accepting does. It can't check the signature (it can't
// read a Profile Drive), so it never says the invite is genuine: Nomad checks that when it opens.
//
// invites.mjs is a byte-for-byte copy of nomad's shared/invites.mjs (a test in nomad keeps them equal).

import { parseInviteLink, describeInvite, isExpired, schemeLinkOf, fromBase64Url, payloadText } from './invites.mjs';

const $ = (id) => document.getElementById(id);

function show(id) {
  for (const s of ['reading', 'invite', 'problem']) $(s).hidden = s !== id;
}

function problem(title, text) {
  $('problem-title').textContent = title;
  $('problem-text').textContent = text;
  show('problem');
}

function platform() {
  const ua = navigator.userAgent || '';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  if (/Macintosh|Mac OS X/i.test(ua)) return 'mac';
  if (/Linux|X11/i.test(ua)) return 'linux';
  return 'other';
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(location.href);
    $('copied').hidden = false;
    return true;
  } catch {
    return false;
  }
}

function render() {
  // The fragment alone, so the page reads the same on any host it's served from.
  const link = location.hash.slice(1);
  if (!location.hash || location.hash.length < 2) {
    return problem('No invite here', 'This page opens an invite link someone sent you. The link looks like this page’s address with a long code after a #. Copy the whole link and open it again.');
  }
  let invite;
  try {
    invite = parseInviteLink(link);
  } catch (e) {
    return problem('This invite can’t be read', e.message);
  }
  if (isExpired(invite)) {
    return problem('This invite has run out', 'Ask the person who sent it for a new one.');
  }
  const words = describeInvite(invite);
  document.title = words.title;
  $('title').textContent = words.title + '.';
  $('role').textContent = words.role;
  $('check').textContent = invite.signed
    ? 'Nomad checks who sent it when you open the invite.'
    : 'This invite isn’t signed, so nobody can check who sent it. Join only if you know who did.';
  $('expires').textContent = invite.expiresAt
    ? `It works until ${new Date(invite.expiresAt).toLocaleDateString(undefined, { dateStyle: 'long' })}, for one person.`
    : 'It works for one person.';

  const payload = fromBase64Url(payloadText(link) || '');
  $('open').href = schemeLinkOf(payload);

  const p = platform();
  const downloads = [...document.querySelectorAll('#downloads a')];
  for (const a of downloads) {
    if (a.dataset.platform === p) a.classList.add('primary');
    a.addEventListener('click', () => {
      copyLink();
    });
  }
  // The visitor's platform first.
  const mine = downloads.find((a) => a.dataset.platform === p);
  if (mine) mine.parentNode.prepend(mine);
  if (p === 'ios') {
    $('ios').hidden = false;
    $('open').parentNode.hidden = true;
  }
  $('copy').addEventListener('click', async () => {
    if (!(await copyLink())) $('copy').textContent = 'Copy this page’s address to keep the invite';
  });
  show('invite');
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
else render();
window.addEventListener('hashchange', render);
