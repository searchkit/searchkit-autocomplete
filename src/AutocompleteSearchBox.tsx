import * as React from "react"

const defaults = require("lodash/defaults")
const throttle = require("lodash/throttle")
const assign = require("lodash/assign")
const get = require("lodash/get")
const map = require("lodash/map")
const filter = require("lodash/filter")

import "./index.scss"

class Autocomplete extends React.Component<any,any> {

  renderGroup(item,i) {
    return <div key={i}>{i}</div>
  }

  render() {
    console.log(this.props.results)
    return <div>{map(this.props.results, this.renderGroup.bind(this))}</div>
  }

}

export class SearchBox extends React.Component<any,any> {

  constructor() {
    super()
    this.state = {
      query: "",
      focused: false
    }
  }

  searchSuggestion(query) {
    const resultGroups = map(this.props.sources, (source) => {
      return source.getSuggestions(query)
    })
    this.setState({
      query: query,
      resultGroups: resultGroups,
      visible: true
    })

  }

  onChange(e) {
    this.searchSuggestion(e.target.value)
  }

  onKeyPress(e) {
    console.log(e.keyCode)
  }

  onFocusBlur(focus) {
    this.setState({focus})
  }

  render() {

    return (
      <div>
        <form>
          <input type="search" className="searchbox"
            onChange={this.onChange.bind(this)}
            ref="search"
            onFocus={this.onFocusBlur.bind(this, true)}
            onBlur={this.onFocusBlur.bind(this, false)}/>
          <input type="submit" value="Search"/>
        </form>

        <Autocomplete results={this.state.resultGroups} visible={this.state.visible}/>

      </div>
    );

  }

}
