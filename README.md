# ForTheUsers - Main User Facing Site

It's a website; woo!

This site uses [Jekyll](https://jekyllrb.com) to layout and generate the pages; which means the files in this repo are *not* what is sent to browsers - first Jekyll will generate static HTML from the files here.

Here's the layout of this repo:
 - `_posts/` contains text-only blog posts (in markdown, rst etc). At the top of the file (between two `---`s) some metadata is specified - take note of `layout`, `categories` and `authors`.
 - `_layouts/` contains templates for, well, laying out a HTML page. Anything between {{double curlies}} will get replaced with something - `content` for the actual body of the page, `page.title` for the title, etc.
 - `_includes/` contains the files to use for `{% include ... %}` tags in the layouts. If a layout includes `head.html`, then the include tag gets replaced with the contents of `_includes/head.html`.
 - `_author_data/` contains a file for each possible blogpost author. There's a bit of [Liquid](https://jekyllrb.com/docs/liquid/) in `_layouts/post.html` that will generate author infoboxes using the info in these files and the `authors` attribute from a post.
 - Other folders and files, like `img`, `css`, `js`, `favicon.ico`, `privacy.html`; get copied into the finished site as-is; *unless* a file has two `---`s at the top which will make Jekyll process it. This is used to translate the `.scss` files to regular `.css`.
 - `pages/` contains the site's pages that aren't blogposts - indexes, the services page, etc. They all have the `permalink` attribute to tell Jekyll to move them to another location, so the `pages` directory shouldn't make it into the final site. They also use the `default` layout, which doesn't have blogposty things like the title and author infoboxes, but it does still have the navbar and whatever.

## Testing and whatever
You should probably be testing stuff before you push it - just to make sure the formatting works, your images aren't broken, etc. Here's how:
- Install Jekyll, following its [instructions](https://jekyllrb.com/docs/installation/).
- Open a shell in this repo's root, and run `bundler exec jekyll serve`
- Look for `Server Address:` in the output, copy-paste this into your browser to view the site
- When running `jekyll serve`, you can change any file (except `_config.yml`) and refresh your browser to see the changes immediately.
- Once you're happy, stop `jekyll serve`, delete the `_site` directory, run `bundler exec jekyll build` and look through the new `_site` directory for little errors (`/blog.html` instead of `/blog/`, etc.) See Ground Rules for things that frequently go wrong.

## Ground Rules
There are a few quirks and rules you need to stick to when working on this site to keep it working properly.
- All blogposts *must* have `layout: post`, a `title`, `date`, short `desc` and `img`, at least one valid `authors`, and *either* `categories: appstore` or `categories: updates` (unless you add a new category, along with index page under `pages/blog`) If you miss something the blog indexes or post may not render correctly. If your post doesn't show up at all, make sure the `date` isn't in the future!
- All `authors` used in blog posts must have a corresponding file in `_author_data`. The filename doesn't matter, instead the `author_id` is used to match author data to blogposts. All authordata files must have an `author_id`, readable `name`, `user` (will be prefixed with @), `user_url` and `icon` (hosted under `/img/icons`). Try and keep your bio (starting after the second `---`) under like, 200 words. Double-check your author infobox on a blog post after making changes to verify it renders okay.
- When editing a html file or template, make sure that all links, scripts, images or other subresources go through `relative_url`. This means instead of writing `<a href="/coolpage"></a>`, you should do `<a href="{{'/coolpage' | relative_url}}"></a>`. This'll mean if the site ever needs to move into a subdirectory (like being hosted on github.io, or /archive, or whatever) then Jekyll will automatically fix up all the links. Same goes for `img src`, `script src`, etc. etc. unless it's hosted on an entirely seperate domain.
- If you are editing a page's `permalink` attribute make sure there's a `/` on the end (i.e. `/location/` instead of `/location`) otherwise Jekyll will produce URLs like `/location.html` instead of `/location`. It may act fine under `jekyll serve`, but will fail when actually put online!
