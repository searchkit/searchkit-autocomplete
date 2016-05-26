import * as React from "react";
import * as ReactDOM from "react-dom";

import {SearchBox, SuggestionSource} from "../../../src/index";

const countriesJSON = require("../../../src/data/countries.json")
const citiesJSON = require("../../../src/data/us-cities.json")

const countriesSource = new SuggestionSource(countriesJSON, "name")
const citiesSource = new SuggestionSource(citiesJSON, 0)

class App extends React.Component<any, any> {

  render() {
    return (
      <div>
        <SearchBox sources={[countriesSource, citiesSource]}/>
      </div>
    )
  }

}

ReactDOM.render(<App/>, document.getElementById("root"))
