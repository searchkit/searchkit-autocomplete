import {mount, render} from "enzyme";
import {SearchBox} from "../../src";
import {SearchkitManager} from "searchkit";
import * as React from "react";

describe("example", () => {

  beforeEach(() => {
    this.searchkit = SearchkitManager.mock()
    // this.container = mount(<AutocompleteSearchBox searchkit={this.searchkit}/>)
  })

  it("should pass", () => {
    // expect(this.container.text()).toBe("Example component")
  })

});
