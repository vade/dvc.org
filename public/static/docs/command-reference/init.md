# init

This command initializes a <abbr>DVC project</abbr> on a directory.

Note that by default the current working directory is expected to contain a Git
repository, unless the `--no-scm` or `--subdir` options are used.

## Synopsis

```usage
usage: dvc init [-h] [-q | -v] [--no-scm] [-f] [--subdir]
```

## Description

After DVC initialization, a new directory `.dvc/` will be created with the
`config` and `.gitignore` files. These and other files and directories are
hidden from user, as typically there's no need to interact with them directly.
See [DVC Files and Directories](/doc/user-guide/dvc-files-and-directories) to
learn more.

`.dvc/cache` is one of the most important
[DVC directories](/doc/user-guide/dvc-files-and-directories). It will hold all
the contents of tracked data files. Note that `.dvc/.gitignore` lists this
directory, which means that the cache directory is not tracked by Git. This is a
local cache and you cannot `git push` it.

## Options

- `--no-scm` - skip Git specific initialization, `.dvc/.gitignore` will not be
  written. This option should not be combined with `--subdir` (below).

- `--subdir` - allows initializing a <abbr>DVC repository</abbr> inside a
  directory of a Git repo. DVC in this _subdir_ DVC repo will search for Git in
  parent directories. This option should not be combined with `--no-scm`
  (above).

- `-f`, `--force` - remove `.dvc/` if it exists before initialization. Will
  remove any existing local cache. Useful when a previous `dvc init` has been
  corrupted.

- `-h`, `--help` - prints the usage/help message, and exit.

- `-q`, `--quiet` - do not write anything to standard output. Exit with 0 if no
  problems arise, otherwise 1.

- `-v`, `--verbose` - displays detailed tracing information.

## Examples

## Example: Create a new DVC repository

Requires Git.

```dvc
$ mkdir example && cd example
$ git init
$ dvc init
$ git status
...
        new file:   .dvc/.gitignore
        new file:   .dvc/config

$ git commit -m "Init DVC"
```

Note that the <abbr>cache</abbr> directory (among others) is not tracked with
Git. It contains data and model files, and will be managed by DVC.

```dvc
$ cat .dvc/.gitignore
/state
/lock
...
/cache
```

## Example: Create a subdirectory DVC repository

Let's create a parent Git repository, and then a <abbr>DVC project</abbr> inside
a subdirectory.

```dvc
$ mkdir repo && cd repo

$ git init
$ mkdir subdir && cd subdir

$ dvc init --subdir
```

The Git repo is in the `repo/` directory, while the _subdir_ DVC repository
lives in `repo/subdir`.

```dvc
$ tree repo -a
repo
├── .git
.
.
.
└── subdir
    └── .dvc
```
