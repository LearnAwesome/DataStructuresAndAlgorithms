const list = [
  { id: 1, parentId: 0, name: "Foods", url: "wwww" },
  { id: 2, parentId: 1, name: "Fruits" },
  { id: 3, parentId: 1, name: "Vegetables" },
  { id: 4, parentId: 2, name: "apple" },
  { id: 5, parentId: 2, name: "orange" },
  { id: 6, parentId: 3, name: "tomato" },
  { id: 7, parentId: 3, name: "carrot" },
  { id: 8, parentId: 3, name: "cabbage" },
  { id: 9, parentId: 3, name: "potato" },
  { id: 10, parentId: 3, name: "lettuce" },

  { id: 11, parentId: 0, name: "Foods" },
  { id: 12, parentId: 11, name: "Fruits" },
  { id: 13, parentId: 11, name: "Vegetables" },
  { id: 14, parentId: 12, name: "apple" },
  { id: 15, parentId: 12, name: "orange" },
  { id: 16, parentId: 13, name: "tomato" },
  { id: 17, parentId: 13, name: "carrot" },
  { id: 18, parentId: 13, name: "cabbage" },
  { id: 19, parentId: 13, name: "potato" },
  { id: 20, parentId: 13, name: "lettuce" }
];

const tree = list2tree(list);
console.log(tree);

const newList = tree2list(tree);
console.log(newList);

function tree2list(tree) {
  const list = [];
  for (const node of tree) {
    if (node.children) {
      list.push(...tree2list(node.children));
      delete node.children;
    }
    list.push(node);
  }
  return list;
}

function list2tree(list) {
  const tree = [];
  for (const itemOutside of list) {
    const noParent = list.every(itemInside => itemInside.id !== itemOutside.parentId);
    noParent && tree.push(itemOutside);
  }

  const todo = [...tree];
  while (todo.length > 0) {
    const node = todo.shift();
    for (const item of list) {
      if (node.id === item.parentId) {
        (node.children || (node.children = [])).push(item);
        todo.push(item);
      }
    }
  }
  return tree;
}