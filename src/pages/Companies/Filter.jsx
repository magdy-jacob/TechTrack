
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
 import { Search } from "lucide-react";
export default function FilterSidebar() {
  const [openSelect, setOpenSelect] = useState(null);
  const [focused, setFocused] = useState(null);

  const toggleSelect = (name) => {
    setOpenSelect(openSelect === name ? null : name);
  };

  const technologies = [
    { name: "Terraform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
    { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  ];

  const industries = ["AdTech", "Banking", "Artificial Intelligence", "Data Analysis", "Construction"];
  const sizes = ["Startup", "Medium", "Enterprise"];
  const countries = ["Algeria", "Bahrain", "Egypt", "Iraq", "Jordan"];
  const cities = ["Cairo", "Alexandria", "Giza", "Mansoura", "Luxor"];

  const renderDropdown = (items, name) => (
    <AnimatePresence>
      {openSelect === name && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden mt-2 border border-gray-200 rounded-lg shadow-sm bg-white"
        >
          {items.map((item) => (
            <div
              key={item.name || item}
              className="flex items-center gap-2 px-3 py-[6px] hover:bg-gray-200 cursor-pointer text-gray-700 border-b border-gray-300"
            >
              {item.icon && <img src={item.icon} alt={item.name} className="w-5 h-5" />}
              <span>{item.name || item}</span>
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderSelect = (label, name, placeholder, items) => (
    <div className="mb-4 relative">
      <label className="block text-[16px] font-medium text-gray-700 mb-2">{label}</label>
      <div
        onClick={() => toggleSelect(name)}
        onFocus={() => setFocused(name)}
        onBlur={() => setFocused(null)}
        tabIndex={0}
        className={`border rounded-lg p-3 flex justify-between items-center cursor-pointer transition-colors ${
          focused === name || openSelect === name
            ? "border-primary shadow-sm border-2 "
            : "border-gray-300"
        }`}
      >
        <span className="text-sm text-gray-500 ">{placeholder}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </div>
      {renderDropdown(items, name)}
    </div>
  );



   

  return (





    <div className="w-72  h-135   mt-10 bg-white p-5 rounded-2xl shadow-md border border-gray-200 overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
        <i className="fa-solid fa-sliders text-gray-600"></i>
        <h1 className="font-semibold text-xl text-gray-800">Filter</h1>
      </div>
     







      {renderSelect("Technologies", "technologies", "Select technologies...", technologies)}
      {renderSelect("Industries", "industries", "Select industries...", industries)}
      {renderSelect("Company Size", "sizes", "Select company size...", sizes)}
      {renderSelect("Country", "countries", "Select country...", countries)}
      {renderSelect("City", "cities", "Select city...", cities)}
    </div>
  );


  
}
