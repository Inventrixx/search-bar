async function locationHandler(value) {
    const baseUrl = "https://www.livestories.com/"
    const hardcodedDomain = "T:L:C<US>:CO,T:L:C<US>:PL,T:L:C<US>:ST"
    const hardcodedUrl = `${baseUrl}locale/search?value=${value}&domain=${hardcodedDomain}`

    try {
        const response = await fetch(hardcodedUrl)
        const locales = await response.json()
        return locales.map(i => i.name)
    } catch (e) {
        console.error(e)
    }
}

fragment = new DocumentFragment()

function addAutoComplete() {
    var searchLocations = document.getElementById("locations-ls-selector")

    var autocomplete = new autoComplete({
        selector: searchLocations,
        minChars: 2,
        source: async function(term, suggest) {
            term = term.toLowerCase()
            const choices = await locationHandler(term)
            var matches = []
            for (i = 0; i < choices.length; i++)
                if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i])
            suggest(matches)
        },
        onSelect(event, term, item) {
            var location = DATA.locations.find(x => x.name === term)

            TopicsComponent.innerHTML = null

            location.topics.forEach(element => {
                var option = document.createElement("option")
                option.text = element
                TopicsComponent.add(option)
            })
        }
    })
}

document.addEventListener("DOMContentLoaded", function(event) {
    addAutoComplete()
})
