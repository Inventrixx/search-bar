let globalLocales = []
async function locationHandler(value) {
    const baseUrl = "https://www.livestories.com/"
    //const hardcodedDomain = "T:L:C<US>:CO,T:L:C<US>:PL,T:L:C<US>:ST"
    const hardcodedDomain = "T:L:C<US>:CO,T:L:C<US>:ST"
    const hardcodedUrl = `${baseUrl}locale/search?value=${value}&domain=${hardcodedDomain}`
    try {
        const response = await fetch(hardcodedUrl)
        const locales = await response.json()
        globalLocales = [...locales]
        return locales
    } catch (e) {
        console.error(e)
    }
}

fragment = new DocumentFragment()

function addAutoComplete() {
    const searchLocations = document.getElementById("locations-ls-selector")

    /*
     * Fetch all locations from LiveStories API
     * Enable autocomplete on user input
     */
    const autocomplete = new autoComplete({
        selector: searchLocations,
        minChars: 2,
        source: async function(term, suggest) {
            term = term.toLowerCase()
            //const choices = await locationHandler(term)
            const receivedLocations = await locationHandler(term)
            const choices = receivedLocations.map(i => i.label)

            const matches = []
            for (i = 0; i < choices.length; i++)
                if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i])
            suggest(matches)
        }
    })
}

function addTopicDropDown() {
    //Get all topics from local json file to custom dropdown
    const dropdownIcon = () => {
        const dropdown = document.createElement("span")
        dropdown.innerHTML = `<svg width="14px" height="7px" viewBox="0 0 10 5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Delivery" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Transactions-(Landing)" transform="translate(-1360.000000, -29.000000)" fill="#119eb9" fill-rule="nonzero">
              <g id="Group-4" transform="translate(1360.000000, 29.000000)">
                  <polygon id="Shape" points="0 0 5 5 10 0"></polygon>
              </g>
          </g>
          </g>
      </svg>`
        return dropdown
    }

    const topics = [
        {
            indicatortopic: "Transportation Commute"
        },
        {
            indicatortopic: "Marriage Demographics"
        },
        {
            indicatortopic: "Children"
        },
        {
            indicatortopic: "Median Age Demographics"
        },
        {
            indicatortopic: "Veteran Demographic"
        },
        {
            indicatortopic: "Housing Unit Occupancy"
        },
        {
            indicatortopic: "Families Structure Composition"
        },
        {
            indicatortopic: "Language"
        },
        {
            indicatortopic: "Fertility New Mother Demographic"
        },
        {
            indicatortopic: "Educational Attainment"
        },
        {
            indicatortopic: "Geographic Mobility Demographics"
        },
        {
            indicatortopic: "Population Demographics"
        }
    ]

    const printArea = document.querySelector("#content")

    const dropdown = () => {
        const component = document.createElement("div")

        const input = createInput()
        const dropdown = showDropdown()

        component.appendChild(input)
        component.appendChild(dropdown)
        printArea.appendChild(component)
    }

    const createInput = () => {
        // Creates the input outline
        const input = document.createElement("div")
        input.classList = "input"
        input.addEventListener("click", toggleDropdown)

        // Creates the input placeholder content
        const inputPlaceholder = document.createElement("div")
        inputPlaceholder.classList = "input__placeholder"

        const placeholder = document.createElement("p")
        placeholder.textContent = "Select topic"
        placeholder.classList.add("placeholder")

        // Appends the placeholder and chevron (stored in assets.js)
        inputPlaceholder.appendChild(placeholder)
        inputPlaceholder.appendChild(dropdownIcon())
        input.appendChild(inputPlaceholder)

        return input
    }

    const showDropdown = () => {
        const structure = document.createElement("div")
        structure.classList.add("structure", "hide")

        topics.forEach(topic => {
            const { indicatortopic } = topic
            const option = document.createElement("div")
            option.addEventListener("click", () => selectOption(indicatortopic))
            const n = document.createElement("span")
            n.textContent = indicatortopic
            option.appendChild(n)
            structure.appendChild(option)
        })
        return structure
    }

    const toggleDropdown = () => {
        const dropdown = document.querySelector(".structure")
        dropdown.classList.toggle("hide")

        const input = document.querySelector(".input")
        input.classList.toggle("input__active")
    }

    const selectOption = indicatortopic => {
        const text = document.querySelector(".placeholder")
        text.textContent = indicatortopic
        text.classList.add("input__selected")
        toggleDropdown()
    }

    dropdown()
}

function addPageRedirect() {
    document.getElementById("go").addEventListener("click", function(e) {
        e.preventDefault()
        const baseUrl = "https://www.livestories.com/statistics"
        //const location = this.form.elements[0].value.toLowerCase().replace(/ /g, "-")
        const dataTerm = this.form.elements[0].getAttribute("data-term")
        const topic = document
            .getElementsByClassName("input__selected")[0]
            .innerText.toLowerCase()
            .replace(/ /g, "-")

        const location = globalLocales.filter(item => item.label === dataTerm)

        // only for states Arizona, Alabama , California and etc:
        if (location[0].type.name === "State") {
            const locationSlug = location[0].name.toLowerCase().replace(/ /g, "-")
            const mockedUrlSlug = `${baseUrl}/${locationSlug}/${topic}`
            window.location.replace(mockedUrlSlug)
            return false
        } else {
            const locationSlug = location[0].name.toLowerCase().replace(/ /g, "-")
            const locationStateSlug = location[0].containers[0].name.toLowerCase()
            // for counties and etc
            const mockedUrlSlug = `${baseUrl}/${locationStateSlug}/${locationSlug}-${topic}`

            window.location.replace(mockedUrlSlug)
            return false
        }

        window.location.replace(mockedUrlSlug)
        return false
    })
}

document.addEventListener("DOMContentLoaded", function(event) {
    addAutoComplete()
    addTopicDropDown()
    addPageRedirect()
})
