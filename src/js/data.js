class Business {
  constructor(country, type, phone, address, location) {
    this.country = country;
    this.type = type;
    this.phone = phone;
    this.address = address;
    this.location = location;
  }
}

const business1 = new Business(
  "Srbija",
  "Franšiza",
  "+381 234628",
  "Lorem ipsum dolor sit amet",
  [44.01667, 20.91667]
);
const business2 = new Business(
  "Srbija",
  "Veleprodaja",
  "+381 9283747492",
  "Consectetur adipiscing elit",
  [44.787197, 20.457273]
);
const business3 = new Business(
  "Srbija",
  "Maloprodaja",
  "+381 99283747",
  "Nunc maximus turpis",
  [43.72583, 20.68944]
);
const business4 = new Business(
  "Srbija",
  "Franšiza",
  "+381 27693423",
  "Donec blandit quam",
  [43.89139, 20.34972]
);
const business5 = new Business(
  "Nemačka",
  "Franšiza",
  "+49 27636325687",
  "Nec tincidunt augue ullamcorper",
  [44.77583, 17.18556]
);
const business6 = new Business(
  "Nemačka",
  "Franšiza",
  "+49 238942934",
  "Vivamus vitae lacus",
  [43.343033, 17.807894]
);
const business7 = new Business(
  "Srbija",
  "Franšiza",
  "+381 23846923234",
  "Interdum et malesuada fames",
  [43.90358, 22.26405]
);
const business8 = new Business(
  "Nemačka",
  "Franšiza",
  "+49 23619509",
  "Ac ante ipsum primis in faucibus",
  [43.7826, 19.29256]
);
const business9 = new Business(
  "Nemačka",
  "Veleprodaja",
  "+49 846597456",
  "Nam non odio vel",
  [44.75874, 19.21437]
);
const business10 = new Business(
  "Nemačka",
  "Veleprodaja",
  "+49 493856238456",
  "Duis libero urna",
  [43.85643, 18.413029]
);
const business11 = new Business(
  "Srbija",
  "Maloprodaja",
  "+381 42569845",
  "Dignissim vitae mattis ut",
  [45.267136, 19.833549]
);
const business12 = new Business(
  "Nemačka",
  "Franšiza",
  "+49 4385608465",
  "Vestibulum eget purus",
  [44.53842, 18.66709]
);
const business13 = new Business(
  "Nemačka",
  "Maloprodaja",
  "+49 237845287354",
  "Aenean hendrerit lacinia nisi",
  [44.22637, 17.66583]
);
const business14 = new Business(
  "Srbija",
  "Maloprodaja",
  "+381 3867364",
  "Nullam vitae imperdiet neque",
  [43.32472, 21.90333]
);
const business15 = new Business(
  "Srbija",
  "Maloprodaja",
  "+381 38764297385",
  "Donec laoreet lorem",
  [43.58, 21.33389]
);
const business16 = new Business(
  "Srbija",
  "Franšiza",
  "+381 374729384",
  "In et varius erat",
  [43.13667, 20.51222]
);
const business17 = new Business(
  "Srbija",
  "Maloprodaja",
  "+381 237846392",
  "Mauris eleifend tellus non",
  [44.268273, 19.890655]
);
const business18 = new Business(
  "Srbija",
  "Franšiza",
  "+381 23984769287",
  "Donec gravida sodales odio",
  [44.30694, 20.56]
);

const data = {
  business: [
    business1,
    business2,
    business3,
    business4,
    business5,
    business6,
    business7,
    business8,
    business9,
    business10,
    business11,
    business12,
    business13,
    business14,
    business15,
    business16,
    business17,
    business18
  ],
  tableContent: [],
  filterCombo: [],
  filters: {
    country: [],
    type: []
  },
  visibleRows: []
};

(function createTable(table) {
  let tableBody = document.getElementById("table-content");

  let tablePattern = ``;

  for (let i = 0; i < table.length; i++) {
    let countryForDisplay = table[i].country;
    let typeForDisplay = table[i].type;
    let phone = table[i].phone;
    let address = table[i].address;
    let location = table[i].location;

    // Franšiza => fransiza
    // Maloprodaja => maloprodaja
    // Veleprodaja => veleprodaja
    let type, country;

    if (table[i].type === "Franšiza") {
      type = "fransiza";
    } else {
      type = table[i].type.toLowerCase();
    }

    if (table[i].country === "Nemačka") {
      country = "nemacka";
    } else {
      country = table[i].country.toLowerCase();
    }

    tablePattern += `
                      <tr data-country="${country}" data-type="${type}" data-lat="${location[0]}" data-long="${location[1]}">
                        <td>${countryForDisplay}</td>
                        <td>${typeForDisplay}</td>
                        <td>${phone}</td>
                        <td>${address}</td>
                      </tr>
                   `;
  }
  tableBody.innerHTML = tablePattern;
})(data.business);

data.tableContent = $("#table-content tr").toArray();

// helper func check for item existence in array
function doArrayInclude(arr, item) {
  return arr.indexOf(item) != -1;
}
const getActiveCheckbox = () => {
  $(".data__place input[type=checkbox]:checked").each(function() {
    data.filters.country.push($(this).val());
  });
  $(".data__business input[type=checkbox]:checked").each(function() {
    data.filters.type.push($(this).val());
  });
};

// fill declared data
const combineFilter = () => {
  // combine filters when two groups are present
  if (data.filters.country && data.filters.type) {
    for (let i = 0; i < data.filters.country.length; i++) {
      for (let j = 0; j < data.filters.type.length; j++) {
        data.filterCombo.push(
          data.filters.country[i] + " " + data.filters.type[j]
        );
      }
    }
  }
};

const displayRows = () => {
  const $tableWrapp = $(".data__table-wrapper");
  const $table = $("#table");

  if (
    data.filters.country.length === 0 &&
    data.filters.type.length === 0 &&
    data.filterCombo.length === 0
  ) {
    $table.hide();
    $tableWrapp.append(
      "<p id='no-filters'>No items to display. Please select a filter.</p>"
    );
  } else {
    $("#no-filters").remove();
    $table.show();

    $.each(data.tableContent, function() {
      const $this = $(this);
      $this.hide();

      // if there is only one group of filters
      if (data.filterCombo.length === 0) {
        // if country filter is true
        if (data.filters.country.length >= 1) {
          for (let i = 0; i < data.filters.country.length; i++) {
            if (data.filters.country[i] === $this.data("country")) {
              $this.show();
            }
          }
        }

        // if type filter is true
        if (data.filters.type.length >= 1) {
          for (let i = 0; i < data.filters.type.length; i++) {
            if (data.filters.type[i] === $this.data("type")) {
              $this.show();
            }
          }
        }

        // or if there is filters group
      } else {
        for (let i = 0; i < data.filterCombo.length; i++) {
          if (
            data.filterCombo[i] ===
            $this.data("country") + " " + $this.data("type")
          ) {
            $this.show();
          }
        }
      }
    });
  }
};

const listWithoutDisplayNone = list => {
  data.visibleRows = [];
  if (document.getElementById("table").style.display === "none") {
    data.visibleRows = [];
  } else {
    for (let i = 0; i < list.length; i++) {
      if (list[i].style.display !== "none") {
        data.visibleRows.push(list[i]);
      }
    }
  }
};
// map init
const renderMap = shops => {
  document.getElementById("map-wrapper").innerHTML =
    "<div id='map' style='width: 100%; height: 100%;'></div>";

  let map = L.map("map").setView([44.75874, 19.21437], 7);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXV0a28iLCJhIjoiY2p1NzE0YzltMG9vazN5azlyZTAyY29hYSJ9.ZZZ1WAXOHdqF5fy2Gazgiw",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      accessToken:
        "pk.eyJ1IjoibXV0a28iLCJhIjoiY2p1NzE0YzltMG9vazN5azlyZTAyY29hYSJ9.ZZZ1WAXOHdqF5fy2Gazgiw"
    }
  ).addTo(map);

  // set icons for every type of shop
  const iconFransiza = L.divIcon({
    iconSize: [130, 130],
    iconAnchor: [65, 130],
    className: "marker-fransiza"
  });
  const iconVeleprodaja = L.divIcon({
    // iconUrl: "asset/img/logo-m.png",
    iconSize: [80, 80],
    iconAnchor: [40, 90],
    className: "marker-veleprodaja"
  });
  const iconMaloprodaja = L.divIcon({
    // iconUrl: "asset/img/logo-s.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    className: "marker-maloprodaja"
  });

  // display markers
  shops.forEach(el => {
    if (el.dataset.type === "fransiza") {
      L.marker([+el.dataset.lat, +el.dataset.long], {
        icon: iconFransiza,
        riseOnHover: true
      }).addTo(map);
    } else if (el.dataset.type === "veleprodaja") {
      L.marker([+el.dataset.lat, +el.dataset.long], {
        icon: iconVeleprodaja
      }).addTo(map);
    } else {
      L.marker([+el.dataset.lat, +el.dataset.long], {
        icon: iconMaloprodaja
      }).addTo(map);
    }
  });
};

(function initApp() {
  // initial display of active filters
  getActiveCheckbox();

  // initial rowClass content
  combineFilter();

  // initial table display
  displayRows();

  // get visible elements
  listWithoutDisplayNone(data.tableContent);

  // and display them on map
  renderMap(data.visibleRows);
})();

// populate states array
$(".data__place input").change(function(e) {
  e.preventDefault();

  // empty filters on click
  data.filterCombo = [];

  const $this = $(this);
  const stateValue = $this.val();
  const states = data.filters.country;

  // get filter if cheked
  if (this.checked) {
    if (!doArrayInclude(states, stateValue)) {
      states.push(stateValue);
    }
    $this.siblings("label").addClass("active");
  }
  // remove filter if uncheked
  if (!this.checked) {
    states.splice($.inArray(stateValue, states), 1);
    $this.siblings("label").removeClass("active");
  }

  // combine filters and display items
  combineFilter();
  displayRows();
  listWithoutDisplayNone(data.tableContent);
  renderMap(data.visibleRows);
});

// populate types array
$(".data__business input").change(function(e) {
  e.preventDefault();

  // empty filters on click
  data.filterCombo = [];

  const $this = $(this);
  const typeValue = $this.val();
  const types = data.filters.type;

  // get filter if cheked
  if (this.checked) {
    if (!doArrayInclude(types, typeValue)) {
      types.push(typeValue);
      $this.siblings("label").addClass("active");
    }
  }
  // remove filter if uncheked
  if (!this.checked) {
    types.splice($.inArray(typeValue, types), 1);
    $this.siblings("label").removeClass("active");
  }

  // combine filters and display items
  combineFilter();
  displayRows();
  listWithoutDisplayNone(data.tableContent);
  renderMap(data.visibleRows);
});
