import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { i18n } from "../../i18n"

const EncryptedContent: QuartzComponent = ({
  encryptedContent,
  ctx,
  cfg,
}: QuartzComponentProps) => {
  return (
    <>
      <div id="lock">
        <div
          id="msg"
          data-wrong={i18n(ctx.language).pages.encryptedContent.wrongPassword}
          data-modern={i18n(ctx.language).pages.encryptedContent.modernBrowser}
          data-empty={i18n(ctx.language).pages.encryptedContent.noPayload}
        >
          {i18n(ctx.language).pages.encryptedContent.enterPassword}
        </div>
        <div id="load">
          <p class="spinner"></p>
          <p id="load-text" data-decrypt={i18n(ctx.language).pages.encryptedContent.decrypting}>
            {i18n(ctx.language).pages.encryptedContent.loading}
          </p>
        </div>
        <form class="hidden">
          <input
            type="password"
            class="pwd"
            name="pwd"
            aria-label={i18n(ctx.language).pages.encryptedContent.password}
            autofocus
          />
          <input type="submit" value={i18n(ctx.language).pages.encryptedContent.submit} />
        </form>
        <pre class="hidden" data-i={cfg.passProtected?.iteration}>
          {encryptedContent}
        </pre>
      </div>
      <article id="content"></article>
    </>
  )
}

export default (() => EncryptedContent) satisfies QuartzComponentConstructor
