export function buildList(item: any) {
  const itemList = document.createElement("li");
  itemList.classList.add("viewer__list-item");
  itemList.style.paddingLeft = `calc(10px * ${item.level})`;
  if (item.key) {
    const listKeyElement = document.createElement("span");
    listKeyElement.classList.add("viewer__list-item__key");
    listKeyElement.append(item.key);
    itemList.append(listKeyElement);

    const listCollonElement = document.createElement("span");
    listCollonElement.classList.add("viewer__list-item__collon");
    listCollonElement.append(": ");
    itemList.append(listCollonElement);
  }

  const listValueElement = document.createElement("span");
  listValueElement.classList.add("viewer__list-item__value");

  if (
    ["ARRAY_START", "ARRAY_END", "OBJECT_START", "OBJECT_END"].includes(
      item.type
    )
  ) {
    listValueElement.classList.add("viewer__list-item__value--block");
  }

  listValueElement.append(renderValue(item));
  itemList.append(listValueElement);

  const verticalLines = document.createElement("div");
  verticalLines.classList.add("viewer__list-item__lines");
  verticalLines.style.width = `calc(10px * ${item.level})`;

  return itemList;
}

function renderValue(item: any) {
  if (typeof item.value === "string" && item.type === "PRIMTIVE") {
    return `"${item.value}"`;
  }

  return item.value;
}
