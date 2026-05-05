import { readFile } from "node:fs/promises"
import path from "node:path"

type Block =
  | { type: "h1" | "h2" | "h3" | "p"; content: string }
  | { type: "ul"; items: string[] }
  | { type: "hr" }

function parseMarkdown(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n")
  const blocks: Block[] = []

  let paragraph: string[] = []
  let listItems: string[] = []

  const flushParagraph = () => {
    if (paragraph.length === 0) {
      return
    }

    blocks.push({
      type: "p",
      content: paragraph.join(" ").trim(),
    })
    paragraph = []
  }

  const flushList = () => {
    if (listItems.length === 0) {
      return
    }

    blocks.push({ type: "ul", items: [...listItems] })
    listItems = []
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (!line) {
      flushParagraph()
      flushList()
      continue
    }

    if (line === "---") {
      flushParagraph()
      flushList()
      blocks.push({ type: "hr" })
      continue
    }

    if (line.startsWith("* ")) {
      flushParagraph()
      listItems.push(line.slice(2).trim())
      continue
    }

    flushList()

    if (line.startsWith("### ")) {
      flushParagraph()
      blocks.push({ type: "h3", content: line.slice(4).trim() })
      continue
    }

    if (line.startsWith("## ")) {
      flushParagraph()
      blocks.push({ type: "h2", content: line.slice(3).trim() })
      continue
    }

    if (line.startsWith("# ")) {
      flushParagraph()
      blocks.push({ type: "h1", content: line.slice(2).trim() })
      continue
    }

    paragraph.push(line)
  }

  flushParagraph()
  flushList()

  return blocks
}

function renderInlineMarkdown(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean)

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      )
    }

    const linkMatch = /^\[(.+)\]\((.+)\)$/.exec(part)

    if (linkMatch) {
      const [, label, href] = linkMatch

      return (
        <a
          key={index}
          href={href}
          className="font-medium text-foreground underline underline-offset-4"
        >
          {label}
        </a>
      )
    }

    return <span key={index}>{part}</span>
  })
}

export async function getLegalMarkdownBlocks(fileNames: string | string[]) {
  const names = Array.isArray(fileNames) ? fileNames : [fileNames]
  const filePaths = names.flatMap((fileName) => [
    path.resolve(process.cwd(), "content", fileName),
    path.resolve(process.cwd(), "..", fileName),
  ])

  for (const filePath of filePaths) {
    try {
      const markdown = await readFile(filePath, "utf8")

      return parseMarkdown(markdown)
    } catch {
      continue
    }
  }

  throw new Error(`${names.join(", ")} konnte nicht geladen werden.`)
}

export function LegalMarkdown({ blocks }: { blocks: Block[] }) {
  return (
    <div className="mt-10 space-y-6 text-base leading-7 text-muted-foreground">
      {blocks.map((block, index) => {
        if (block.type === "hr") {
          return <hr key={index} className="border-border" />
        }

        if (block.type === "h1") {
          return (
            <h2 key={index} className="text-3xl font-semibold tracking-tight text-foreground">
              {renderInlineMarkdown(block.content)}
            </h2>
          )
        }

        if (block.type === "h2") {
          return (
            <h3 key={index} className="pt-4 text-2xl font-semibold tracking-tight text-foreground">
              {renderInlineMarkdown(block.content)}
            </h3>
          )
        }

        if (block.type === "h3") {
          return (
            <h4 key={index} className="text-lg font-semibold text-foreground">
              {renderInlineMarkdown(block.content)}
            </h4>
          )
        }

        if (block.type === "ul") {
          return (
            <ul key={index} className="space-y-2 pl-5">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="list-disc marker:text-foreground">
                  {renderInlineMarkdown(item)}
                </li>
              ))}
            </ul>
          )
        }

        return <p key={index}>{renderInlineMarkdown(block.content)}</p>
      })}
    </div>
  )
}
