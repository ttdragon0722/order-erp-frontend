// 顏色索引枚舉（可對應數字）
export enum ColorIndex {
    blue = 0,
    red = 1,
    green = 2,
    amber = 3,
    pink = 4,
    indigo = 5,
    purple = 6,
    teal = 7,
    cyan = 8,
}

// 顏色名稱枚舉（限制合法字串）
export enum ColorName {
    blue = "blue",
    red = "red",
    green = "green",
    amber = "amber",
    pink = "pink",
    indigo = "indigo",
    purple = "purple",
    teal = "teal",
    cyan = "cyan",
}

// 顏色樣式設定
export const ColorSet: Record<ColorName, string> = {
    [ColorName.blue]: "bg-blue-600 text-white",
    [ColorName.red]: "bg-red-600 text-white",
    [ColorName.green]: "bg-green-600 text-white",
    [ColorName.amber]: "bg-amber-400 text-slate-800",
    [ColorName.pink]: "bg-pink-600 text-white",
    [ColorName.indigo]: "bg-indigo-600 text-white",
    [ColorName.purple]: "bg-purple-600 text-white",
    [ColorName.teal]: "bg-teal-600 text-white",
    [ColorName.cyan]: "bg-cyan-600 text-white",
};

// index ➜ name
export const ColorIndexToName: Record<ColorIndex, ColorName> = {
    [ColorIndex.blue]: ColorName.blue,
    [ColorIndex.red]: ColorName.red,
    [ColorIndex.green]: ColorName.green,
    [ColorIndex.amber]: ColorName.amber,
    [ColorIndex.pink]: ColorName.pink,
    [ColorIndex.indigo]: ColorName.indigo,
    [ColorIndex.purple]: ColorName.purple,
    [ColorIndex.teal]: ColorName.teal,
    [ColorIndex.cyan]: ColorName.cyan,
};

// name ➜ index
export const ColorNameToIndex: Record<ColorName, ColorIndex> = {
    [ColorName.blue]: ColorIndex.blue,
    [ColorName.red]: ColorIndex.red,
    [ColorName.green]: ColorIndex.green,
    [ColorName.amber]: ColorIndex.amber,
    [ColorName.pink]: ColorIndex.pink,
    [ColorName.indigo]: ColorIndex.indigo,
    [ColorName.purple]: ColorIndex.purple,
    [ColorName.teal]: ColorIndex.teal,
    [ColorName.cyan]: ColorIndex.cyan,
};

// 所有顏色名稱（可用於選單等）
export const colorNames: ColorName[] = Object.values(ColorName);
