import React from "react";

const PopularSearches = () => {
  const products = [
    "Avocado","Strawberry","Pomegranate","Beetroot","Ash gourd","Bottle gourd",
    "Lady finger","Potato","Lemon","Dalchini","Fennel seeds","Blueberry",
    "Papaya","Jeera","Mushroom","Lettuce"
  ];

  const brands = [
    "Yakult","My Muse","Aashirvaad Atta","Too Yumm","Lays","Figaro Olive Oil",
    "Nandini Milk","Amul","Mother Dairy Near Me","Fortune Oil","Superyou",
    "Durex Condoms","Ferns and Petals"
  ];

  const categories = [
    "Grocery","Cigarettes","Chips","Curd","Hukka flavour","Paan shop near me",
    "Eggs price","Cheese slice","Fresh fruits","Fresh vegetables","Refined oil",
    "Butter price","Paneer price"
  ];

  const categoryList = [
    ["Fruits & Vegetables","Atta, Rice, Oil & Dals","Masala & Dry Fruits","Sweet Cravings","Frozen Food & Ice Creams"],
    ["Baby Food","Dairy, Bread & Eggs","Cold Drinks & Juices","Munchies","Meats, Fish & Eggs"],
    ["Breakfast & Sauces","Tea, Coffee & More","Biscuits","Makeup & Beauty","Bath & Body"],
    ["Cleaning Essentials","Home Needs","Electricals & Accessories","Hygiene & Grooming","Health & Baby Care"],
    ["Homegrown Brands","Paan Corner"]
  ];

  const renderInlineList = (items) => (
    <div className="flex flex-wrap text-sm text-gray-700 leading-relaxed">
      {items.map((item, index) => (
        <span key={index} className="mr-2 whitespace-nowrap">
          {item}{index < items.length - 1 && " |"}
        </span>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-inter">

      {/* Popular Searches */}
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
        Popular Searches
      </h2>

      <div className="space-y-4">
        <div>
          <p className="font-semibold text-gray-900 mb-1">Products</p>
          {renderInlineList(products)}
        </div>

        <div>
          <p className="font-semibold text-gray-900 mb-1">Brands</p>
          {renderInlineList(brands)}
        </div>

        <div>
          <p className="font-semibold text-gray-900 mb-1">Categories</p>
          {renderInlineList(categories)}
        </div>
      </div>

      {/* Divider */}
      <hr className="my-8 border-gray-300" />

      {/* Category Grid */}
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
        Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categoryList.flat().map((item, index) => (
          <a
            key={index}
            href="#"
            className="text-sm text-gray-800"
          >
            {item}
          </a>
        ))}
      </div>

    </div>
  );
};

export default PopularSearches;
