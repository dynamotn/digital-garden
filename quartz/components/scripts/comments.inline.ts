const changeGiscusTheme = (e: CustomEventMap["themechange"]) => {
  const theme = e.detail.theme
  const iframe = document.querySelector("iframe.giscus-frame") as HTMLIFrameElement
  if (!iframe) {
    return
  }

  if (!iframe.contentWindow) {
    return
  }

  iframe.contentWindow.postMessage(
    {
      giscus: {
        setConfig: {
          theme: getThemeUrl(getThemeName(theme)),
        },
      },
    },
    "https://giscus.app",
  )
}

const getThemeName = (theme: string) => {
  if (theme !== "dark" && theme !== "light") {
    return theme
  }
  const giscusContainer = document.querySelector(".giscus") as GiscusElement
  if (!giscusContainer) {
    return theme
  }
  const darkGiscus = giscusContainer.dataset.darkTheme ?? "dark"
  const lightGiscus = giscusContainer.dataset.lightTheme ?? "light"
  return theme === "dark" ? darkGiscus : lightGiscus
}

const getThemeUrl = (theme: string) => {
  const giscusContainer = document.querySelector(".giscus") as GiscusElement
  if (!giscusContainer) {
    return `https://giscus.app/themes/${theme}.css`
  }
  return `${giscusContainer.dataset.themeUrl ?? "https://giscus.app/themes"}/${theme}.css`
}

type GiscusElement = Omit<HTMLElement, "dataset"> & {
  dataset: DOMStringMap & {
    repo: `${string}/${string}`
    repoId: string
    category: string
    categoryId: string
    themeUrl: string
    lightTheme: string
    darkTheme: string
    mapping: "url" | "title" | "og:title" | "specific" | "number" | "pathname"
    strict: string
    reactionsEnabled: string
    inputPosition: "top" | "bottom"
  }
}

function setupGiscus() {
  const giscusContainer = document.querySelector(".giscus") as GiscusElement
  if (!giscusContainer) {
    return
  }

  const giscusScript = document.createElement("script")
  giscusScript.src = "https://giscus.app/client.js"
  giscusScript.async = true
  giscusScript.crossOrigin = "anonymous"
  giscusScript.setAttribute("data-loading", "lazy")
  giscusScript.setAttribute("data-emit-metadata", "0")
  giscusScript.setAttribute("data-repo", giscusContainer.dataset.repo)
  giscusScript.setAttribute("data-repo-id", giscusContainer.dataset.repoId)
  giscusScript.setAttribute("data-category", giscusContainer.dataset.category)
  giscusScript.setAttribute("data-category-id", giscusContainer.dataset.categoryId)
  giscusScript.setAttribute("data-mapping", giscusContainer.dataset.mapping)
  giscusScript.setAttribute("data-strict", giscusContainer.dataset.strict)
  giscusScript.setAttribute("data-reactions-enabled", giscusContainer.dataset.reactionsEnabled)
  giscusScript.setAttribute("data-input-position", giscusContainer.dataset.inputPosition)
  giscusScript.setAttribute("data-theme-url", giscusContainer.dataset.themeUrl)
  giscusScript.setAttribute("data-light-theme", giscusContainer.dataset.lightTheme)
  giscusScript.setAttribute("data-dark-theme", giscusContainer.dataset.darkTheme)

  const theme = document.documentElement.getAttribute("saved-theme")
  if (theme) {
    giscusScript.setAttribute("data-theme", getThemeUrl(getThemeName(theme)))
  }

  giscusContainer.appendChild(giscusScript)

  document.addEventListener("themechange", changeGiscusTheme)
  window.addCleanup(() => document.removeEventListener("themechange", changeGiscusTheme))
}

type CommentoElement = Omit<HTMLElement, "dataset"> & {
  dataset: DOMStringMap & {
    host: string
    cssOverride: string
    noFonts: string
    hideDeleted: string
  }
}

function setupCommento() {
  const commentoContainer = document.querySelector("#commento") as CommentoElement
  if (!commentoContainer) {
    return
  }

  const commentoScript = document.createElement("script")
  commentoScript.src = "https://" + commentoContainer.dataset.host + "/js/commento.js"
  commentoScript.defer = true
  commentoScript.setAttribute("data-css-override", commentoContainer.dataset.cssOverride)
  commentoScript.setAttribute("data-no-fonts", commentoContainer.dataset.noFonts)
  commentoScript.setAttribute("data-hide-deleted", commentoContainer.dataset.hideDeleted)

  commentoContainer.appendChild(commentoScript)
}

type DisqusElement = Omit<HTMLElement, "dataset"> & {
  dataset: DOMStringMap & {
    shortName: string
  }
}

function setupDisqus() {
  const disqusContainer = document.querySelector("#disqus_thread") as DisqusElement
  if (!disqusContainer) {
    return
  }

  const disqusScript = document.createElement("script")
  disqusScript.src = "https://" + disqusContainer.dataset.shortName + ".disqus.com/embed.js"
  disqusScript.setAttribute("data-timestamp", "" + +new Date())

  disqusContainer.appendChild(disqusScript)
}

document.addEventListener("nav", () => {
  const commentContainer = document.querySelector("#comment")
  if (!commentContainer) {
    return
  }
  const provider = commentContainer.getAttribute("data-provider")
  switch (provider) {
    case "giscus":
      setupGiscus()
    case "commento":
      setupCommento()
    case "disqus":
      setupDisqus()
  }
})
