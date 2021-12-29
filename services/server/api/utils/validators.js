const validateAddBookParams = (req) => {
    const {title, isbn, editorial, year} = req.body

    let titleOk = typeof title == "string" && title.trim() != ""
    let isbnOk = typeof isbn == "string" && isbn.trim() != ""
    let editorialOk = typeof editorial == "string" && editorial.trim() != ""
    let yearOk = year && Number.isInteger(parseInt(year)) && parseInt(year) > 1000

    return titleOk && isbnOk && editorialOk && yearOk
}

module.exports = {validateAddBookParams}