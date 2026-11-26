# Contributing

Bug reports, fixes and clearer explanations are welcome.

## Report a problem
Open an issue and include:
- the template or guide page
- where you ran it (website, installed web app, APK or sandbox)
- your phone or computer, and browser
- the steps, what you expected and what happened
- any error the [Mod Inspector](tools/inspector-mod.js) shows

> [!CAUTION]
> Never post passwords, tokens, signing keys or private information.

## Suggest a change
1. Fork the repository and make a branch.
2. Keep each pull request to one subject.
3. Check any mod file you changed with `mod-maker.html`.
4. Test it in the real game: switch it on and off several times.
5. Say what you tested and what you didn't.

> [!IMPORTANT]
> `mod-maker.html` holds its own copy of each template, so it works without a server. If you
> change a file in `templates/`, paste the same code into the matching
> `<script type="text/plain" data-template="...">` block in `mod-maker.html`.

## Style
- One mod per file, wrapped in `(() => { ... })();`.
- Every template needs working `on()` and `off()` functions.
- Plain language and short comments.
- Only add code, text and art you made or have permission to share.
