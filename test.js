'use strict';

// The default phantomjs window with is 400px.

var should = chai.should();

describe("Breaks.getData($target)", function() {
  it("Should return false if no data is provided or data is not valid json", function() {
    expect(breaks.getData()).to.be.false;
    expect(breaks.getData('')).to.be.false;
    expect(breaks.getData('invalid{}element')).to.be.false;
  });

  it("Should parse valid json data", function() {
    var $target = jQuery('head');
    $target.append('<style>head{font-family: \'{"mobile": "320px","tablet": "768px","desktop": "960px"}\';}</style>');
    var data = breaks.getData($target);
    // Save the data for further tests.
    breaks.data = data;
    expect(data).to.deep.equal({mobile: '320px', tablet: '768px', desktop: '960px'});
  });
});

describe("Breaks.is(query)", function() {
  it("Should parse pixel based breakpoints", function() {
    expect(breaks.is('>500px')).to.be.false;
    expect(breaks.is('≥500px')).to.be.false;
    expect(breaks.is('<500px')).to.be.true;
    expect(breaks.is('≤500px')).to.be.true;
    expect(breaks.is('>300px <=442px')).to.be.true;
  });

  it("Should parse named breakpoints", function() {
    expect(breaks.is('>mobile')).to.be.true;
    expect(breaks.is('<tablet')).to.be.true;
    expect(breaks.is('<mobile')).to.be.false;
    expect(breaks.is('>=tablet <desktop')).to.be.false;
  });
});
