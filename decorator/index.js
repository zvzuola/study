class Foo {
  constructor() {}

  @log
  add(a, b) {
    return a + b;
  }
}

function log(target, name, desc) {
  let oldValue = desc.value;
  console.log("1");
  desc.value = function() {
    console.log("2", arguments);
    return oldValue.apply(this, arguments);
  };
}

let foo = new Foo()
foo.add(10, 20)