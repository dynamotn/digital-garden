import { pathToRoot, joinSegments } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, ctx, cfg, displayClass }: QuartzComponentProps) => {
  const currentLang = ctx.language == "" ? cfg.locale : ctx.language
  const title =
    cfg.pageTitle[currentLang] !== undefined
      ? cfg.pageTitle[currentLang]
      : i18n(ctx.language).propertyDefaults.title
  const baseDir = joinSegments(pathToRoot(fileData.slug!), ctx.language)
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>{title}</a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
