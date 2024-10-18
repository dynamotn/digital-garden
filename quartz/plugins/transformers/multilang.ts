import multilang from "multilang"

const trimWhitespaceRegex = /([\t\r ]*)$/g
const langSectorRegex = /<!--lang:(.*)-->/

export const MultiLanguage: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  return {
    name: "MultiLanguage",
    textTransform(ctx, src) {
      if (src.toString()) {
        let inTextual = false
        let inLang = false
        let inSpecificLang = false
        let result = []
        src.split("\n").forEach((line) => {
          line = line.replace(trimWhitespaceRegex, "")
          if (line.match("```")) {
            inTextual = !inTextual
          }
          if (!inTextual) {
            const specificLangSectorRegex = "<!--lang:" + ctx.language + "-->"
            const match = line.match(langSectorRegex)
            if (match) {
              if (match[1] === "*") {
                inLang = false
                inSpecificLang = false
                return
              } else {
                inLang = true
              }
              if (line.match(specificLangSectorRegex)) {
                inSpecificLang = true
              } else {
                inSpecificLang = false
              }
              return
            }
            if (!inLang || (inLang && inSpecificLang)) {
              result.push(line)
            }
          } else {
            result.push(line)
          }
        })
        return result.join("\n")
      }
      return src
    },
  }
}
