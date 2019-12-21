var DATA = {
    "locations": [
        {
            "name": "Virginia",
            "topics": ['jh','b','5']
        },
        {
            "name": "Alabama",
            "topics": ['we','b','3']
        },
        {
            "name": "Connecticut",
            "topics": ['jghk','b','']
        },
        {
            "name": "Delaware",
            "topics": ['13','b','h']
        },
        {
            "name": "Hawaii",
            "topics": ['asd','b','2']
        },
        {
            "name": "Kansas",
            "topics": ['86','b','o']
        },
        {
            "name": "Michigan",
            "topics": ['45y','b','c']
        }
    ]
}

var LOCATIONS_NAMES = DATA.locations.map(x => x.name)

var APP_CONTAINER_ID = 'search-bar-ls'

function createLocationInput(TopicsComponent) {
    var component_id = 'locations-ls-selector'

    var locations = document.createElement('input')
    locations.setAttribute('id', component_id)

    var autocomplete = new autoComplete({
        selector: locations,
        minChars: 2,
        source: function(term, suggest){
            term = term.toLowerCase();
            var choices = LOCATIONS_NAMES
            var matches = [];
            for (i=0; i<choices.length; i++)
                if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
            suggest(matches);
        },
        onSelect(event, term, item){
            var location = DATA.locations.find(x => x.name === term)

            TopicsComponent.innerHTML = null

            location.topics.forEach(element => {
                var option = document.createElement("option");
                option.text = element;
                TopicsComponent.add(option);
            });
        }
    });

    return locations
}

function createTopicInput () {
    var dropdown = document.createElement('select')
    dropdown.setAttribute('id', '1234')
    return dropdown
}

function createActionBtn () {
    var btn = document.createElement('input')
    btn.setAttribute('type', 'button')
    btn.value = 'Search';
    return btn
}

document.addEventListener("DOMContentLoaded", function (event) {
    var topics = createTopicInput()
    var locations = createLocationInput(topics)
    var btn = createActionBtn()
    
    var app = document.getElementById(APP_CONTAINER_ID)
    
    app.append(locations)
    app.append(topics)
    app.append(btn)
})