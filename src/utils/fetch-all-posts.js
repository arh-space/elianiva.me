import fs from "fs"
import frontmatter from "front-matter"

const postsPath = "./src/pages/post/"
const hasExtention = /\.[^/.]+$/

const posts = fs
  .readdirSync(postsPath)
  .filter(file => !hasExtention.test(file) && `${file}/index.svx`)
  .map(fileName => {
    const postContent = fs.readFileSync(`${postsPath}/${fileName}/index.svx`, {
      encoding: "utf8",
    })
    const { attributes } = frontmatter(postContent)

    return {
      ...attributes,
      slug: fileName.replace(hasExtention, ""),
    }
  })
  .sort((a, b) => b.date.getTime() - a.date.getTime())

export default posts
