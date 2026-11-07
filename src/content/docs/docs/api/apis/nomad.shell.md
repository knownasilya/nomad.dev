---
title: nomad.shell
description: This API provides general UX interactions for the Nomad browser
slug: docs/api/apis/nomad.shell
---

### nomad.shell.drivePropertiesDialog(url)

Create a dialog for editing the properties of the given hyperdrive.

* **url** String. The URL of the drive to view.
* Returns **Promise&lt;Void&gt;**

```javascript
await nomad.shell.drivePropertiesDialog(drive.url)
```

### nomad.shell.selectFileDialog(\[opts\])

Create a dialog for selecting files or folders.

* **opts** Object
  * **title** String. The title of the selection dialog.
  * **buttonLabel** String. The label on the "OK" button.
  * **drive** String. The initial drive to explore.
  * **defaultPath** String. The initial path to explore.
  * **select** Array&lt;String&gt;. What kind of entries to accept. Must contain 'file', 'folder', 'mount'.
  * **filters** Object
    * **extensions** Array&lt;String&gt;. The extensions of the files to accept.
    * **writable** Boolean. If true, only accept writable files. If false, only accept unwritable files.
  * **allowMultiple** Boolean. If true, allow multiple files to be selected.
  * **disallowCreate** Boolean. If true, require the selected file to exist.
  * **capability** Boolean. If true, return [capability URLs](/docs/api/apis/nomad.capabilities/) for what the user picks instead of the drives' own URLs. See [A private picker](#a-private-picker).
* Returns **Promise&lt;Array&lt;Object&gt;&gt;**
  * **path** String. The path of the selected file or folder.
  * **origin** String. The URL of the hyperdrive that contains the file or folder (with `capability`, the capability's root, `hyper://<token>.cap/`).
  * **url** String. The URL of the file or folder.

```javascript
var files = await nomad.shell.selectFileDialog({
  title: 'Select an Image',
  buttonLabel: 'Select Image',
  select: ['file'],
  filters: {
    extensions: ['png', 'jpg', 'jpeg', 'gif']
  },
  allowMultiple: true,
  disallowCreate: true
})
files[0].path   // => '/imgs/foo.png'
files[0].origin // => 'hyper://1234..56/'
files[0].url    // => 'hyper://1234..56/imgs/foo.png'
```

#### A private picker

With `capability: true`, the page never learns which drive a file came from. Each result's `url` is a capability URL for only the file or folder the user picked:

- The page can **read** it with [`nomad.fs`](/docs/api/apis/nomad.fs/), and nothing else in that drive. A folder covers everything inside it.
- It can't write, change who can write, or see the drive's key. `getInfo` reports the capability instead.
- It can come from the user's private drive (`hyper://private/`), which pages otherwise can't read. The whole private drive can't be picked.
- It is kept across restarts. It lasts until the user removes it in the site's **Permissions** (under "Files this site can read"), or the page calls `nomad.capabilities.delete(url)`.
- Picking the same item again gives the same URL back. `nomad.capabilities.list()` lists the ones the page has.

```javascript
var [file] = await nomad.shell.selectFileDialog({
  title: 'Pick a note to import',
  select: ['file'],
  filters: { extensions: ['md'] },
  capability: true
})
file.url // => 'hyper://4pz..q7.cap/notes/groceries.md'
var text = await nomad.fs.readFile(file.url)
```

### nomad.shell.saveFileDialog(\[opts\])

Create a dialog for selecting where to save a file.

* **opts** Object
  * **title** String. The title of the selection dialog.
  * **buttonLabel** String. The label on the "OK" button.
  * **drive** String. The initial drive to explore.
  * **defaultPath** String. The initial path to explore.
  * **defaultFilename** String. The suggested default filename.
  * **extension** String. The extension of the saved file.
  * **filters** Object
    * **extensions** Array&lt;String&gt;. The extensions of the files to accept.
    * **writable** Boolean. If true, only accept writable files. If false, only accept unwritable files.
* Returns **Promise&lt;Array&lt;Object&gt;&gt;**
  * **path** String. The path of the selected file or folder.
  * **origin** String. The URL of the hyperdrive that contains the file or folder.
  * **url** String. The URL of the file or folder.

```javascript
var file = await nomad.shell.saveFileDialog({
  title: 'Save Image To...',
  buttonLabel: 'Save Image',
  defaultFilename: 'image.png',
  extension: 'png'
})
file.path   // => '/imgs/foo.png'
file.origin // => 'hyper://1234..56/'
file.url    // => 'hyper://1234..56/imgs/foo.png'
```

### nomad.shell.selectDriveDialog(\[opts\])

Create a dialog for selecting a hyperdrive from the user's library.

* **opts** Object
  * **title** String. The title of the selection dialog.
  * **buttonLabel** String. The label on the "OK" button.
  * **writable** Boolean. If true, only accept writable drives. If false, only accept unwritable drives.
  * **allowMultiple** Boolean. If true, allow multiple drives to be selected.
  * **tag** String. Filters the drives to items that include the given tag.
  * **template** String. The URL of a hyperdrive which will be used as the template for a new drive if the user chooses "new drive."
* Returns **Promise&lt;String|Array&lt;String&gt;&gt;**

If a `.template` is specified, `.writable` is not `false`, and no drives in the user's library matches the filtering criteria, the modal will automatically jump to the "create drive" flow.

```javascript
var driveUrl = await nomad.shell.selectDriveDialog({
  title: 'Select Your Profile',
  buttonLabel: 'Select Profile',
  writable: true,
  tag: 'contact',
  template: 'hyper://12345..af'
})
```

### nomad.shell.saveDriveDialog(url\[, opts\])

Create a dialog for saving a hyperdrive to the user's library.

* **url** String. The URL of the hyperdrive to save.
* **opts** Object
  * **tags** String. A space-separated list of tags to suggest saving the hyperdrive under.

```javascript
var driveUrl = await nomad.shell.saveDriveDialog(drive.url, {tags: 'website fun'})
```

### nomad.shell.listDrives(\[opts\])

List saved drives according to a filter. Requires user to grant permission.

* **opts** Object
  * **tag** String. Only list drives saved with the given tag.
  * **writable** Boolean. Only list drives which are or aren't writable.

```javascript
var contacts = await nomad.shell.listDrives({writable: false, tag: 'contact'})
```

### nomad.shell.tagDrive(url, tags)

Ask the user to add tags to the given hyperdrive. If the drive isn't already saved, will trigger the "save drive" dialog.

* **url** String. The URL of the hyperdrive to save.
* **tags** String. A space-separated list of tags to assign the drive.

```javascript
var driveUrl = await nomad.shell.tagDrive(drive.url, 'website fun')
```

### nomad.shell.unsaveDrive(url)

Remove a hyperdrive from the user's library. Requires user to grant permission.

* **url** String. The URL of the hyperdrive to unsave.
