import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "🪴 Dynamo's Digital Garden",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "google",
      tagId: "G-BV4BKF074Y",
    },
    locale: "vi-VN",
    languages: ["vi-VN", "en-US"],
    baseUrl: "notes.dynamotn.dev",
    ignorePatterns: [
      ".publish",
      ".publish/**",
      ".obsidian",
      ".obsidian/**",
      "_assets/books/**",
      "_assets/templates/**",
      "_assets/snippets/**",
      "_assets/draw/scripts/**",
    ],
    defaultDateType: "created",
    showDateTypes: ["created", "modified"],
    passProtected: {
      enabled: true,
      iteration: 3e6,
    },
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Merriweather",
        body: "Roboto",
        code: "Inconsolata",
      },
      colors: {
        lightMode: {
          light: "#eff1f5",
          lightgray: "#acb0be",
          gray: "#7c7f93",
          darkgray: "#5c5f77",
          dark: "#4c4f69",
          secondary: "#7287fd",
          tertiary: "#04a5e5",
          highlight: "rgba(114, 135, 253, 0.15)",
          textHighlight: "#df8e1d88",
        },
        darkMode: {
          light: "#24273a",
          lightgray: "#5b6078",
          gray: "#939ab7",
          darkgray: "#b8c0e0",
          dark: "#cad3f5",
          secondary: "#7dc4e4",
          tertiary: "#8bd5ca",
          highlight: "rgba(125, 196, 228, 0.15)",
          textHighlight: "#eed49f88",
        },
      },
    },
    comments: {
      provider: "commento",
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.MultiLanguage(),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts(), Plugin.ExplicitPublish()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
