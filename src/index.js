var DATA = {
  locations: [
    {
      name: "Virginia",
      topics: ["jh", "b", "5"]
    },
    {
      name: "Alabama",
      topics: ["we", "b", "3"]
    },
    {
      name: "Connecticut",
      topics: ["jghk", "b", ""]
    },
    {
      name: "Delaware",
      topics: ["13", "b", "h"]
    },
    {
      name: "Hawaii",
      topics: ["asd", "b", "2"]
    },
    {
      name: "Kansas",
      topics: ["86", "b", "o"]
    },
    {
      name: "Michigan",
      topics: ["45y", "b", "c"]
    }
  ]
};

var LOCATIONS_NAMES = DATA.locations.map(x => x.name);

fragment = new DocumentFragment();

function addAutoComplete() {
  var searchLocations = document.getElementById("locations-ls-selector");

  var autocomplete = new autoComplete({
    selector: searchLocations,
    minChars: 2,
    source: function(term, suggest) {
      term = term.toLowerCase();
      var choices = LOCATIONS_NAMES;
      var matches = [];
      for (i = 0; i < choices.length; i++)
        if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
      suggest(matches);
    },
    onSelect(event, term, item) {
      var location = DATA.locations.find(x => x.name === term);

      TopicsComponent.innerHTML = null;

      location.topics.forEach(element => {
        var option = document.createElement("option");
        option.text = element;
        TopicsComponent.add(option);
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", function(event) {
  addAutoComplete();
});
