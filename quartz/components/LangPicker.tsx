import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import path from "path"
import { joinSegments, slugifyFilePath, resolveRelative } from "../util/path"
import { i18n } from "../i18n"
import style from "./styles/langpicker.scss"

export default (() => {
  function LangPicker({ ctx, cfg, fileData }: QuartzComponentProps) {
    const currentLang = ctx.language == "" ? cfg.locale : ctx.language
    return (
      <ul class="languagepicker">
        <li id="current-lang" data-lang={ctx.language}>
          <img src={"https://flagcdn.com/w20/" + i18n(currentLang).icon + ".png"} />
          <span>{i18n(currentLang).name}</span>
        </li>
        {cfg.languages.map((language) => {
          if (currentLang == language) {
            return <></>
          }
          const fileName = fileData.title ?? fileData.stem
          const relativePath = path.posix.relative(
            ctx.argv.directory,
            joinSegments(fileData.dirname, fileName),
          )
          const slug = slugifyFilePath(relativePath, language == cfg.locale ? "" : language)
          return (
            <a href={resolveRelative(fileData.slug!, slug)} slug={slug}>
              <li>
                <img src={"https://flagcdn.com/w20/" + i18n(language).icon + ".png"} />
                <span>{i18n(language).name}</span>
              </li>
            </a>
          )
        })}
      </ul>
    )
  }
  LangPicker.css = style

  return LangPicker
}) satisfies QuartzComponentConstructor
