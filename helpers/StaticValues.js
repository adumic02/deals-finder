const statusColorMap = [
    {
        status: "Overwhelmingly Positive",
        translation: "Izuzetno pozitivno",
        class: "bg-success-200 text-black",
    },
    {
        status: "Very Positive",
        translation: "Vrlo pozitivno",
        class: "bg-success-400 text-black",
    },
    {
        status: "Positive",
        translation: "Pozitivno",
        class: "bg-success-600 text-black",
    },
    {
        status: "Mostly Positive",
        translation: "Uglavnom pozitivno",
        class: "bg-warning-600 text-black",
    },
    {
        status: "Mixed",
        translation: "Raznoliko",
        class: "bg-warning-400 text-black",
    },
    {
        status: "Mostly Negative",
        translation: "Uglavnom negativno",
        class: "bg-warning-200 text-black",
    },
    {
        status: "Negative",
        translation: "Negativno",
        class: "bg-danger-600 text-black",
    },
    {
        status: "Very Negative",
        translation: "Vrlo negativno",
        class: "bg-danger-400 text-black",
    },
    {
        status: "Overwhelmingly Negative",
        translation: "Izuzetno negativno",
        class: "bg-danger-200 text-black",
    },
];

const cheaperStoresColumns = [
    { name: "PLATFORMA", id: "storeID" },
    { name: "SNIŽENA CIJENA", id: "salePrice" },
    { name: "NORMALNA CIJENA", id: "retailPrice" },
    { name: "", id: "shopNow" },
];

const wishlistColumns = [
    { name: "PLATFORMA", id: "storeID" },
    { name: "SNIŽENA CIJENA", id: "sale_price" },
    { name: "NORMALNA CIJENA", id: "normal_price" },
    { name: "SNIŽENJE", id: "savings" },
    { name: "NAZIV VIDEOIGRE", id: "title" },
    { name: "SLIKA", id: "thumb" },
    { name: "", id: "actions" },
];

const sortingOptions = [
    {
        label: "Ocjena ponude (Silazno)",
        value: { sortBy: "DealRating", desc: 0 },
    },
    {
        label: "Ocjena ponude (Uzlazno)",
        value: { sortBy: "DealRating", desc: 1 },
    },
    {
        label: "Ušteda (Silazno)",
        value: { sortBy: "Savings", desc: 0 },
    },
    {
        label: "Ušteda (Uzlazno)",
        value: { sortBy: "Savings", desc: 1 },
    },
    {
        label: "Cijena (Silazno)",
        value: { sortBy: "Price", desc: 1 },
    },
    {
        label: "Cijena (Uzlazno)",
        value: { sortBy: "Price", desc: 0 },
    },
    {
        label: "Ocjena videoigre (Silazno)",
        value: { sortBy: "Reviews", desc: 0 },
    },
    {
        label: "Ocjena videoigre (Uzlazno)",
        value: { sortBy: "Reviews", desc: 1 },
    },
];

const staticValues = {
    statusColorMap,
    cheaperStoresColumns,
    wishlistColumns,
    sortingOptions,
};

export default staticValues;
