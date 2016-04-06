import * as React from "react";
import {SearchkitComponent, SearchBox, SearchBoxProps, QueryAccessor} from "searchkit";

const defaults = require("lodash/defaults")
const throttle = require("lodash/throttle")
const assign = require("lodash/assign")
const get = require("lodash/get")
const map = require("lodash/map")

import "./index.scss"

class SuggestionItemRenderer extends React.Component<any,any> {
  render() {
    return (
      <div key={this.props.key}>{this.props.text}</div>
    )
  }
}

class SuggestionListRenderer extends React.Component<any,any> {

  static defaultProps = {
    itemComponent: SuggestionItemRenderer
  }

  renderItem(suggestion) {
    return React.createElement(this.props.itemComponent, {
      text: suggestion.text,
      key: suggestion.text
    })
  }

  render() {
    if (this.props.suggestions.length == 0) return null
    return (
      <div key={this.props.title} className="suggestions-group">
        <div className="title">{this.props.title}</div>
        <div className="suggestions">{map(this.props.suggestions, this.renderItem.bind(this))}</div>
      </div>
    )
  }

}

class SuggesterSource extends SearchkitComponent<any,any> {
  suggestions: any
  resultsPath: string

  static defaultProps = {
    listComponent: SuggestionListRenderer
  }

  constructor() {
    super()
    this.suggestions = []
    this.resultsPath = "suggest.suggestions[0].options"
  }

  componentWillUpdate(props) {
    console.log(props.query)
    if (this.props.query != props.query && props.query != "" ) {
      this.searchSuggestions(props.query)
    }
  }

  getSuggestionQueryObject(query) {
    return {}
  }

  searchSuggestions(query) {
    const queryObject = {
      size:0,
      suggest: {
        text:query,
        suggestions: this.getSuggestionQueryObject(query)
      }
    }
    this.searchkit.transport.search(queryObject).then( (results) => {
      this.suggestions = get(results, this.resultsPath, [])
      this.forceUpdate()
    })
  }

  render() {
    return React.createElement(this.props.listComponent, {
      title: this.props.title,
      suggestions: this.suggestions
    })
  }
}

class QuerySuggestionsSource extends SuggesterSource {

  getSuggestionQueryObject() {
    return {
      phrase: {
        field:"title",
        real_word_error_likelihood : 0.95,
        max_errors : 1,
        gram_size : 4,
        direct_generator : [ {
          field : "_all",
          suggest_mode : "always",
          min_word_length : 1,
          size:3
        } ],
        highlight: {
          pre_tag: "<em>",
          post_tag: "</em>"
        }
      }
    }
  }

}

class QueryCompletionSource extends SuggesterSource {

  getSuggestionQueryObject() {
    return {
      completion: {
				field:"suggest"
			}
    }
  }

}

export class AutoComplete extends React.Component<any,any> {
  render() {
    const {query} = this.props

    if (query == "") return null
    return (
      <div className="autocomplete">
        <QuerySuggestionsSource query={query} title="Queries"/>
        <QueryCompletionSource query={query} title="Titles"/>
      </div>
    )
  }
}

export class AutocompleteSearchBox extends SearchBox {

  render() {
    let block = this.bemBlocks.container

    const searchboxRender = super.render()

    return (
      <div>
        {searchboxRender}
        <AutoComplete query={this.accessor.getQueryString()}/>
      </div>
    );

  }

}
