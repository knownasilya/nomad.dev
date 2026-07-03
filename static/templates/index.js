var createDriveButton = document.querySelector('.create-drive')
if (typeof nomad !== 'undefined' && typeof nomad.fs !== 'undefined') {
  createDriveButton.textContent = 'Create Drive From This Template'
  createDriveButton.addEventListener('click', async (e) => {
    createDriveButton.disabled = true
    createDriveButton.textContent = 'Creating…'
    try {
      // ADR-0010: every drive is an Autobase. `TEMPLATE_DRIVE_TYPE === 'autobase'` means the
      // template wants a collaborative (multi-writer) drive, so create it unlocked; otherwise a
      // locked / single-writer drive. Both return a scoped nomad.fs drive handle.
      var drive
      if (window.TEMPLATE_DRIVE_TYPE === 'autobase') {
        drive = await nomad.fs.createCollaborativeDrive({ title: TEMPLATE_TITLE, collaborative: true })
      } else {
        drive = await nomad.fs.createDrive({ title: TEMPLATE_TITLE })
      }
      for (let path of TEMPLATE_FILES) {
        try {
          let v = await fetch(TEMPLATE_ROOT + path).then(res => {
            if (!res.ok) throw new Error('HTTP ' + res.status)
            return res.text()
          })
          if (path.startsWith('/ui/')) {
            // HACK
            // hugo doesnt serve the . folders so we have to fudge it for /.ui/ folders
            // -prf
            path = '/.ui/' + path.slice('/ui/'.length)
          }
          await drive.writeFile(path, v)
        } catch (e) {
          console.warn('[template] failed to write', path, e)
        }
      }
      window.open(drive.url)
    } finally {
      createDriveButton.disabled = false
      createDriveButton.textContent = 'Create Drive From This Template'
    }
  })
} else {
  createDriveButton.textContent = 'Get Nomad to Create This Site'
  createDriveButton.addEventListener('click', e => {
    window.open('https://nomad.pages.dev/docs/getting-started/install-nomad')
  })
}
