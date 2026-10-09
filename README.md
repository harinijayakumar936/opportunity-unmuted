# Opportunity Unmuted

Opportunity Unmuted is a student-made podcast by Harini Jayakumar (South Iredell High School,
Mooresville, NC, NC Idea Challenge winner). This app is the home for the podcast. It helps
students find free programs, scholarships, tutoring, and mental health support that already
exist in their school and community. Students reach it by scanning QR code posters in schools,
libraries, and community spaces.

## What the app does

- **Listen**: every episode, newest first, with a topic tag (Opportunity or Wellbeing).
- **Episode page**: play button, show notes, and the resources that go with the episode.
  Wellbeing episodes show the "Need help right now?" box and "Reviewed by a school counselor".
- **Audio player**: a mini player sits above the tabs and keeps playing while you switch tabs.
  If an episode has no mp3 yet, it says "Audio coming soon".
- **Find help**: crisis numbers at the top, then a search box and category buttons that work together.
- **Ask**: a form for questions, resource ideas, or joining as a student reporter.
- **About**: what the project is, how many episodes there are, and who made it.
- **Installable app (PWA)**: students can add it to their home screen and open it offline.

## How to run it

- **Quick look**: double-click `index.html`. Everything works except installing and offline mode,
  because browsers only allow those on a real website.
- **Full test, including install and offline**: open a terminal in this folder, run
  `python3 -m http.server 8000`, then go to `http://localhost:8000`.

## How to add a new episode

1. Put the mp3 in the `audio` folder, for example `audio/episode-9.mp3`.
2. Open `js/data.js` and copy one of the episode objects.
3. Give it the next `id` and fill in the title, host, minutes, topic (`"Opportunity"` or
   `"Wellbeing"`), three notes, and which resource categories go with it.
4. Set `audio` to `"audio/episode-9.mp3"`. If the recording isn't ready, use `""` and the app
   shows "Audio coming soon".

That's it. The episode list, the episode page, and the count on the About tab all update by themselves.

## How to add a resource

Copy one of the resource objects in `js/data.js` and fill in `title`, `category`, `description`,
and `howToGetIt`. The category must exactly match one of the names in the `categories` list at the
bottom of the file. Anything marked `[confirm]` still needs to be checked with the school counselor.

## How it works

The app is one page. JavaScript shows and hides sections instead of loading new pages, and the
part of the address after `#` (like `#find` or `#episode-3`) says which section to show. That's
why the back button works and why a QR code can link straight to one tab or episode.

### js/data.js

Just data, no logic. It has three lists:
- `episodes`: one object per episode.
- `resources`: one object per resource.
- `categories`: the names on the filter buttons.

### js/app.js

Builds the screens and handles navigation, search, and the form.

- `handleRoute()` reads the `#` part of the address and decides which section to show. It runs
  when the page loads and every time the address changes (`hashchange`).
- `showView(name)` shows one section, hides the others, and highlights the right tab.
- `showEpisodes()` sorts the episodes newest first and builds a card for each with `makeEpisodeCard()`.
- `showEpisodePage(id)` finds the episode and builds its page. `resourcesForEpisode()` picks the
  resources whose category is in the episode's `resourceCategories`.
- `helpBoxHtml()` builds the "Need help right now?" box. `showHelpBoxes()` puts it on the Find help
  and Ask tabs, and Wellbeing episode pages add it too, so the numbers are written in one place only.
- `filterResources()` keeps only the resources that match **both** the selected category and the
  search text. `showResources()` draws them and shows the "Nothing matches" message when the list is empty.
- `handleAskSubmit()` checks that the message isn't empty, saves it with `saveQuestion()`, shows a
  thank-you note, and clears the form.
- `moveFocusToHeading()` moves keyboard and screen reader focus to the new heading after a tab change.
- `registerServiceWorker()` turns on offline mode when the app runs on a real website.

### js/player.js

Controls the one `<audio>` element on the page. The audio element is never removed, so the
episode keeps playing when you change tabs.

- `playEpisode(episode)` loads the episode's mp3 and starts it, or pauses it if it's already playing.
- `togglePlay()` switches between play and pause.
- `updatePlayer()` refreshes the mini player: title, progress bar, time, and the play/pause icon.
  It runs whenever the audio plays, pauses, or moves forward.
- `showAudioMissing()` shows "Audio coming soon" when the mp3 is empty or can't be loaded.
- `formatTime()` turns seconds into minutes and seconds, like `3:07`.

### manifest.json and service-worker.js (the installable app part)

- `manifest.json` tells the phone the app's name ("Unmuted" under the icon), colors, and icons,
  so it can be added to the home screen and open full screen like a regular app.
- `service-worker.js` runs in the background. The first time someone visits, it saves copies
  of the app's files. After that, the app tries the internet first so new episodes always show up,
  and uses the saved copies when there's no connection. Audio isn't saved for offline use, because
  mp3 files are large.
- If you add a new image or script file, add its name to the `appFiles` list in `service-worker.js`.

## Things to know before the real launch

- **The Ask form only saves on the student's own device** (in the browser's `localStorage`), so
  nobody else sees the messages yet. To collect them, connect the form to something like a Google
  Form or a school-approved form service.
- **Check every item marked `[confirm]`** with the school counselor before printing posters.
- `audio/episode-1.mp3` is a short spoken placeholder. Replace it with the real episode.

## Put it on GitHub Pages

1. Create a free account at github.com if you don't have one.
2. Create a new **public** repository. Name it `opportunity-unmuted`, because the name becomes
   part of the web address.
3. Upload everything in this folder: on the new repository page, click **uploading an existing file**,
   drag in all the files and folders, and click **Commit changes**.
4. Go to **Settings > Pages**. Under "Build and deployment", pick **Deploy from a branch**, choose
   `main` and `/ (root)`, and click **Save**.
5. Wait a minute or two. The site will be at `https://YOUR-USERNAME.github.io/opportunity-unmuted/`.
6. Open that link on a phone and check every tab. Then try "Add to Home Screen".

To update the app later, upload the changed files to the repository again. The site updates in a minute or two.

## Make a QR code for the posters

1. Open the GitHub Pages link in Chrome on a computer.
2. Click the menu (three dots), then **Cast, save, and share > Create QR code**, and download it.
   (If you have Python, `pip install "qrcode[pil]"` then `qr "YOUR-LINK" > poster-qr.png` also works.)
3. To send people straight to one section, add the tab to the end of the link before making the code:
   - `.../opportunity-unmuted/#find` for posters about getting help
   - `.../opportunity-unmuted/#episode-4` for a poster about one episode
4. Print a test poster and scan it with an iPhone and an Android phone before printing the rest.
   Print the code at least 2 cm (about 1 inch) wide, and leave a white border around it.
