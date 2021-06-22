import _ from "lodash";

export function paginate(items, currentPage, pageSize) {
    const startIndex = ( currentPage -1 ) * pageSize;
    const resultArray = _(items).slice(startIndex).take(pageSize).value();

    return resultArray;
}