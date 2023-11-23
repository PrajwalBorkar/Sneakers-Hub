import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { data } from "../assets/data";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption,setSortOption] = useState("default");
  const sneakers = data.sneakers;
  

  const filteredItems = sneakers.filter(
    (s) => s.retail_price_cents !== null && s.story_html !== null
  );

  const items = filteredItems.map((item) => {
    return { ...item, qty: 1 };
  });

  const filteredSearchItems = items.filter((item) =>
    item.brand_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

    if(sortOption === "name"){
      filteredSearchItems.sort((a,b) => a.brand_name.localeCompare(b.brand_name))
    }else if(sortOption === "price"){
      filteredSearchItems.sort((a,b) =>Number(a.retail_price_cents) - Number(b.retail_price_cents))
    }
  
  return (
    <div className="">
       <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-md"> 
      <select 
        onChange={(e) => setSortOption(e.target.value)} className="mr-2 p-2 rounded-md border-none focus:outline-none bg-white">

        <option value="default">Sort by</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
        <input 
        type="text"
        placeholder="Search Shoes" 
        onChange={(e) =>setSearchTerm(e.target.value)}
        className="p-2 rounded-md border-gray-300 w-1/2 focus-outline-none bg-white"
        />
      </div>
      <div className="w-full min-h-fit p-10 md:p-20 grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 xl:gap-10mx-auto ">
        {filteredSearchItems.length > 0 ? (
          filteredSearchItems.map((shoe) => (
          <Card key={shoe.id} shoe={shoe} />
        ))
        ) : (
          <p className="text-white">No Items Found</p>
        )}
      </div>
    </div>
  );
};

export default Explore;
