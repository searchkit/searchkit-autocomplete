import * as React from 'react'
const filter = require("lodash/filter")
const get = require("lodash/get")
const map = require("lodash/map")

export class SuggestionSource {

  data: [any]
  key: string | number

  constructor(data:[any], key) {
    this.data = data
    this.key = key || ""
  }

  getSuggestions(query) {
    const results = filter(this.data, (item) => {
      const value = get(item, this.key, "")
      return value.indexOf(query) != -1
    })
    return map(results, this.key)
  }

}
